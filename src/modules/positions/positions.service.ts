import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Includeable, Op, WhereOptions } from 'sequelize';
import { Country } from '../../core/models/country';
import { Industry } from '../../core/models/industry';
import { Role } from '../../core/models/role';
import { Skill } from '../../core/models/skill';
import { Equity } from '../project/models/equity';
import {
  positionExpiry,
  ProjectPosition,
} from '../project/models/project-position';
import { Project } from '../project/project';
import { ListPositionsQuery } from './dto/list-positions.query';
import {
  positionPath,
  positionSlug,
  ProjectLookups,
  PublicPosition,
  PublicPositionSummary,
  toPublicPosition,
  toPublicSummary,
} from './position-presenter';

export interface PositionsPage {
  items: PublicPositionSummary[];
  total: number;
  page: number;
  limit: number;
}

export interface SitemapEntry {
  path: string;
  updatedAt: string;
}

const LOOKUP_TTL_MS = 10 * 60 * 1000;
const SITEMAP_LIMIT = 5000;
const OTHER_POSITIONS_LIMIT = 20;

/** A position together with everything its public representation shows. */
const WITH_DETAILS: Includeable[] = [
  {
    model: Project,
    required: true,
    attributes: [
      'id',
      'title',
      'description',
      'owner_id',
      'country',
      'industries',
    ],
  },
  { model: Role },
  { model: Country },
  { model: Equity, attributes: ['min', 'max'] },
  { model: Skill, attributes: ['id', 'name'], through: { attributes: [] } },
];

/**
 * The public side of positions: what anyone, signed in or not, and any crawler can read
 * with a plain GET. Listed means open, attached to a project and not past its date.
 */
@Injectable()
export class PositionsService {
  // Countries and industries are seed data; a project only stores their ids.
  private lookups: (ProjectLookups & { loadedAt: number }) | null = null;

  constructor(
    @InjectModel(ProjectPosition)
    private readonly positions: typeof ProjectPosition,
    @InjectModel(Country) private readonly countries: typeof Country,
    @InjectModel(Industry) private readonly industries: typeof Industry,
  ) {}

  async list(query: ListPositionsQuery): Promise<PositionsPage> {
    const now = new Date();
    const where: WhereOptions = {
      ...this.listedAt(now),
      ...(query.role ? { role_id: query.role } : {}),
      ...(query.country ? { country: query.country } : {}),
    };

    const { rows, count } = await this.positions.findAndCountAll({
      where,
      include: WITH_DETAILS,
      order: [
        ['createdAt', 'DESC'],
        ['id', 'DESC'],
      ],
      limit: query.limit,
      offset: query.page * query.limit,
      distinct: true,
    });

    return {
      items: rows.map((position) => toPublicSummary(position, now)),
      total: count,
      page: query.page,
      limit: query.limit,
    };
  }

  /** Any position that exists, whatever its state: the page tells a closed one apart. */
  async getOne(id: number): Promise<PublicPosition> {
    const now = new Date();
    const position = await this.positions.findByPk(id, {
      include: WITH_DETAILS,
    });
    if (!position?.project) {
      throw new NotFoundException('Position not found');
    }

    const others = await this.positions.findAll({
      where: {
        ...this.listedAt(now),
        project_id: position.project.id,
        id: { [Op.ne]: position.id },
      },
      include: [{ model: Role }],
      order: [['createdAt', 'DESC']],
      limit: OTHER_POSITIONS_LIMIT,
    });

    return toPublicPosition(position, others, await this.loadLookups(), now);
  }

  /** Every listed position's page and when it last changed, newest first. */
  async sitemap(): Promise<SitemapEntry[]> {
    const rows = await this.positions.findAll({
      attributes: ['id', 'updatedAt'],
      where: this.listedAt(new Date()),
      include: [
        { model: Project, required: true, attributes: ['id', 'title'] },
        { model: Role, attributes: ['id', 'name'] },
      ],
      order: [['updatedAt', 'DESC']],
      limit: SITEMAP_LIMIT,
    });

    return rows.map((position) => ({
      path: positionPath(
        position.id,
        positionSlug(position.role?.name, position.project.title),
      ),
      updatedAt: new Date(position.updatedAt).toISOString(),
    }));
  }

  async close(id: number, userId: number): Promise<PublicPosition> {
    const position = await this.findOwned(id, userId);
    if (position.status !== 'closed') {
      await position.update({ status: 'closed', closed_at: new Date() });
    }
    return this.getOne(id);
  }

  /** Opens the position again, or renews an open one, for another full lifetime. */
  async reopen(id: number, userId: number): Promise<PublicPosition> {
    const position = await this.findOwned(id, userId);
    await position.update({
      status: 'open',
      closed_at: null,
      expires_at: positionExpiry(new Date()),
    });
    return this.getOne(id);
  }

  private listedAt(now: Date): WhereOptions {
    return {
      status: 'open',
      project_id: { [Op.ne]: null },
      [Op.or]: [{ expires_at: null }, { expires_at: { [Op.gt]: now } }],
    };
  }

  private async findOwned(
    id: number,
    userId: number,
  ): Promise<ProjectPosition> {
    const position = await this.positions.findByPk(id, {
      include: [
        { model: Project, required: true, attributes: ['id', 'owner_id'] },
      ],
    });
    if (!position?.project) {
      throw new NotFoundException('Position not found');
    }
    if (Number(position.project.owner_id) !== Number(userId)) {
      throw new ForbiddenException('Only the project owner can do this');
    }
    return position;
  }

  private async loadLookups(): Promise<ProjectLookups> {
    if (this.lookups && Date.now() - this.lookups.loadedAt < LOOKUP_TTL_MS) {
      return this.lookups;
    }
    const [countries, industries] = await Promise.all([
      this.countries.findAll({ raw: true }),
      this.industries.findAll({ raw: true }),
    ]);
    this.lookups = {
      loadedAt: Date.now(),
      countries: new Map(
        countries.map((c) => [c.id, { id: c.id, name: c.name, code: c.code }]),
      ),
      industries: new Map(
        industries.map((i) => [i.id, { id: i.id, name: i.name }]),
      ),
    };
    return this.lookups;
  }
}

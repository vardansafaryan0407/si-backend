import {
  ProjectPosition,
  PositionState,
} from '../project/models/project-position';

// What the public position endpoints return. The shape is written out here, instead of
// serializing the models, so the pages that are indexed by search engines depend on a
// stable contract and never on a column that happens to exist.

export interface NamedRef {
  id: number;
  name: string;
}

export interface CountryRef extends NamedRef {
  code: string;
}

export interface PublicPositionSummary {
  id: number;
  /** "<role>-at-<startup>": readable, and decorative. The id identifies the position. */
  slug: string;
  /** The page of this position on the site, e.g. "/positions/12/smm-manager-at-acme". */
  path: string;
  state: PositionState;
  /** The role's name: what the position is called everywhere. */
  title: string;
  role: NamedRef | null;
  /** Where applicants should be based; the position itself may be remote. */
  country: CountryRef | null;
  remote: boolean;
  /** Offered equity in percent. */
  equity: { min: number; max: number } | null;
  skills: NamedRef[];
  description: string;
  postedAt: string;
  updatedAt: string;
  /** Listed until this moment. */
  validThrough: string | null;
  project: { id: number; title: string };
}

export interface PublicPosition extends PublicPositionSummary {
  project: {
    id: number;
    title: string;
    description: string;
    ownerId: number | null;
    industry: NamedRef | null;
    country: CountryRef | null;
  };
  /** The same startup's other open positions. */
  otherPositions: { id: number; path: string; title: string }[];
}

export interface ProjectLookups {
  countries: Map<number, CountryRef>;
  industries: Map<number, NamedRef>;
}

const FALLBACK_TITLE = 'Team member';
const MAX_SLUG_PART = 60;

/** Lowercase ASCII words joined by dashes; empty when nothing usable is left. */
export function slugify(text: string | null | undefined): string {
  return (text ?? '')
    .normalize('NFKD')
    .replace(/[̀-ͯ]/g, '')
    .toLowerCase()
    .replace(/&/g, ' and ')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, MAX_SLUG_PART)
    .replace(/-+$/g, '');
}

export function positionSlug(
  roleName: string | null | undefined,
  projectTitle: string | null | undefined,
): string {
  const role = slugify(roleName) || 'position';
  const project = slugify(projectTitle);
  return project ? `${role}-at-${project}` : role;
}

export function positionPath(id: number, slug: string): string {
  return `/positions/${id}/${slug}`;
}

const iso = (value: Date | string | null | undefined): string | null =>
  value ? new Date(value).toISOString() : null;

/**
 * A position row with its project, role, country, equity and skills loaded, as the
 * public summary. `position.country_id` is the Country model: the association carries
 * that name, the column is `country`.
 */
export function toPublicSummary(
  position: ProjectPosition,
  now: Date = new Date(),
): PublicPositionSummary {
  const title = position.role?.name || FALLBACK_TITLE;
  const slug = positionSlug(position.role?.name, position.project?.title);
  const country = position.country_id;

  return {
    id: position.id,
    slug,
    path: positionPath(position.id, slug),
    state: position.currentState(now),
    title,
    role: position.role
      ? { id: position.role.id, name: position.role.name }
      : null,
    country: country
      ? { id: country.id, name: country.name, code: country.code }
      : null,
    remote: position.is_remote !== false,
    equity: position.equity
      ? { min: position.equity.min, max: position.equity.max }
      : null,
    skills: (position.skills ?? [])
      .filter((skill) => !!skill.name)
      .map((skill) => ({ id: skill.id, name: skill.name })),
    description: position.description ?? '',
    postedAt: iso(position.createdAt),
    updatedAt: iso(position.updatedAt),
    validThrough: iso(position.expires_at),
    project: {
      id: position.project?.id,
      title: position.project?.title ?? '',
    },
  };
}

export function toPublicPosition(
  position: ProjectPosition,
  others: ProjectPosition[],
  lookups: ProjectLookups,
  now: Date = new Date(),
): PublicPosition {
  const project = position.project;

  return {
    ...toPublicSummary(position, now),
    project: {
      id: project.id,
      title: project.title,
      description: project.description ?? '',
      ownerId: project.owner_id ?? null,
      industry: lookups.industries.get(project.industries) ?? null,
      country: lookups.countries.get(project.country) ?? null,
    },
    otherPositions: others.map((other) => {
      const slug = positionSlug(other.role?.name, project.title);
      return {
        id: other.id,
        path: positionPath(other.id, slug),
        title: other.role?.name || FALLBACK_TITLE,
      };
    }),
  };
}

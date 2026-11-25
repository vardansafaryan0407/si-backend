import { ProjectPosition } from '../project/models/project-position';
import {
  positionPath,
  positionSlug,
  slugify,
  toPublicPosition,
  toPublicSummary,
} from './position-presenter';

const NOW = new Date('2026-11-25T12:00:00Z');
const LATER = new Date('2027-01-24T12:00:00Z');

/** A loaded position as the presenter sees it; currentState is the model's own logic. */
function position(overrides: Record<string, unknown> = {}): ProjectPosition {
  return {
    id: 12,
    status: 'open',
    is_remote: true,
    expires_at: LATER,
    description: 'Run our social channels.',
    createdAt: new Date('2026-11-20T10:00:00Z'),
    updatedAt: new Date('2026-11-21T10:00:00Z'),
    role: { id: 5, name: 'SMM Manager' },
    country_id: { id: 3, name: 'Armenia', code: 'AM' },
    equity: { min: 1, max: 5 },
    skills: [
      { id: 1, name: 'Copywriting' },
      { id: 2, name: null },
    ],
    project: {
      id: 7,
      title: 'Acme Labs',
      description: 'We build rockets.',
      owner_id: 42,
      country: 3,
      industries: 9,
    },
    currentState: ProjectPosition.prototype.currentState,
    ...overrides,
  } as unknown as ProjectPosition;
}

describe('slugify', () => {
  it('turns names into lowercase dashed words', () => {
    expect(slugify('SMM Manager')).toBe('smm-manager');
    expect(slugify('  C++ / Rust   Engineer ')).toBe('c-rust-engineer');
    expect(slugify('R&D Lead')).toBe('r-and-d-lead');
  });

  it('drops accents instead of the letters under them', () => {
    expect(slugify('Café Zoë')).toBe('cafe-zoe');
  });

  it('gives an empty string when nothing usable is left', () => {
    expect(slugify('')).toBe('');
    expect(slugify(null)).toBe('');
    expect(slugify('Стартап')).toBe('');
  });

  it('keeps slugs short and never ends them with a dash', () => {
    const slug = slugify('word '.repeat(40));
    expect(slug.length).toBeLessThanOrEqual(60);
    expect(slug.endsWith('-')).toBe(false);
  });
});

describe('positionSlug and positionPath', () => {
  it('reads "<role>-at-<startup>"', () => {
    expect(positionSlug('SMM Manager', 'Acme Labs')).toBe(
      'smm-manager-at-acme-labs',
    );
    expect(positionPath(12, 'smm-manager-at-acme-labs')).toBe(
      '/positions/12/smm-manager-at-acme-labs',
    );
  });

  it('still gives a usable slug when a name cannot be written in ASCII', () => {
    expect(positionSlug('SMM Manager', 'Стартап')).toBe('smm-manager');
    expect(positionSlug(null, 'Acme')).toBe('position-at-acme');
    expect(positionSlug(null, null)).toBe('position');
  });
});

describe('ProjectPosition.currentState', () => {
  it('is open before the expiry date', () => {
    expect(position().currentState(NOW)).toBe('open');
  });

  it('is expired from the expiry date on', () => {
    expect(position({ expires_at: NOW }).currentState(NOW)).toBe('expired');
  });

  it('is closed when the owner closed it, whatever the date', () => {
    expect(position({ status: 'closed' }).currentState(NOW)).toBe('closed');
    expect(
      position({ status: 'closed', expires_at: NOW }).currentState(NOW),
    ).toBe('closed');
  });

  it('stays open without an expiry date', () => {
    expect(position({ expires_at: null }).currentState(NOW)).toBe('open');
  });
});

describe('toPublicSummary', () => {
  it('writes out the public shape', () => {
    expect(toPublicSummary(position(), NOW)).toEqual({
      id: 12,
      slug: 'smm-manager-at-acme-labs',
      path: '/positions/12/smm-manager-at-acme-labs',
      state: 'open',
      title: 'SMM Manager',
      role: { id: 5, name: 'SMM Manager' },
      country: { id: 3, name: 'Armenia', code: 'AM' },
      remote: true,
      equity: { min: 1, max: 5 },
      skills: [{ id: 1, name: 'Copywriting' }],
      description: 'Run our social channels.',
      postedAt: '2026-11-20T10:00:00.000Z',
      updatedAt: '2026-11-21T10:00:00.000Z',
      validThrough: '2027-01-24T12:00:00.000Z',
      project: { id: 7, title: 'Acme Labs' },
    });
  });

  it('copes with a position that has no role, country, equity or skills', () => {
    const summary = toPublicSummary(
      position({
        role: null,
        country_id: null,
        equity: null,
        skills: undefined,
        description: null,
      }),
      NOW,
    );
    expect(summary).toMatchObject({
      title: 'Team member',
      slug: 'position-at-acme-labs',
      role: null,
      country: null,
      equity: null,
      skills: [],
      description: '',
    });
  });
});

describe('toPublicPosition', () => {
  const lookups = {
    countries: new Map([[3, { id: 3, name: 'Armenia', code: 'AM' }]]),
    industries: new Map([[9, { id: 9, name: 'Aerospace' }]]),
  };

  it('adds the project with resolved names and the other open positions', () => {
    const other = position({ id: 13, role: { id: 6, name: 'CTO' } });
    const result = toPublicPosition(position(), [other], lookups, NOW);

    expect(result.project).toEqual({
      id: 7,
      title: 'Acme Labs',
      description: 'We build rockets.',
      ownerId: 42,
      industry: { id: 9, name: 'Aerospace' },
      country: { id: 3, name: 'Armenia', code: 'AM' },
    });
    expect(result.otherPositions).toEqual([
      { id: 13, path: '/positions/13/cto-at-acme-labs', title: 'CTO' },
    ]);
  });

  it('leaves industry and country empty when the ids are unknown', () => {
    const result = toPublicPosition(
      position(),
      [],
      { countries: new Map(), industries: new Map() },
      NOW,
    );
    expect(result.project.industry).toBeNull();
    expect(result.project.country).toBeNull();
  });
});

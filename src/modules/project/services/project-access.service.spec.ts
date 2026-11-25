import { ForbiddenException, NotFoundException } from '@nestjs/common';
import { ProjectAccessService } from './project-access.service';
import { Project } from '../project';
import { ProjectPosition } from '../models/project-position';
import { ProjectPositionApplication } from '../models/project-position-application';

// The models are only stubbed: these tests are about who is let through, not about SQL.
describe('ProjectAccessService', () => {
  const OWNER = 1;
  const APPLICANT = 2;
  const STRANGER = 3;

  let service: ProjectAccessService;

  beforeEach(() => {
    service = new ProjectAccessService();
    jest
      .spyOn(Project, 'findByPk')
      .mockImplementation(async (id) =>
        id === 10 ? ({ id: 10, owner_id: OWNER } as Project) : null,
      );
    jest.spyOn(ProjectPosition, 'findByPk').mockImplementation(async (id) => {
      if (id === 20) return { id: 20, project_id: 10 } as ProjectPosition;
      if (id === 21) return { id: 21, project_id: null } as ProjectPosition;
      return null;
    });
    jest
      .spyOn(ProjectPositionApplication, 'findByPk')
      .mockImplementation(async (id) =>
        id === 30
          ? ({
              id: 30,
              user_id: APPLICANT,
              position_id: 20,
            } as ProjectPositionApplication)
          : null,
      );
  });

  afterEach(() => jest.restoreAllMocks());

  describe('assertProjectOwner', () => {
    it('lets the owner through', async () => {
      await expect(
        service.assertProjectOwner(10, OWNER),
      ).resolves.toBeUndefined();
    });

    it('accepts an owner id that arrives as a string from the token', async () => {
      await expect(
        service.assertProjectOwner(10, '1' as unknown as number),
      ).resolves.toBeUndefined();
    });

    it('refuses anybody else', async () => {
      await expect(service.assertProjectOwner(10, STRANGER)).rejects.toThrow(
        ForbiddenException,
      );
    });

    it('answers 404 for a project that does not exist', async () => {
      await expect(service.assertProjectOwner(99, OWNER)).rejects.toThrow(
        NotFoundException,
      );
    });
  });

  describe('assertPositionOwner', () => {
    it('follows the position to its project', async () => {
      await expect(
        service.assertPositionOwner(20, OWNER),
      ).resolves.toBeUndefined();
      await expect(service.assertPositionOwner(20, STRANGER)).rejects.toThrow(
        ForbiddenException,
      );
    });

    it('answers 404 for a missing position and for one without a project', async () => {
      await expect(service.assertPositionOwner(99, OWNER)).rejects.toThrow(
        NotFoundException,
      );
      await expect(service.assertPositionOwner(21, OWNER)).rejects.toThrow(
        NotFoundException,
      );
    });
  });

  describe('assertApplicationOwner', () => {
    it('is for the project owner only: the applicant cannot decide on it', async () => {
      await expect(
        service.assertApplicationOwner(30, OWNER),
      ).resolves.toBeUndefined();
      await expect(
        service.assertApplicationOwner(30, APPLICANT),
      ).rejects.toThrow(ForbiddenException);
    });

    it('answers 404 for a missing application', async () => {
      await expect(service.assertApplicationOwner(99, OWNER)).rejects.toThrow(
        NotFoundException,
      );
    });
  });

  describe('assertApplicationParty', () => {
    it('lets the owner and the applicant read it, nobody else', async () => {
      await expect(
        service.assertApplicationParty(30, OWNER),
      ).resolves.toBeUndefined();
      await expect(
        service.assertApplicationParty(30, APPLICANT),
      ).resolves.toBeUndefined();
      await expect(
        service.assertApplicationParty(30, STRANGER),
      ).rejects.toThrow(ForbiddenException);
    });
  });
});

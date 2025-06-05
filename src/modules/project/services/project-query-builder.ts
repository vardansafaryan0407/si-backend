import { Op } from 'sequelize';

export class ProjectQueryBuilder {
  static buildSkillsQuery(skills: number[] = []): object {
    if (skills) {
      return skills.length ? { where: { id: { [Op.in]: skills } } } : {};
    } else {
      return {};
    }
  }

  static buildEquityQuery(equity = null): object {
    if (equity) {
      return equity.min || equity.max
        ? {
            where: {
              ...(equity.min ? { min: { [Op.gte]: equity.min } } : {}),
              ...(equity.max ? { max: { [Op.lte]: equity.max } } : {}),
            },
          }
        : {};
    } else {
      return {};
    }
  }
}

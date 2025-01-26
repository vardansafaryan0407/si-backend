export interface IProjectQueryInterface {
    query?: string;
    industryId?: number;
    locationId?: number;
    roleId?: number;
    offset?: number;
    limit?: number;
    equity?: {
        min?: number;
        max?: number;
    };
}

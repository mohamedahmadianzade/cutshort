export default interface IUserRole {
  userId?: string;
  roleId?: string;
}

export interface IUserRoleCreate {
  userId: string;
  roleId: string;
}
export interface IUserRoleDelete {
  userId: string;
  roleId: string;
}

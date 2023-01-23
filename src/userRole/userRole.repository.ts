import IUserRole from "./userRole.interface";
import UserRoleModel from "./userRole.model";
export default class UserRoleRepository {
  getAll = async (filter: IUserRole): Promise<IUserRole[]> => {
    const userRoles = await UserRoleModel.find(filter);
    return userRoles;
  };

  delete = async (filter: IUserRole) => {
    const result = await UserRoleModel.deleteOne(filter);
    return result.deletedCount;
  };
  create = async (userRole: IUserRole) => {
    const userRoleModel = new UserRoleModel();
    const { userId, roleId } = userRole;
    userRoleModel.userId = userId;
    userRoleModel.roleId = roleId;
    const result = await userRoleModel.save();
    return result;
  };
}

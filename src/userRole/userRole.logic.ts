import UserRepository from "../user/user.repository";
import { ObjectId } from "mongodb";
import UserRoleRepository from "./userRole.repository";
import IUserRole, {
  IUserRoleDelete,
  IUserRoleCreate,
} from "./userRole.interface";
import { Roles } from "../authentication/roles";

const userRoleRepository = new UserRoleRepository();
export default class UserRoleLogic {
  async getAll(filter: IUserRole) {
    return userRoleRepository.getAll(filter);
  }
  async delete(filter: IUserRoleDelete) {
    const result = await userRoleRepository.delete(filter);
    if (!result) throw new Error("This record does not exist");
    return "Record deleted successfully";
  }

  async create(userRole: IUserRoleCreate): Promise<IUserRole> {
    if (!userRole.userId) throw new Error("Please enter a userId");
    if (!userRole.roleId) throw new Error("Please enter a roleId");
    if (!Object.keys(Roles).includes(userRole.roleId))
      throw new Error("RoleId is invalud");

    const userInfo = await new UserRepository().getByUserId(
      userRole.userId,
      undefined,
      true
    );
    if (!userInfo) throw new Error("UserId is not valid");

    const userRoleExist = await userRoleRepository.getAll(userRole);
    if (userRoleExist.length !== 0)
      throw new Error("This user has selected role already");

    return userRoleRepository.create(userRole);
  }

  _checkId(id: string, name: string): string {
    if (!id) throw new Error(`Please enter a valid ${name}`);
    try {
      return new ObjectId(id).toString();
    } catch (error) {
      throw new Error(`${name} is not valid`);
    }
  }
}

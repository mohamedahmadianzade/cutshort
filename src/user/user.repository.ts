import { hash, pagination } from "../general";
import IUser, {
  IUserInput,
  IGetAllUsersInput,
  IUserOutput,
} from "./user.interface";
import UserModel from "./user.model";
import { uuid } from "uuidv4";
import moment from "moment";
import UserRoleModel from "../userRole/userRole.model";
import { Roles } from "../authentication/roles";
export default class UserRepository {
  /*
    Admin user can see all users
    normal user can see just his information
  */
  getAllUsers = async (_filter: IGetAllUsersInput): Promise<IUserOutput[]> => {
    const filter: IGetAllUsersInput = {};
    if (_filter.username) filter.username = _filter.username;
    if (_filter.fullname) filter.fullname = _filter.fullname;
    if (_filter.enabled) filter.enabled = _filter.enabled;

    const paginationInfo = pagination(_filter.page, _filter.pageSize);

    const users = await UserModel.find(filter)
      .skip(paginationInfo.skip)
      .limit(paginationInfo.limit);
    return users.map((user) => this._formatUser(user));
  };

  getByUserId = async (userId: string): Promise<IUserOutput | null> => {
    const user = await UserModel.findOne({ userId });
    return user ? this._formatUser(user) : null;
  };

  getUser = async (filter: any): Promise<IUserOutput | null> => {
    const user = await UserModel.findOne(filter);
    return user ? this._formatUser(user) : null;
  };
  _formatUser = (user: IUser) => {
    return {
      userId: user.userId,
      fullname: user.fullname,
      username: user.username,
      createDate: moment(user.createDate).format("MMMM Do YYYY, h:mm:ss a"),
    };
  };

  createUser = async (user: IUserInput) => {
    const userModel = new UserModel();
    userModel.userId = uuid();
    userModel.username = user.username;
    userModel.fullname = user.fullname;
    userModel.password = hash(user.password);
    const result = await userModel.save();
    // add default user role to each user
    const userRoleModel = new UserRoleModel({
      userId: userModel.userId,
      roleId: Roles.user,
    });
    await userRoleModel.save();
    return this._formatUser(result);
  };
}

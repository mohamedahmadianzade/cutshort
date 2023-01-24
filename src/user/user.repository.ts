import { hash, pagination } from "../general";
import IUser, {
  IUserInput,
  IGetAllUsersInput,
  IUserOutput,
  IUserLoginOutput,
} from "./user.interface";
import UserModel from "./user.model";
import moment from "moment";
import UserRoleModel from "../userRole/userRole.model";
import { Roles } from "../authentication/roles";
export default class UserRepository {
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

  getByUserId = async (_id: string): Promise<IUserOutput | null> => {
    const user = await UserModel.findOne({ _id });
    return user ? this._formatUser(user) : null;
  };

  login = async (username: string): Promise<IUserLoginOutput | null> => {
    const user = await UserModel.findOne({ username }).select(
      "_id username password"
    );
    return user
      ? { userId: user._id, username: user.username, password: user.password }
      : null;
  };

  getUser = async (filter: any): Promise<IUserOutput | null> => {
    const user = await UserModel.findOne(filter);
    return user ? this._formatUser(user) : null;
  };
  createUser = async (user: IUserInput) => {
    const userModel = new UserModel();
    userModel.username = user.username;
    userModel.fullname = user.fullname;
    userModel.password = hash(user.password);
    const result = await userModel.save();

    // add default user role to each user
    const userRoleModel = new UserRoleModel({
      userId: userModel._id,
      roleId: Roles.user,
    });
    await userRoleModel.save();
    return this._formatUser(result);
  };

  _formatUser = (user: IUser): IUserOutput => {
    return {
      userId: user._id,
      fullname: user.fullname,
      username: user.username,
      createDate: moment(user.createDate).format("YYYY-MM-DD HH:mm:ss"),
    };
  };
}

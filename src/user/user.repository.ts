export default class UserRepository {
  getAllUsers = async () => {
    return [{ userId: 1 , name:"D" }];
  };
  getByUserId = async (userId: string ) => {
    return [{ userId }];
  };
}

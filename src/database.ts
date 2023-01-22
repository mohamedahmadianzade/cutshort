import { connect } from "mongoose";
export default class Database {
  static async initMongo(): Promise<void> {
    const connection = `${process.env.MONGODB_HOST}:${process.env.MONGODB_PORT}/${process.env.MONGODB_DATABASE}`;
    await connect(`mongodb://${connection}`);
    console.log(`----- MongoDB Running at  : ${connection}`);
  }
}

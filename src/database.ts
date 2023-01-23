import mongoose , { connect } from "mongoose";
import { MONGODB_HOST, MONGODB_PORT, MONGODB_DATABASE } from "./env";
mongoose.set("strictQuery", false);
export default class Database {
  static async initMongo(): Promise<void> {
    const connection = `${MONGODB_HOST}:${MONGODB_PORT}/${MONGODB_DATABASE}`;
    await connect(`mongodb://${connection}`);
    /* tslint:disable */
    console.log(`----- MongoDB Running at  : ${connection} ---------`);
  }
}

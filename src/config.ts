import dotenv from "dotenv";
dotenv.config();
export const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY || "";
export const JWT_EXPIRE = process.env.JWT_EXPIRE || "1800s";

export const SALT = process.env.SALT || "$2b$10$NLzZuvwnUVm/k/kPB5yu7.";

export const PORT = process.env.PORT || "3000";

export const MONGODB_HOST = process.env.MONGODB_HOST || "127.0.0.1";
export const MONGODB_PORT = process.env.MONGODB_PORT || "27017";
export const MONGODB_DATABASE = process.env.MONGODB_DATABASE || "cutshort";

export const QUERY_PAGESIZE: number = process.env.QUERY_PAGESIZE
  ? parseInt(process.env.QUERY_PAGESIZE, 10)
  : 10;

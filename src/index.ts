import app from "./app";
import http from "http";

/*
Load environment variables
*/
import dotenv from "dotenv";
import Database from "./database";
import { PORT } from "./env";
dotenv.config();

/**
 * Get port from environment and store in Express.
 */

const port: string = PORT || "3000";
app.set("port", port);

/**
 * Create HTTP server.
 */

const server = http.createServer(app);

/**
 * Connect to MongoDB server
 */

Database.initMongo()

/**
 * Listen on provided port, on all network interfaces.
 */

/* tslint:disable */
server.listen(port, () => {
  console.log(`----- Server  Running at  : ${port} ---------`);
});

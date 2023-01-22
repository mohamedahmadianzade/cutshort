import app from "./app";
import http from "http";

/*
Load environment variables
*/
import dotenv from "dotenv";
dotenv.config();

/**
 * Get port from environment and store in Express.
 */

const port: string = process.env.PORT || "3000";
app.set("port", port);

/**
 * Create HTTP server.
 */

const server = http.createServer(app);

/**
 * Listen on provided port, on all network interfaces.
 */

/* tslint:disable */
server.listen(port, () => {
  console.log("--------------------------------------");
  console.log(`Server is listening on port ${port}`);
  console.log("--------------------------------------");
});

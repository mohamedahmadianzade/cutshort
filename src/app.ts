import express from "express";
import morgan from "morgan";
const rateLimit = require("express-rate-limit");
import UserRouter from "./user/user.route";

const app = express();

/*
==============================================
 usefull middlewares
==============================================
*/
// request logger
app.use(morgan("common"));
// security- header
// rate limmit
const limiter = rateLimit({
  windowMs: 60 * 1000, // 1 minute
  max: 2, // limit each IP to 20000 requests per windowMs
  message: "Too many request from this IP, please try again after a 1 minute",
});
app.use(limiter);

/*
==============================================
 usefull middlewares
==============================================
*/
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use("/users", UserRouter);



export default app;

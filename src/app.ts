import express from "express";
import morgan from "morgan";
import authenticationRouter from "./authentication/authentication.route";
import todoRouter from "./todo/todo.route";
import rateLimit from "express-rate-limit";
import UserRouter from "./user/user.route";
import postRouter from "./post/post.route";
import commentRouter from "./comment/comment.route";
import UserRoleRouter from "./userRole/userRole.route";
import AuthenticationMiddleware, {
  AdminAccess,
} from "./authentication/authentication.middleware";

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
  max: 20, // limit each IP to 20000 requests per windowMs
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
app.use("/userRoles", AdminAccess, UserRoleRouter);
app.use("/todos", AuthenticationMiddleware, todoRouter);
app.use("/posts", AuthenticationMiddleware, postRouter);
app.use("/comments", AuthenticationMiddleware, commentRouter);
app.use("/", authenticationRouter);

export default app;

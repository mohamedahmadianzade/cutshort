import Router from "express";
import AuthenticationController from "./authentication.controller";
import AuthenticationMiddleware from "./authentication.middleware";

const authenticationRouter = Router();
const authenticationController = new AuthenticationController();

authenticationRouter.post("/signIn", authenticationController.signin);
authenticationRouter.post("/signUp", authenticationController.signup);
authenticationRouter.get(
  "/me",
  AuthenticationMiddleware,
  authenticationController.me
);

export default authenticationRouter;

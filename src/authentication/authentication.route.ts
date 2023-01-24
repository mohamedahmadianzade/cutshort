import Router from "express";
import AuthenticationController from "./authentication.controller";

const authenticationRouter = Router();
const authenticationController = new AuthenticationController();

authenticationRouter.post("/signIn", authenticationController.signin);
authenticationRouter.post("/signUp", authenticationController.signup);

export default authenticationRouter;

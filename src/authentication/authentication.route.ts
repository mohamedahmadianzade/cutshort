import Router from "express";
import AuthenticationController from "./authentication.controller";

const authenticationRouter = Router();
const authenticationController = new AuthenticationController();

authenticationRouter.post("/login", authenticationController.login);

export default authenticationRouter;

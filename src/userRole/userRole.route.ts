import { Router } from "express";
import UserRoleController from "./userRole.controller";

const UserRoleRouter = Router();
const userRoleController = new UserRoleController();

UserRoleRouter.get("/", userRoleController.getAll);
UserRoleRouter.delete("/", userRoleController.delete);
UserRoleRouter.post("/", userRoleController.create);

export default UserRoleRouter;

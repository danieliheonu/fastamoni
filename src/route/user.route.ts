import { login, register } from "../controller/user.controller";
import { validateLogin, validateRegister } from "../validation/user.validation";
import { Router } from "express";

const userRouter = Router();

userRouter.post("/register", validateRegister, register);
userRouter.post("/login", validateLogin, login);

export default userRouter;

import { Router } from "express";
import userRouter from "./user.route";
import transactionRouter from "./transaction.route";

const route = Router();

route.use("/auth", userRouter);
route.use("/transaction", transactionRouter);

export default route;

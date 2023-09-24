import { Router } from "express";
import { validateTxnPin } from "../validation/transaction.validation";
import { createTxnPin } from "../controller/transaction.controller";
import jwt from "../middleware/verifyToken";

const transactionRouter = Router();

transactionRouter.post("/pin", jwt, validateTxnPin, createTxnPin);

export default transactionRouter;

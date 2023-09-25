import { Router } from "express";
import { validateTxnPin, validateDonation } from "../validation/transaction.validation";
import { createTxnPin, donateToBeneficiary } from "../controller/transaction.controller";
import jwt from "../middleware/verifyToken";

const transactionRouter = Router();

transactionRouter.post("/pin", jwt, validateTxnPin, createTxnPin);
transactionRouter.post("/donate", jwt, validateDonation, donateToBeneficiary);

export default transactionRouter;

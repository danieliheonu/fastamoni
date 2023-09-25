import { Router } from "express";
import { validateTxnPin, validateDonation } from "../validation/transaction.validation";
import {
	createTxnPin,
	donateToBeneficiary,
	getDonations,
	filterDonations,
	getTransaction,
} from "../controller/transaction.controller";
import jwt from "../middleware/verifyToken";

const transactionRouter = Router();

transactionRouter.post("/pin", jwt, validateTxnPin, createTxnPin);
transactionRouter.post("/donate", jwt, validateDonation, donateToBeneficiary);
transactionRouter.get("/count", jwt, getDonations);
transactionRouter.get("/donations", jwt, filterDonations);
transactionRouter.get("/donations/:id", jwt, getTransaction);

export default transactionRouter;

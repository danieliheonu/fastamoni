import { Response, NextFunction } from "express";
import { Request as JWTRequest } from "express-jwt";
import User from "../model/user.model";
import { NotFoundException } from "../utils/serviceException";
import Transaction from "../model/transaction.model";

export const createTxnPin = async (req: JWTRequest, res: Response, next: NextFunction) => {
	try {
		const { pin } = req.body;

		const user = await User.findByPk(req.auth?.id);

		if (!user) {
			throw new NotFoundException("User not found");
		}

		user.transactionPin = pin;

		await user.save();

		return res.status(200).json({
			message: "Transaction pin created successfully",
		});
	} catch (err) {
		next(err);
	}
};

export const donateToBeneficiary = async (req: JWTRequest, res: Response, next: NextFunction) => {
	try {
		const { amount, beneficiaryId } = req.body;

		const user = await User.findByPk(req.auth?.id);

		if (!user) {
			throw new NotFoundException("User not found");
		}

		const beneficiary = await User.findByPk(beneficiaryId);

		if (!beneficiary) {
			throw new NotFoundException("Beneficiary not found");
		}

		const transaction = await Transaction.create({ amount, beneficiaryId });

		const userWallet = await user.getWallet();
		const beneficiaryWallet = await beneficiary.getWallet();

		// check if user has enough balance
		if (userWallet.amount < amount) {
			throw new NotFoundException("Insufficient balance");
		}

		// deduct amount from user wallet
		userWallet.amount -= amount;
		// add amount to beneficiary wallet
		beneficiaryWallet.amount += amount;
		await userWallet.save();
		await beneficiaryWallet.save();

		// associate transaction with user
		user.addTransaction(transaction);

		return res.status(200).json({
			message: "Donation successful",
		});
	} catch (err) {
		next(err);
	}
};

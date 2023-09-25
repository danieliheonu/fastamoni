import { Response, NextFunction } from "express";
import { Request as JWTRequest } from "express-jwt";
import User from "../model/user.model";
import { NotFoundException } from "../utils/serviceException";
import Transaction from "../model/transaction.model";
import { Op } from "sequelize";

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

export const getDonations = async (req: JWTRequest, res: Response, next: NextFunction) => {
	try {
		const user = await User.findByPk(req.auth?.id);

		if (!user) {
			throw new NotFoundException("User not found");
		}

		const transactions = await user.countTransactions();

		return res.status(200).json({
			message: "Transactions count fetched successfully",
			transactions,
		});
	} catch (err) {
		next(err);
	}
};

export const filterDonations = async (req: JWTRequest, res: Response, next: NextFunction) => {
	try {
		const user = await User.findByPk(req.auth?.id);

		if (!user) {
			throw new NotFoundException("User not found");
		}

		let { startDate, endDate } = req.query;

		const start = startDate ? new Date(startDate as string).toISOString() : null;
		const end = endDate ? new Date(endDate as string).toISOString() : null;

		let transactions;

		if (start && end) {
			transactions = await Transaction.findAll({
				where: {
					createdAt: {
						[Op.between]: [start, end],
					},
				},
				include: [
					{
						model: User,
						where: {
							id: user.id,
						},
					},
				],
			});
		} else if (start) {
			transactions = await Transaction.findAll({
				where: {
					createdAt: {
						[Op.gte]: start,
					},
				},
				include: [
					{
						model: User,
						where: {
							id: user.id,
						},
						attributes: { exclude: ["id", "password", "transactionPin"] },
					},
				],
			});
		} else if (end) {
			transactions = await Transaction.findAll({
				where: {
					createdAt: {
						[Op.lt]: end,
					},
				},
				include: [
					{
						model: User,
						where: {
							id: user.id,
						},
						attributes: { exclude: ["id", "password", "transactionPin"] },
					},
				],
			});
		} else {
			transactions = await Transaction.findAll({
				include: [
					{
						model: User,
						where: {
							id: user.id,
						},
						attributes: { exclude: ["id", "password", "transactionPin"] },
					},
				],
			});
		}

		return res.status(200).json({
			message: "Transactions fetched successfully",
			total: transactions.length,
			transactions,
		});
	} catch (err) {
		console.log(err);
		next(err);
	}
};

export const getTransaction = async (req: JWTRequest, res: Response, next: NextFunction) => {
	try {
		const user = await User.findByPk(req.auth?.id);

		if (!user) {
			throw new NotFoundException("User not found");
		}

		const transaction = await Transaction.findOne({
			where: {
				id: req.params.id,
			},
			include: [
				{
					model: User,
					where: {
						id: user.id,
					},
					attributes: { exclude: ["id", "password", "transactionPin"] },
				},
			],
		});

		if (!transaction) {
			throw new NotFoundException("Transaction not found");
		}

		return res.status(200).json({
			message: "Transaction fetched successfully",
			transaction,
		});
	} catch (err) {
		next(err);
	}
};

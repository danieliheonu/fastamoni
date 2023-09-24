import { Response, NextFunction } from "express";
import { Request as JWTRequest } from "express-jwt";
import User from "../model/user.model";
import { NotFoundException } from "../utils/serviceException";

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

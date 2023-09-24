import { Request, Response, NextFunction } from "express";
import { Request as JWTRequest } from "express-jwt";
import User from "../model/user.model";
import Wallet from "../model/wallet.model";
import bcrypt from "bcryptjs";
import { NotFoundException, BadRequestException } from "../utils/serviceException";
import jwt from "jsonwebtoken";

export const register = async (req: Request, res: Response, next: NextFunction) => {
	const { name, email, password } = req.body;

	try {
		await User.create({
			name,
			email,
			password,
		});

		const user = await User.findOne({ where: { email } });

		const wallet = await Wallet.create();

		// create a user wallet
		user?.setWallet(wallet);

		return res.status(201).json({
			message: "User created successfully",
		});
	} catch (error) {
		next(error);
	}
};

export const login = async (req: Request, res: Response, next: NextFunction) => {
	const { email, password } = req.body;

	try {
		const user = await User.findOne({
			where: {
				email,
			},
		});

		if (!user) {
			throw new NotFoundException("User not found");
		}

		const isPasswordValid = await bcrypt.compare(password, user.password);

		if (!isPasswordValid) {
			throw new BadRequestException("Invalid password");
		}

		const token = jwt.sign({ id: user?.id }, process.env.JWT_SECRET as string, {
			expiresIn: "5h",
		});

		return res.status(200).json({
			message: "User logged in successfully",
			token,
		});
	} catch (err) {
		next(err);
	}
};

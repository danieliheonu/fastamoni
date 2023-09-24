import {
	DataTypes,
	Model,
	CreationOptional,
	InferAttributes,
	InferCreationAttributes,
} from "sequelize";
import sequelize from "../config/db";
import Wallet, { WalletModel } from "./wallet.model";
import bcrypt from "bcryptjs";

export interface UserModel
	extends Model<InferAttributes<UserModel>, InferCreationAttributes<UserModel>> {
	id: CreationOptional<string>;
	name: string;
	email: string;
	password: string;
	transactionPin: CreationOptional<string>;
	createdAt: CreationOptional<Date>;
	updatedAt: CreationOptional<Date>;
	setWallet: (wallet: WalletModel) => void;
}

const User = sequelize.define<UserModel>("user", {
	id: {
		type: DataTypes.UUID,
		defaultValue: DataTypes.UUIDV4,
		primaryKey: true,
	},
	name: {
		type: DataTypes.STRING,
		allowNull: false,
	},
	email: {
		type: DataTypes.STRING(100),
		allowNull: false,
		unique: true,
		validate: {
			isEmail: true,
		},
		set(value: string) {
			this.setDataValue("email", value.toLowerCase());
		},
	},
	password: {
		type: DataTypes.STRING,
		set(value: string) {
			const salt = bcrypt.genSaltSync(10);
			const hashedPassword = bcrypt.hashSync(value, salt);
			this.setDataValue("password", hashedPassword);
		},
	},
	transactionPin: {
		type: DataTypes.STRING,
		defaultValue: "0000",
		set(value: string) {
			const salt = bcrypt.genSaltSync(10);
			const hashedPin = bcrypt.hashSync(value, salt);
			this.setDataValue("transactionPin", hashedPin);
		},
	},
	createdAt: DataTypes.DATE,
	updatedAt: DataTypes.DATE,
});

User.hasOne(Wallet);

export default User;

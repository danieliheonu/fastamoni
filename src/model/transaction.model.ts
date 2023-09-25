import {
	DataTypes,
	Model,
	InferAttributes,
	InferCreationAttributes,
	CreationOptional,
} from "sequelize";
import sequelize from "../config/db";
import User, { UserModel } from "./user.model";

export interface TransactionModel
	extends Model<InferAttributes<TransactionModel>, InferCreationAttributes<TransactionModel>> {
	id: CreationOptional<string>;
	amount: number;
	beneficiaryId: string;
}

const Transaction = sequelize.define<TransactionModel>("transaction", {
	id: {
		type: DataTypes.UUID,
		defaultValue: DataTypes.UUIDV4,
		primaryKey: true,
	},
	amount: {
		type: DataTypes.FLOAT,
		allowNull: false,
	},
	beneficiaryId: {
		type: DataTypes.UUID,
		allowNull: false,
	},
});

export default Transaction;

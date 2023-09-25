import {
	DataTypes,
	Model,
	InferAttributes,
	InferCreationAttributes,
	CreationOptional,
} from "sequelize";
import sequelize from "../config/db";

export interface TransactionModel
	extends Model<InferAttributes<TransactionModel>, InferCreationAttributes<TransactionModel>> {
	id: CreationOptional<string>;
	amount: number;
	beneficiaryId: string;
	createdAt: CreationOptional<Date>;
	updatedAt: CreationOptional<Date>;
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
	createdAt: DataTypes.DATE,
	updatedAt: DataTypes.DATE,
});

export default Transaction;

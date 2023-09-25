import {
	DataTypes,
	Model,
	CreationOptional,
	InferAttributes,
	InferCreationAttributes,
} from "sequelize";
import sequelize from "../config/db";

export interface WalletModel
	extends Model<InferAttributes<WalletModel>, InferCreationAttributes<WalletModel>> {
	id: CreationOptional<string>;
	amount: CreationOptional<number>;
}

const Wallet = sequelize.define<WalletModel>("wallet", {
	id: {
		type: DataTypes.UUID,
		defaultValue: DataTypes.UUIDV4,
		primaryKey: true,
	},
	amount: {
		type: DataTypes.INTEGER,
		defaultValue: 0,
	},
});

export default Wallet;

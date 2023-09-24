import { Sequelize } from "sequelize";

const { DATABASE_NAME, DATABASE_USERNAME, DATABASE_PASSWORD, DATABASE_HOST } = process.env;

const sequelize = new Sequelize(
	`postgres://${DATABASE_USERNAME}:${DATABASE_PASSWORD}@${DATABASE_HOST}:5432/${DATABASE_NAME}`,
	{ logging: false }
);

export default sequelize;

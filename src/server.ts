import "dotenv/config";
import app from "./app";
import sequelize from "./config/db";

const PORT = process.env.PORT || 4000;

app.listen(PORT, async () => {
	try {
		await sequelize.authenticate();
		await sequelize.sync({ alter: true });
		console.log("Database connected successfully");
		console.log(`Server up and running on port ${PORT}`);
	} catch (error) {
		console.error("Unable to connect to the database:", error);
	}
});

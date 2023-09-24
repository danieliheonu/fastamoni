import express, { Express, Request, Response } from "express";
import cors from "cors";
import route from "./route";
import errorHandler from "./middleware/exceptionFilter";

const app = express();

app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
	res.send("Server is running! 🚀");
});

app.use("/api", route);
app.use(errorHandler);

export default app;

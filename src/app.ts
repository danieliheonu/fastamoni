import express, { Express, Request, Response } from "express";
import cors from "cors";
import route from "./route";
import errorHandler from "./middleware/exceptionFilter";
import rateLimit from "express-rate-limit";

const app = express();

app.set("trust proxy", "loopback");

// Rate limit settings
const limiter = rateLimit({
	windowMs: 30000, // 30 seconds
	max: 100,
});

app.use(limiter);

app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
	res.send("Server is running! 🚀");
});

app.use("/api", route);
app.use(errorHandler);

export default app;

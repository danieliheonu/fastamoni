import { expressjwt } from "express-jwt";

export default expressjwt({ secret: process.env.JWT_SECRET as string, algorithms: ["HS256"] });

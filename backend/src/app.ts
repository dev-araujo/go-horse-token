import { TokenRoutes } from "./features/token/token.routes";
import express from "express";
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

const tokenRoutes = new TokenRoutes();
app.use("/token", tokenRoutes.getRouter());

export default app;

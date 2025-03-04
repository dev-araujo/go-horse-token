import { FaucetController } from "./features/faucet/faucet.controller";
import { TokenController } from "./features/token/token.controller";
import express from "express";

const app = express();
app.use(express.json());

const tokenController = new TokenController();
const faucetController = new FaucetController();

app.get("/token/balance", (req, res) => tokenController.getBalance(req, res));
app.get("/token/metadata", (req, res) => tokenController.getOwner(req, res));
app.post("/token/mint", (req, res) => tokenController.mint(req, res));

app.post("/faucet/claim", (req, res) =>
  faucetController.claimFreeToken(req, res)
);
app.post("/faucet/mint", (req, res) => faucetController.mintTokens(req, res));
app.get("/faucet/fee", (req, res) => faucetController.getMintingFee(req, res));

export default app;

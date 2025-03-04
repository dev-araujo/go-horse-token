import { Request, Response } from "express";

import { FaucetServiceImpl } from "./faucet.service";

export class FaucetController {
  private faucetService: FaucetServiceImpl;

  constructor() {
    this.faucetService = new FaucetServiceImpl();
  }

  async claimFreeToken(req: Request, res: Response): Promise<void> {
    try {
      const { address } = req.body;
      if (!address) {
        res.status(400).json({ error: "Address is required" });
        return;
      }
      await this.faucetService.claimFreeToken(address);
      res.status(200).json({ message: "Free token claimed" });
    } catch (error) {
      res.status(500).json({ error: (error as Error).message });
    }
  }

  async mintTokens(req: Request, res: Response): Promise<void> {
    try {
      const { address, amount } = req.body;
      if (!address || !amount) {
        res.status(400).json({ error: "Address and amount are required" });
        return;
      }
      await this.faucetService.mintTokens(address, amount);
      res.status(201).json({ message: "Tokens minted" });
    } catch (error) {
      res.status(500).json({ error: (error as Error).message });
    }
  }

  async getMintingFee(req: Request, res: Response): Promise<void> {
    try {
      const { amount } = req.query;
      if (!amount || typeof amount !== "string") {
        res.status(400).json({ error: "Amount is required" });
        return;
      }
      const fee = await this.faucetService.getMintingFee(amount);
      res.json({ fee });
    } catch (error) {
      res.status(500).json({ error: (error as Error).message });
    }
  }
}
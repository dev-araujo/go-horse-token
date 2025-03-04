import { Request, Response } from "express";

import { TokenServiceImpl } from "./token.service";

export class TokenController {
  private tokenService: TokenServiceImpl;

  constructor() {
    this.tokenService = new TokenServiceImpl();
  }

  async getBalance(req: Request, res: Response): Promise<void> {
    try {
      const { address } = req.query;
      if (!address || typeof address !== "string") {
        res.status(400).json({ error: "Address is required" });
        return;
      }
      const balance = await this.tokenService.getBalance(address);
      res.json({ balance });
    } catch (error) {
      res.status(500).json({ error: (error as Error).message });
    }
  }

  async mint(req: Request, res: Response): Promise<void> {
    try {
      const { to, amount } = req.body;
      if (!to || !amount) {
        res.status(400).json({ error: "To and amount are required" });
        return;
      }
      await this.tokenService.mint(to, amount);
      res.status(201).json({ message: "Tokens minted successfully" });
    } catch (error) {
      res.status(500).json({ error: (error as Error).message });
    }
  }

  async getOwner(req: Request, res: Response): Promise<void> {
    try {
      const metadataUrl = await this.tokenService.owner();
      res.status(200).json({ metadataUrl: metadataUrl });
    } catch (error) {
      res.status(500).json({ error: (error as Error).message });
    }
  }
}

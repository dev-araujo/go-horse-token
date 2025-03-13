import { Request, Response } from "express";

import { ITokenService } from "./token.interface";
import { TokenService } from "./token.service";

export class TokenController {
  private tokenService: ITokenService;

  constructor() {
    this.tokenService = new TokenService();
  }

  async mintTokens(req: Request, res: Response): Promise<void> {
    try {
      const { to, amount } = req.body;
      await this.tokenService.mintTokens(to, amount);
      res.status(200).json({ message: "Tokens minted successfully" });
    } catch (error) {
      res.status(500).json({ error: (error as Error).message });
    }
  }

  async getMetadataAboutToken(req: Request, res: Response): Promise<void> {
    try {
      const metadataUrl = await this.tokenService.getMetadataAboutToken();
      const metadados = {
        url: metadataUrl,
        name: "Go Horse",
        symbol: "GOHO",
        description: "GOHO token, um token para devs agéis",
        image:
          "https://github.com/dev-araujo/go-horse-faucet/blob/main/smart-contracts/metadata/gohorse-token-image.jpg?raw=true",
        decimals: 18,
      };
      res.status(200).json(metadados);
    } catch (error) {
      res.status(500).json({ error: (error as Error).message });
    }
  }

  async getTotalMinted(req: Request, res: Response): Promise<void> {
    try {
      const totalMinted = await this.tokenService.getTotalMinted();
      res.status(200).json({ totalMinted });
    } catch (error) {
      res.status(500).json({ error: (error as Error).message });
    }
  }

  async getMaxSupply(req: Request, res: Response): Promise<void> {
    try {
      const maxSupply = await this.tokenService.getMaxSupply();
      res.status(200).json({ maxSupply });
    } catch (error) {
      res.status(500).json({ error: (error as Error).message });
    }
  }
}

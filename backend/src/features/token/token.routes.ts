import { Router, Request, Response, NextFunction } from "express";
import { ethers } from "ethers";
import { TokenController } from "./token.controller";

const asyncHandler = (
  fn: (req: Request, res: Response, next: NextFunction) => Promise<void>
) => {
  return (req: Request, res: Response, next: NextFunction) => {
    Promise.resolve(fn(req, res, next)).catch(next);
  };
};

export class TokenRoutes {
  private router: Router;
  private tokenController: TokenController;

  constructor() {
    this.router = Router();
    this.tokenController = new TokenController();
    this.setupRoutes();
  }

  private setupRoutes(): void {
    // POST /token/mint - Minta novos tokens GOHO
    this.router.post(
      "/mint",
      asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
        const { to, amount } = req.body;

        if (!to || typeof to !== "string" || !ethers.isAddress(to)) {
          res.status(400).json({ error: "Invalid or missing 'to' address" });
          return;
        }
        if (!amount || typeof amount !== "number" || amount <= 0) {
          res.status(400).json({ error: "Invalid or missing 'amount', must be a positive number" });
          return;
        }

        const result = await this.tokenController.mintTokens(to, amount);
        res.status(200).json(result);
      })
    );

    // GET /token/metadata - Retorna metadados do token GOHO
    this.router.get(
      "/metadata",
      asyncHandler(async (req: Request, res: Response) => {
        const result = await this.tokenController.getMetadataAboutToken();
        res.status(200).json(result);
      })
    );

    // GET /token/total-minted - Retorna o total de tokens GOHO mintados
    this.router.get(
      "/total-minted",
      asyncHandler(async (req: Request, res: Response) => {
        const result = await this.tokenController.getTotalMinted();
        res.status(200).json(result);
      })
    );

    // GET /token/max-supply - Retorna o suprimento máximo de tokens GOHO
    this.router.get(
      "/max-supply",
      asyncHandler(async (req: Request, res: Response) => {
        const result = await this.tokenController.getMaxSupply();
        res.status(200).json(result);
      })
    );

    // GET /token/mint-fee - Retorna a taxa de mintagem atual (em ETH) por token
    this.router.get(
      "/mint-fee",
      asyncHandler(async (req: Request, res: Response) => {
        const result = await this.tokenController.getMintFee();
        res.status(200).json(result);
      })
    );
  }

  public getRouter(): Router {
    return this.router;
  }
}
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
    this.router.get(
      "/metadata",
      asyncHandler(async (req: Request, res: Response) => {
        const result = await this.tokenController.getMetadataAboutToken();
        res.status(200).json(result);
      })
    );

    this.router.get(
      "/total-minted",
      asyncHandler(async (req: Request, res: Response) => {
        const result = await this.tokenController.getTotalMinted();
        res.status(200).json(result);
      })
    );

    this.router.get(
      "/max-supply",
      asyncHandler(async (req: Request, res: Response) => {
        const result = await this.tokenController.getMaxSupply();
        res.status(200).json(result);
      })
    );

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

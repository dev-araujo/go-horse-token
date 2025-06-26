import { Router, Request, Response, NextFunction } from "express";
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
      "/:network/metadata",
      asyncHandler(async (req: Request, res: Response) => {
        const network = req.params.network as string | undefined;
        const result = await this.tokenController.getMetadataAboutToken(network);
        res.status(200).json(result);
      })
    );

    this.router.get(
      "/:network/total-minted",
      asyncHandler(async (req: Request, res: Response) => {
        const network = req.params.network as string | undefined;
        const result = await this.tokenController.getTotalMinted(network);
        res.status(200).json(result);
      })
    );

    this.router.get(
      "/:network/max-supply",
      asyncHandler(async (req: Request, res: Response) => {
        const network = req.params.network as string | undefined;
        const result = await this.tokenController.getMaxSupply(network);
        res.status(200).json(result);
      })
    );

    this.router.get(
      "/:network/mint-fee",
      asyncHandler(async (req: Request, res: Response) => {
        const network = req.params.network as string | undefined;
        const result = await this.tokenController.getMintFee(network);
        res.status(200).json(result);
      })
    );

    this.router.get(
      "/:network/address",
      asyncHandler(async (req: Request, res: Response) => {
        const network = req.params.network as string | undefined;
        const result = await this.tokenController.getContractAddress(network);
        res.status(200).json(result);
      })
    );
  }

  public getRouter(): Router {
    return this.router;
  }
}
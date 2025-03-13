import { Router } from "express";
import { TokenController } from "./token.controller";

export class TokenRoutes {
  private router: Router;
  private tokenController: TokenController;

  constructor() {
    this.router = Router();
    this.tokenController = new TokenController();
    this.setupRoutes();
  }

  private setupRoutes(): void {
    // POST /token/mint - Minta novos tokens
    this.router.post("/mint", (req, res) =>
      this.tokenController.mintTokens(req, res)
    );

    // GET /token/metadata - Retorna metadados do token
    this.router.get("/metadata", (req, res) =>
      this.tokenController.getMetadataAboutToken(req, res)
    );

    // GET /token/total-minted - Retorna total de tokens mintados
    this.router.get("/total-minted", (req, res) =>
      this.tokenController.getTotalMinted(req, res)
    );

    // GET /token/max-supply - Retorna o máximo de tokens possíveis de serem mintados pelo contrato
    this.router.get("/max-supply", (req, res) =>
      this.tokenController.getMaxSupply(req, res)
    );
  }

  public getRouter(): Router {
    return this.router;
  }
}

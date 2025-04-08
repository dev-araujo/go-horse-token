import { ITokenService } from "./token.interface";
import { TokenService } from "./token.service";

export class TokenController {
  private tokenService: ITokenService;

  constructor() {
    this.tokenService = new TokenService();
  }

  async getMetadataAboutToken(): Promise<any> {
    const metadataUrl = await this.tokenService.getMetadataAboutToken();
    return {
      url: metadataUrl,
      name: "Go Horse",
      symbol: "GOHO",
      description: "GOHO token, um token para devs ágeis",
      image:
        "https://github.com/dev-araujo/go-horse-faucet/blob/main/smart-contracts/metadata/gohorse-token-image.jpg?raw=true",
      decimals: 18,
    };
  }

  async getTotalMinted(): Promise<any> {
    const totalMinted = await this.tokenService.getTotalMinted();
    return { totalMinted };
  }

  async getMaxSupply(): Promise<any> {
    const maxSupply = await this.tokenService.getMaxSupply();
    return { maxSupply };
  }

  async getMintFee(): Promise<any> {
    const mintFee = await this.tokenService.getMintFee();
    return { mintFeePerToken: mintFee };
  }
}

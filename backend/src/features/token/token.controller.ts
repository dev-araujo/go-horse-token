import { ITokenService } from "./token.interface";
import { TokenService } from "./token.service";
import { Network, BlockchainConfig } from "../../config/blockchain.config";

export class TokenController {
  private tokenService: ITokenService;

  constructor() {
    this.tokenService = new TokenService();
  }

  private getNetwork(network?: string): Network {
    if (network === "mainnet" || network === "amoy") {
      return network;
    }
    return "mainnet"; // Default to mainnet
  }

  async getMetadataAboutToken(network?: string): Promise<any> {
    const selectedNetwork = this.getNetwork(network);
    const metadataUrl = await this.tokenService.getMetadataAboutToken(selectedNetwork);
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

  async getTotalMinted(network?: string): Promise<any> {
    const selectedNetwork = this.getNetwork(network);
    const totalMinted = await this.tokenService.getTotalMinted(selectedNetwork);
    return { totalMinted };
  }

  async getMaxSupply(network?: string): Promise<any> {
    const selectedNetwork = this.getNetwork(network);
    const maxSupply = await this.tokenService.getMaxSupply(selectedNetwork);
    return { maxSupply };
  }

  async getMintFee(network?: string): Promise<any> {
    const selectedNetwork = this.getNetwork(network);
    const mintFee = await this.tokenService.getMintFee(selectedNetwork);
    return { mintFeePerToken: mintFee };
  }

  async getContractAddress(network?: string): Promise<any> {
    const selectedNetwork = this.getNetwork(network);
    const address = BlockchainConfig.getTokenAddress(selectedNetwork);
    return { address };
  }
}
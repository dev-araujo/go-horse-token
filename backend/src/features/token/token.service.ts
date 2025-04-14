import { BlockchainConfig } from "../../config/blockchain.config";
import { ITokenService } from "./token.interface";
import { ethers } from "ethers";
import goHorseAbi from "../../contracts/mainnet/GoHorse.json";

export class TokenService implements ITokenService {
  private readonly contractReader: ethers.Contract;
  private readonly tokenAddress: string;
  private readonly provider: ethers.Provider;

  constructor() {
    this.tokenAddress = BlockchainConfig.getTokenAddress();
    this.provider = BlockchainConfig.getProvider();
    this.contractReader = new ethers.Contract(
      this.tokenAddress,
      goHorseAbi.abi,
      this.provider
    );
  }

  async getMetadataAboutToken(): Promise<string> {
    try {
      return await this.contractReader.getMetadataUrl();
    } catch (error: unknown) {
      const errorMessage =
        error instanceof Error ? error.message : "Unknown error";
      throw new Error(`Failed to fetch metadata: ${errorMessage}`);
    }
  }

  async getTotalMinted(): Promise<number> {
    try {
      const totalMinted = await this.contractReader.getTotalMinted();
      return Number(ethers.formatUnits(totalMinted, 18));
    } catch (error: unknown) {
      const errorMessage =
        error instanceof Error ? error.message : "Unknown error";
      throw new Error(`Failed to fetch total minted: ${errorMessage}`);
    }
  }

  async getMaxSupply(): Promise<number> {
    try {
      const maxSupply = await this.contractReader.getMaxSupply();
      return Number(ethers.formatUnits(maxSupply, 18));
    } catch (error: unknown) {
      const errorMessage =
        error instanceof Error ? error.message : "Unknown error";
      throw new Error(`Failed to fetch max supply: ${errorMessage}`);
    }
  }

  async getMintFee(): Promise<number> {
    try {
      const mintFee = await this.contractReader.mintFee();
      return Number(ethers.formatEther(mintFee));
    } catch (error: unknown) {
      const errorMessage =
        error instanceof Error ? error.message : "Unknown error";
      throw new Error(`Failed to fetch mint fee: ${errorMessage}`);
    }
  }

  private async getBalance(address: string): Promise<number> {
    try {
      const balance = await this.contractReader.balanceOf(address);
      return Number(ethers.formatUnits(balance, 18));
    } catch (error: unknown) {
      const errorMessage =
        error instanceof Error ? error.message : "Unknown error";
      throw new Error(`Failed to fetch balance: ${errorMessage}`);
    }
  }
}

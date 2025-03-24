import { BlockchainConfig } from "../../config/blockchain.config";
import { ITokenService, MintTokenReturn } from "./token.interface";
import { ethers } from "ethers";
import goHorseAbi from "../../contracts/amoy/GoHorse.json";
import { ERROR_MAPPINGS } from "./utils/token-errors";

export class TokenService implements ITokenService {
  private readonly contract: ethers.Contract;

  constructor() {
    const tokenAddress = BlockchainConfig.getTokenAddress();
    const signer = BlockchainConfig.getSigner();
    this.contract = new ethers.Contract(tokenAddress, goHorseAbi.abi, signer);
  }

  async mintTokens(to: string, amount: number): Promise<MintTokenReturn> {
    try {
      const mintFee = await this.contract.mintFee();
      const totalFee = BigInt(mintFee) * BigInt(amount);

      const amountInWei = ethers.parseUnits(amount.toString(), 18);
      const tx = await this.contract.mint(to, amountInWei, {
        value: totalFee.toString(),
      });
      await tx.wait();

      const balance = await this.getBalance(to);

      return {
        hash: tx.hash,
        amountMinted: amount.toString(),
        balanceInGohoAfterMint: balance.toString(),
        mintFee: ethers.formatEther(mintFee),
        totalFeeWei: totalFee.toString(),
        totalFeeEth: ethers.formatEther(totalFee),
      };
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : "Unknown error";
      const errorReason = error instanceof Error ? (error as any).reason : undefined;

      const errorKey = Object.keys(ERROR_MAPPINGS).find(key => 
        errorReason?.includes(key)
      );
      
      if (errorKey) {
        throw new Error(ERROR_MAPPINGS[errorKey]);
      }
      throw new Error(`Failed to mint tokens: ${errorMessage}`);
    }
  }

  async getMetadataAboutToken(): Promise<string> {
    try {
      return await this.contract.getMetadataUrl();
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : "Unknown error";
      throw new Error(`Failed to fetch metadata: ${errorMessage}`);
    }
  }

  async getTotalMinted(): Promise<number> {
    try {
      const totalMinted = await this.contract.getTotalMinted();
      return Number(ethers.formatUnits(totalMinted, 18));
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : "Unknown error";
      throw new Error(`Failed to fetch total minted: ${errorMessage}`);
    }
  }

  async getMaxSupply(): Promise<number> {
    try {
      const maxSupply = await this.contract.getMaxSupply();
      return Number(ethers.formatUnits(maxSupply, 18));
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : "Unknown error";
      throw new Error(`Failed to fetch max supply: ${errorMessage}`);
    }
  }

  async getMintFee(): Promise<number> {
    try {
      const mintFee = await this.contract.mintFee();
      return Number(ethers.formatEther(mintFee));
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : "Unknown error";
      throw new Error(`Failed to fetch mint fee: ${errorMessage}`);
    }
  }

  private async getBalance(address: string): Promise<number> {
    try {
      const balance = await this.contract.balanceOf(address);
      return Number(ethers.formatUnits(balance, 18));
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : "Unknown error";
      throw new Error(`Failed to fetch balance: ${errorMessage}`);
    }
  }
}
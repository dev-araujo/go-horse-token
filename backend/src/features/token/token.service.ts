import { BlockchainConfig } from "../../config/blockchain.config";
import { ITokenService } from "./token.interface";
import { ethers } from "ethers";
import goHorseAbi from "../../contracts/amoy/GoHorse.json";

export class TokenService implements ITokenService {
  private contract: ethers.Contract;

  constructor() {
    const tokenAddress = BlockchainConfig.getTokenAddress();
    const signer = BlockchainConfig.getSigner();
    this.contract = new ethers.Contract(tokenAddress, goHorseAbi.abi, signer);
  }

  async mintTokens(to: string, amount: number): Promise<any> {
    const mintFee = await this.contract.mintFee();
    const totalFee = BigInt(mintFee) * BigInt(amount);

    const tx = await this.contract.mint(
      to,
      ethers.parseUnits(amount.toString(), 18),
      { value: totalFee.toString() }
    );
    await tx.wait();

    const balance = await this.getBalance(to);

    return {
      hash: tx.hash,
      amountMinted: amount.toString(),
      balanceInGohoAfterMint: balance.toString(),
      mintFee: mintFee.toString(),
      totalFeeWei: totalFee.toString(),
    };
  }

  async getMetadataAboutToken(): Promise<string> {
    return await this.contract.getMetadataUrl();
  }

  async getTotalMinted(): Promise<number> {
    const totalMinted = await this.contract.getTotalMinted();
    return Number(ethers.formatUnits(totalMinted, 18));
  }

  async getMaxSupply(): Promise<number> {
    const maxSupply = await this.contract.getMaxSupply();
    return Number(ethers.formatUnits(maxSupply, 18));
  }

  async getMintFee(): Promise<number> {
    const mintFee = await this.contract.mintFee();
    return Number(ethers.formatUnits(mintFee, 18));
  }

  private async getBalance(address: string): Promise<number> {
    const balance = await this.contract.balanceOf(address);
    return Number(ethers.formatUnits(balance, 18));
  }
}

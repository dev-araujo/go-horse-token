import { BlockchainConfig } from "../../config/blockchain.config";
import TokenABI from "../../contracts/GoHorse.json";
import { TokenService } from "./token.interface";
import { ethers } from "ethers";

export class TokenServiceImpl implements TokenService {
  private contract: ethers.Contract;

  constructor() {
    const signer = BlockchainConfig.getSigner();
    this.contract = new ethers.Contract(
      BlockchainConfig.getTokenAddress(),
      TokenABI.abi,
      signer
    );
  }

  async getBalance(address: string): Promise<string> {
    const balance = await this.contract.balanceOf(address);
    return ethers.formatEther(balance);
  }

  async mint(to: string, amount: string): Promise<void> {
    const tx = await this.contract.mint(to, ethers.parseEther(amount));
    await tx.wait();
  }

  async owner(): Promise<string> {
    return await this.contract.getMetadataUrl();
  }
}

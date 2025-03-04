import { BlockchainConfig } from "../../config/blockchain.config";
import FaucetABI from "../../contracts/GoHorseFaucet.json";
import { FaucetService } from "./faucet.interface";
import { ethers } from "ethers";

export class FaucetServiceImpl implements FaucetService {
  private contract: ethers.Contract;

  constructor() {
    const signer = BlockchainConfig.getSigner();
    this.contract = new ethers.Contract(
      BlockchainConfig.getFaucetAddress(),
      FaucetABI.abi,
      signer
    );
  }

  async claimFreeToken(address: string): Promise<void> {
    const tx = await this.contract.claimFreeToken({ from: address });
    await tx.wait();
  }

  async mintTokens(address: string, amount: string): Promise<void> {
    const fee = await this.getMintingFee(amount);
    const tx = await this.contract.mintTokens(ethers.parseEther(amount), {
      value: ethers.parseEther(fee),
      from: address,
    });
    await tx.wait();
  }

  async getMintingFee(amount: string): Promise<string> {
    const fee = await this.contract.getMintingFee(ethers.parseEther(amount));
    return ethers.formatEther(fee);
  }
}
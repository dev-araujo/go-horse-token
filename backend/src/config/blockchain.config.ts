import * as dotenv from "dotenv";

import { ethers } from "ethers";

dotenv.config();

export class BlockchainConfig {
  private static provider = new ethers.JsonRpcProvider(process.env.RPC_URL);
  private static wallet = new ethers.Wallet(
    process.env.PRIVATE_KEY!,
    this.provider
  );

  public static getSigner(): ethers.Wallet {
    return this.wallet;
  }

  public static getTokenAddress(): string {
    return process.env.TOKEN_ADDRESS!;
  }
}

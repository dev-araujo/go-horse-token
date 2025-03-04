import * as dotenv from "dotenv";

import { ethers } from "ethers";

dotenv.config();

export class BlockchainConfig {
  private static provider = new ethers.JsonRpcProvider(process.env.RPC_URL);
  private static wallet = new ethers.Wallet(
    process.env.PRIVATE_KEY!,
    this.provider
  );

  public static getProvider(): ethers.Provider {
    return this.provider;
  }

  public static getSigner(): ethers.Wallet {
    return this.wallet;
  }

  public static getTokenAddress(): string {
    return process.env.TOKEN_ADDRESS!;
  }

  public static getFaucetAddress(): string {
    return process.env.FAUCET_ADDRESS!;
  }
}

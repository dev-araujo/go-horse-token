import * as dotenv from "dotenv";
import { ethers } from "ethers";

dotenv.config();

export type Network = "mainnet" | "amoy";

export class BlockchainConfig {
  public static getProvider(network: Network): ethers.Provider {
    const rpcUrl = process.env[`${network.toUpperCase()}_RPC_URL`];
    if (!rpcUrl) {
      throw new Error(`RPC_URL for ${network} not found in .env`);
    }
    return new ethers.JsonRpcProvider(rpcUrl);
  }

  public static getSigner(network: Network): ethers.Wallet {
    const privateKey = process.env[`${network.toUpperCase()}_PRIVATE_KEY`];
    if (!privateKey) {
      throw new Error(`PRIVATE_KEY for ${network} not found in .env`);
    }
    return new ethers.Wallet(privateKey, this.getProvider(network));
  }

  public static getTokenAddress(network: Network): string {
    const tokenAddress = process.env[`${network.toUpperCase()}_TOKEN_ADDRESS`];
    if (!tokenAddress) {
      throw new Error(`TOKEN_ADDRESS for ${network} not found in .env`);
    }
    return tokenAddress;
  }
}

import { BlockchainConfig, Network } from "../../config/blockchain.config";
import { ITokenService } from "./token.interface";
import { ethers } from "ethers";
import mainnetAbi from "../../contracts/mainnet/GoHorse.json";
import amoyAbi from "../../contracts/amoy/GoHorse.json";

interface CacheEntry<T> {
  value: T;
  timestamp: number;
}

export class TokenService implements ITokenService {
  private cache: { [key: string]: CacheEntry<any> } = {};
  private cacheDuration = 5 * 60 * 1000; // 5 minutos em milissegundos

  private getContract(network: Network): ethers.Contract {
    const tokenAddress = BlockchainConfig.getTokenAddress(network);
    const provider = BlockchainConfig.getProvider(network);
    const abi = network === "mainnet" ? mainnetAbi.abi : amoyAbi.abi;
    return new ethers.Contract(tokenAddress, abi, provider);
  }

  private getCachedData<T>(key: string): T | null {
    const entry = this.cache[key];
    if (entry && Date.now() - entry.timestamp < this.cacheDuration) {
      return entry.value;
    }
    return null;
  }

  private setCachedData<T>(key: string, value: T): void {
    this.cache[key] = { value, timestamp: Date.now() };
  }

  async getMetadataAboutToken(network: Network): Promise<string> {
    const cacheKey = `metadata-${network}`;
    const cached = this.getCachedData<string>(cacheKey);
    if (cached) {
      return cached;
    }

    try {
      const contract = this.getContract(network);
      const metadata = await contract.getMetadataUrl();
      this.setCachedData(cacheKey, metadata);
      return metadata;
    } catch (error: unknown) {
      const errorMessage =
        error instanceof Error ? error.message : "Unknown error";
      throw new Error(`Failed to fetch metadata: ${errorMessage}`);
    }
  }

  async getTotalMinted(network: Network): Promise<number> {
    const cacheKey = `totalMinted-${network}`;
    const cached = this.getCachedData<number>(cacheKey);
    if (cached) {
      return cached;
    }

    try {
      const contract = this.getContract(network);
      const totalMinted = await contract.getTotalMinted();
      const result = Number(ethers.formatUnits(totalMinted, 18));
      this.setCachedData(cacheKey, result);
      return result;
    } catch (error: unknown) {
      const errorMessage =
        error instanceof Error ? error.message : "Unknown error";
      throw new Error(`Failed to fetch total minted: ${errorMessage}`);
    }
  }

  async getMaxSupply(network: Network): Promise<number> {
    const cacheKey = `maxSupply-${network}`;
    const cached = this.getCachedData<number>(cacheKey);
    if (cached) {
      return cached;
    }

    try {
      const contract = this.getContract(network);
      const maxSupply = await contract.getMaxSupply();
      const result = Number(ethers.formatUnits(maxSupply, 18));
      this.setCachedData(cacheKey, result);
      return result;
    } catch (error: unknown) {
      const errorMessage =
        error instanceof Error ? error.message : "Unknown error";
      throw new Error(`Failed to fetch max supply: ${errorMessage}`);
    }
  }

  async getMintFee(network: Network): Promise<string> {
    const cacheKey = `mintFee-${network}`;
    const cached = this.getCachedData<string>(cacheKey);
    if (cached) {
      return cached;
    }

    try {
      const contract = this.getContract(network);
      const mintFee = await contract.mintFee();
      const result = ethers.formatEther(mintFee);
      this.setCachedData(cacheKey, result);
      return result;
    } catch (error: unknown) {
      const errorMessage =
        error instanceof Error ? error.message : "Unknown error";
      throw new Error(`Failed to fetch mint fee: ${errorMessage}`);
    }
  }
}

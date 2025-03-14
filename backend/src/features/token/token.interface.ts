export interface ITokenService {
  mintTokens(to: string, amount: number): Promise<void>;
  getMetadataAboutToken(): Promise<string>;
  getTotalMinted(): Promise<number>;
  getMaxSupply(): Promise<number>;
  getMintFee(): Promise<number>;
}

export interface MintTokenReturn {
  hash: string;
  amountMinted: number;
  balanceInGohoAfterMint: number;
  mintFee: string;
  totalFeeWei: string;
}

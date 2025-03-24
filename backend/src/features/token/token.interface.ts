export interface ITokenService {
  mintTokens(to: string, amount: number): Promise<MintTokenReturn>;
  getMetadataAboutToken(): Promise<string>;
  getTotalMinted(): Promise<number>;
  getMaxSupply(): Promise<number>;
  getMintFee(): Promise<number>;
}

export interface MintTokenReturn {
  hash: string;
  amountMinted: string;
  balanceInGohoAfterMint: string;
  mintFee: string;
  totalFeeWei: string;
  totalFeeEth: string;
}
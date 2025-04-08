export interface ITokenService {
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
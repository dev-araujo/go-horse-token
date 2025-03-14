export interface ITokenService {
  mintTokens(to: string, amount: number): Promise<void>;
  getMetadataAboutToken(): Promise<string>;
  getTotalMinted(): Promise<number>;
  getMaxSupply(): Promise<number>;
  getMintFee(): Promise<number>;
}

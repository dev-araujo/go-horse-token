export interface TokenMetadata {
  name?: string;
  symbol?: string;
}
export interface TokenInfo {
  metadata?: TokenMetadata;
  totalMinted?: number;
  maxSupply?: number;
  mintFee?: number;
}
export interface TotalMintedResponse {
  totalMinted: number;
}
export interface MaxSupplyResponse {
  maxSupply: number;
}
export interface MintFeeResponse {
  fee: number;
}

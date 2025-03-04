export interface FaucetService {
  claimFreeToken(address: string): Promise<void>;
  mintTokens(address: string, amount: string): Promise<void>;
  getMintingFee(amount: string): Promise<string>;
}
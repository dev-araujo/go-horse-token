export interface TokenService {
  getBalance(address: string): Promise<string>;
  mint(to: string, amount: string): Promise<void>;
}
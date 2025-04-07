export interface MintData {
  to: string;
  amount: number | null;
}

export interface RawMintApiResponse {
  message: string;
  data: {
    transactionHash: string;
    amountMinted: string;
    balanceAfterMint: string;
    mintFeePerToken: string;
    totalFeeWei: string;
    totalFeeEth: string;
  };
}

export interface MintSuccessData {
  message: string;
  transactionHash: string;
  amountMinted: number;
  balanceAfterMint?: number;
  totalFee?: number;
}

export interface ApiErrorResponse {
  error: string;
}
export interface MintFeeResponse {
  mintFeePerToken: number;
}

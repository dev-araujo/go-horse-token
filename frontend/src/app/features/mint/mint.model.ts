import { TransactionReceipt, TransactionResponse } from "ethers";

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

export interface MintTransactionParams {
  amountInWei: bigint;
  totalFeeWei: bigint;
}

export interface MintExecutionResult {
  success: true;
  tx: TransactionResponse;
}

export interface MintExecutionError {
  success: false;
  error: Error;
  reason: any;
}

export interface ReceiptResult {
  success: boolean;
  receipt: TransactionReceipt | null;
  hash: string;
}

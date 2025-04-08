import { Injectable, inject } from '@angular/core';
import {
  ethers,
  Contract,
  Signer,
  TransactionResponse,
  TransactionReceipt,
} from 'ethers';
import GoHorse from '../../../../contracts/amoy/GoHorse.json';
import { WalletService } from '../../core/services/wallet.service';
import {
  MintExecutionError,
  MintExecutionResult,
  MintTransactionParams,
  ReceiptResult,
} from './mint.model';

const CONTRACT_ADDRESS = '0xdbda06e01713ed143cea28b68b7c194372860ced';
const CONTRACT_ABI = GoHorse.abi;

@Injectable({
  providedIn: 'root',
})
export class MintContractService {
  private walletService = inject(WalletService);

  getContract(signer: Signer): Contract {
    return new ethers.Contract(CONTRACT_ADDRESS, CONTRACT_ABI, signer);
  }

  getSigner(): Signer | null {
    return this.walletService.signer();
  }

  calculateMintTxParams(
    amount: number,
    mintFeePerTokenEth: number
  ): MintTransactionParams {
    const amountInWei = ethers.parseUnits(amount.toString(), 18);
    const feePerTokenWei = ethers.parseEther(mintFeePerTokenEth.toString());
    const totalFeeWei = feePerTokenWei * BigInt(amount);
    return { amountInWei, totalFeeWei };
  }

  async executeMint(
    to: string,
    amountInWei: bigint,
    totalFeeWei: bigint
  ): Promise<MintExecutionResult | MintExecutionError> {
    const signer = this.getSigner();
    if (!signer) {
      return this.createErrorResult(
        'Carteira não conectada ou signer indisponível.'
      );
    }

    try {
      const contract = this.getContract(signer);
      const tx: TransactionResponse = await contract['mint'](to, amountInWei, {
        value: totalFeeWei,
      });
      return { success: true, tx };
    } catch (error: any) {
      console.error('Erro ao executar mint:', error);
      const userFriendlyReason = this.parseContractError(error);
      return this.createErrorResult(userFriendlyReason, error);
    }
  }

  async waitForTransaction(tx: TransactionResponse): Promise<ReceiptResult> {
    try {
      const receipt = await tx.wait();
      return {
        success: !!receipt && receipt.status === 1,
        receipt,
        hash: tx.hash,
      };
    } catch (error: any) {
      console.error('Erro ao esperar pela transação:', error);
      return {
        success: false,
        receipt: null,
        hash: tx.hash,
      };
    }
  }

  parseContractError(error: any): string {
    if (error.code === 4001) {
      return 'Transação rejeitada pelo usuário.';
    }
    if (error.code === 'INSUFFICIENT_FUNDS') {
      return 'Saldo insuficiente para cobrir o gás e a taxa.';
    }
    return (
      error.reason ||
      error?.data?.message ||
      error.message ||
      'Ocorreu um erro desconhecido na transação.'
    );
  }

  private createErrorResult(
    reason: string,
    originalError?: Error
  ): MintExecutionError {
    return {
      success: false,
      error: originalError || new Error(reason),
      reason: reason,
    };
  }
}

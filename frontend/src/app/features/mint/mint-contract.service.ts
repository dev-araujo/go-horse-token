import { Injectable, inject } from '@angular/core';
import { ethers, Contract, Signer, TransactionResponse } from 'ethers';
import { WalletService } from '../../core/services/wallet.service';
import {
  MintExecutionError,
  MintExecutionResult,
  MintTransactionParams,
  ReceiptResult,
} from './mint.model';
import { NetworkService } from '../../core/services/network.service';
import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MintContractService {
  private walletService = inject(WalletService);
  private networkService = inject(NetworkService);

  async getContract(signer: Signer): Promise<Contract> {
    const contractAddress = await firstValueFrom(this.networkService.getContractAddress());
    if (!contractAddress) {
      throw new Error('Contract address not available.');
    }
    const contractAbi = this.networkService.getContractAbi();
    return new ethers.Contract(contractAddress, contractAbi, signer);
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
      const contract = await this.getContract(signer);
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

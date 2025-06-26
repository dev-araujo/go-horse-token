import {
  ChangeDetectionStrategy,
  Component,
  effect,
  inject,
  OnInit,
  signal,
  ChangeDetectorRef,
} from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { TokenService } from '../../core/services/token.service';
import {
  MintData,
  MintExecutionResult,
  MintSuccessData,
  MintTransactionParams,
  ReceiptResult,
} from './mint.model';
import { WalletService } from '../../core/services/wallet.service';

import { DecimalPipe } from '@angular/common';
import { ethers } from 'ethers';
import { MintContractService } from './mint-contract.service';
import { NetworkService } from '../../core/services/network.service';

@Component({
  selector: 'app-mint',
  imports: [FormsModule, DecimalPipe],
  templateUrl: './mint.component.html',
  styleUrl: './mint.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MintComponent implements OnInit {
  private tokenService = inject(TokenService);
  walletService = inject(WalletService);
  private mintContractService = inject(MintContractService);
  public networkService = inject(NetworkService);
  private cdr = inject(ChangeDetectorRef);

  mintData: MintData = { to: '', amount: null };
  mintResult = signal<MintSuccessData | null>(null);
  mintError = signal<string | null>(null);
  isLoading = signal(false);
  mintFee = signal<number | null>(null);
  lastTransactionHash = signal<string | null>(null);
  mintNgForm: NgForm | null = null;

  constructor() {
    effect(() => {
      const account = this.walletService.connectedAccount();
      this.updateRecipientAddress(account);
      this.cdr.markForCheck();
    });

    effect(() => {
      this.networkService.activeNetwork();
      this.fetchMintFee();
    });
  }

  ngOnInit(): void {
    this.fetchMintFee();
  }

  fetchMintFee(): void {
    this.tokenService.getMintFee().subscribe((fee) => {
      this.mintFee.set(fee);
      this.cdr.markForCheck();
    });
  }

  async onMintSubmit(form?: NgForm): Promise<void> {
    this.mintNgForm = form || null;
    this.resetStateBeforeMint();

    const validationError = this.validateInputs();
    if (validationError) {
      this.mintError.set(validationError);
      return;
    }

    this.isLoading.set(true);
    this.cdr.markForCheck();

    const params = this.mintContractService.calculateMintTxParams(
      this.mintData.amount!,
      this.mintFee()!
    );

    const executionResult = await this.mintContractService.executeMint(
      this.mintData.to,
      params.amountInWei,
      params.totalFeeWei
    );

    this.handleExecutionResult(executionResult, params);
  }

  private resetStateBeforeMint(): void {
    this.mintError.set(null);
    this.mintResult.set(null);
    this.lastTransactionHash.set(null);
  }

  private validateInputs(): string | null {
    if (!this.walletService.isConnected() || !this.walletService.signer()) {
      return 'Por favor, conecte sua carteira primeiro.';
    }
    if (this.mintFee() === null) {
      return 'Aguarde o carregamento da taxa de mintagem.';
    }
    if (
      !this.mintData.to ||
      !this.mintData.amount ||
      !ethers.isAddress(this.mintData.to)
    ) {
      return 'Endereço inválido ou quantidade inválida/não preenchida.';
    }
    return null;
  }

  private async handleExecutionResult(
    result:
      | MintExecutionResult
      | ReturnType<MintContractService['createErrorResult']>,
    params: MintTransactionParams
  ): Promise<void> {
    if (!result.success) {
      this.mintError.set(result.reason);
      this.finalizeMinting();
      return;
    }

    this.lastTransactionHash.set(result.tx.hash);
    this.mintResult.set(this.createPendingResult(result.tx.hash, params));
    this.cdr.markForCheck();

    const receiptResult = await this.mintContractService.waitForTransaction(
      result.tx
    );
    this.handleReceiptResult(receiptResult, params);
  }

  private handleReceiptResult(
    result: ReceiptResult,
    params: MintTransactionParams
  ): void {
    if (result.success) {
      this.mintResult.set(this.createSuccessResult(result.hash, params));
      this.resetFormPostSuccess();
    } else {
      this.mintError.set(
        `A transação falhou (hash: ${result.hash}). Status: ${
          result.receipt?.status ?? 'desconhecido'
        }`
      );
      this.mintResult.set(null);
    }
    this.finalizeMinting();
  }

  private createPendingResult(
    hash: string,
    params: MintTransactionParams
  ): MintSuccessData {
    return {
      message: 'Transação enviada... aguardando confirmação.',
      transactionHash: hash,
      amountMinted: Number(ethers.formatUnits(params.amountInWei, 18)),
      totalFee: Number(ethers.formatEther(params.totalFeeWei)),
    };
  }

  private createSuccessResult(
    hash: string,
    params: MintTransactionParams
  ): MintSuccessData {
    const amount = Number(ethers.formatUnits(params.amountInWei, 18));
    return {
      message: `Mintagem de ${amount} GOHO concluída!`,
      transactionHash: hash,
      amountMinted: amount,
      totalFee: Number(ethers.formatEther(params.totalFeeWei)),
    };
  }

  private finalizeMinting(): void {
    this.isLoading.set(false);
    this.cdr.markForCheck();
  }

  private updateRecipientAddress(account: string | null): void {
    const shouldUpdate =
      account && (!this.mintData.to || this.mintData.to !== account);
    const shouldClear = !account && this.mintData.to;

    if (shouldUpdate) {
      this.mintData.to = account;
    }
    if (shouldClear) {
      this.mintData = { to: '', amount: null };
      this.resetFormVisualState();
    }
  }

  private resetFormPostSuccess(): void {
    this.mintData = {
      to: this.walletService.connectedAccount() || '',
      amount: null,
    };
    this.resetFormVisualState();
  }

  private resetFormVisualState(): void {
    if (this.mintNgForm) {
      this.mintNgForm.resetForm({
        toAddress: this.mintData.to,
        amount: this.mintData.amount,
      });
    }
  }
}

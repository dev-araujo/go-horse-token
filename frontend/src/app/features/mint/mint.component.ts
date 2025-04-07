import {
  ChangeDetectionStrategy,
  Component,
  effect,
  inject,
  OnInit,
  signal,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { catchError, finalize, of, tap } from 'rxjs';
import { TokenService } from '../../core/services/token.service';
import { ApiErrorResponse, MintData, MintSuccessData } from './mint.model';
import { WalletService } from '../../core/services/wallet.service';
import { DecimalPipe } from '@angular/common';

@Component({
  selector: 'app-mint',
  imports: [FormsModule, DecimalPipe],
  templateUrl: './mint.component.html',
  styleUrl: './mint.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MintComponent implements OnInit {
  private tokenService = inject(TokenService);
  private walletService = inject(WalletService);

  mintData: MintData = { to: '', amount: null };
  mintResult = signal<MintSuccessData | null>(null);
  mintError = signal<string | null>(null);
  isLoading = signal(false);
  mintFee = signal<number | null>(null);

  constructor() {
    effect(() => {
      const account = this.walletService.connectedAccount();
      if (account && !this.mintData.to) {
        this.mintData.to = account;
      }
    });
  }

  ngOnInit(): void {
    this.fetchMintFee();
  }

  fetchMintFee(): void {
    this.tokenService.getMintFee().subscribe((fee) => {
      this.mintFee.set(fee);
    });
  }

  onMintSubmit(): void {
    if (
      !this.mintData.to ||
      !this.mintData.amount ||
      this.mintData.amount <= 0
    ) {
      this.mintError.set(
        'Por favor, preencha o endereço e a quantidade corretamente.'
      );
      return;
    }

    this.isLoading.set(true);
    this.mintError.set(null);
    this.mintResult.set(null);

    const body: MintData = {
      to: this.mintData.to,
      amount: Number(this.mintData.amount),
    };

    this.tokenService
      .mintTokens(body)
      .pipe(
        tap((resultData) => {
          console.log('Dados recebidos após mint:', resultData);
          this.mintResult.set(resultData);
          this.mintData = {
            to: this.walletService.connectedAccount() || '',
            amount: null,
          };
        }),
        catchError((error) => {
          console.error('Erro ao mintar:', error);
          const apiError = error.error as ApiErrorResponse;
          const errorMessage =
            apiError?.error || error.message || 'Ocorreu um erro desconhecido.';
          this.mintError.set(errorMessage);
          return of(null);
        }),
        finalize(() => this.isLoading.set(false))
      )
      .subscribe();
  }
}

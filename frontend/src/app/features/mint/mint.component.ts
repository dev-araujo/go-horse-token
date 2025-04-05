import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit,
  signal,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { catchError, finalize, map, of, tap } from 'rxjs';
import { environment } from '../../../environments/environments';

interface MintData {
  to: string;
  amount: number | null;
}
interface MintSuccessResponse {
  transactionHash: string;
  to: string;
  amount: number;
}
interface ApiErrorResponse {
  error: string;
}
interface MintFeeResponse {
  fee: number;
}

@Component({
  selector: 'app-mint',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `<div class="mint-container container">
    <header class="mint-header">
      <h1>Minter Tokens GOHO</h1>
      <p>Interaja com o Smart Contract GoHorse para mintar novos tokens.</p>
    </header>

    <section class="mint-form card">
      <h2>Mintar Novos Tokens</h2>
      <form (ngSubmit)="onMintSubmit()" #mintForm="ngForm">
        <div class="form-group">
          <label for="toAddress">Endereço Destino (Wallet):</label>
          <input
            type="text"
            id="toAddress"
            name="toAddress"
            required
            pattern="^0x[a-fA-F0-9]{40}$"
            [(ngModel)]="mintData.to"
            #toAddress="ngModel"
            [class.invalid]="
              toAddress.invalid && (toAddress.dirty || toAddress.touched)
            "
            placeholder="0x..."
            [disabled]="isLoading()"
          />
          @if (toAddress.invalid && (toAddress.dirty || toAddress.touched)) {
          <div class="error-message">
            @if (toAddress.errors?.['required']) {
            <span>Endereço é obrigatório.</span> } @if
            (toAddress.errors?.['pattern']) {
            <span>Formato de endereço inválido (deve ser 0x...).</span> }
          </div>
          }
        </div>

        <div class="form-group">
          <label for="amount">Quantidade:</label>
          <input
            type="number"
            id="amount"
            name="amount"
            required
            min="1"
            [(ngModel)]="mintData.amount"
            #amount="ngModel"
            [class.invalid]="amount.invalid && (amount.dirty || amount.touched)"
            placeholder="Quantidade de GOHO"
            [disabled]="isLoading()"
          />
          @if (amount.invalid && (amount.dirty || amount.touched)) {
          <div class="error-message">
            @if (amount.errors?.['required']) {
            <span>Quantidade é obrigatória.</span> } @if
            (amount.errors?.['min']) {
            <span>Quantidade deve ser maior que zero.</span> }
          </div>
          }
        </div>

        @if (mintFee() !== null) {
        <div class="mint-fee-info">
          Taxa estimada por token: {{ mintFee() }} ETH
        </div>
        } @else {
        <div class="mint-fee-info"></div>
        }

        <button type="submit" [disabled]="mintForm.invalid || isLoading()">
          @if(isLoading()){
          <span>Mintando... <span class="spinner"></span></span>
          } @else {
          <span>Mintar GOHO</span>
          }
        </button>

        @if (mintResult(); as result) {
        <div class="result-message success">
          <p>Mintagem bem-sucedida!</p>
          <p>
            Transação:
            <a
              href="SEU_EXPLORER_URL/tx/{{ result.transactionHash }}"
              target="_blank"
              rel="noopener noreferrer"
              >{{ result.transactionHash }}</a
            >
          </p>
        </div>
        } @if (mintError(); as errorMsg) {
        <div class="result-message error">Erro na mintagem: {{ errorMsg }}</div>
        }
      </form>
    </section>
  </div>`,
  styleUrl: './mint.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MintComponent implements OnInit {
  private http = inject(HttpClient);
  private apiUrl = environment.apiUrl || '/api/token';

  mintData: MintData = { to: '', amount: null };
  mintResult = signal<MintSuccessResponse | null>(null);
  mintError = signal<string | null>(null);
  isLoading = signal(false);

  mintFee = signal<number | null>(null);

  ngOnInit(): void {
    this.fetchMintFee();
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

    const body = { to: this.mintData.to, amount: Number(this.mintData.amount) };

    this.http
      .post<MintSuccessResponse>(`${this.apiUrl}/mint`, body)
      .pipe(
        tap((result) => {
          this.mintResult.set(result);
          this.mintData = { to: '', amount: null }; // Limpa o formulário
        }),
        catchError((error) => {
          console.error('Erro ao mintar:', error);
          const errorMessage =
            (error.error as ApiErrorResponse)?.error ||
            error.message ||
            'Ocorreu um erro desconhecido.';
          this.mintError.set(errorMessage);
          return of(null);
        }),
        finalize(() => this.isLoading.set(false))
      )
      .subscribe();
  }

  fetchMintFee(): void {
    this.http
      .get<MintFeeResponse>(`${this.apiUrl}/mint-fee`)
      .pipe(
        map((res) => res.fee),
        catchError((error) => {
          console.error('Erro ao buscar taxa de mintagem:', error);
          this.mintFee.set(null);
          return of(null);
        })
      )
      .subscribe((fee) => this.mintFee.set(fee));
  }
}

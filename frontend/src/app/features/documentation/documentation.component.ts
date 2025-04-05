import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit,
  signal,
} from '@angular/core';
import { JsonPipe, DecimalPipe } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { catchError, finalize, forkJoin, map, of } from 'rxjs';
import { environment } from '../../../environments/environments';

interface TokenMetadata {
  name?: string;
  symbol?: string;
}
interface TokenInfo {
  metadata?: TokenMetadata;
  totalMinted?: number;
  maxSupply?: number;
  mintFee?: number;
}
interface TotalMintedResponse {
  totalMinted: number;
}
interface MaxSupplyResponse {
  maxSupply: number;
}
interface MintFeeResponse {
  fee: number;
}

@Component({
  selector: 'app-documentation',
  standalone: true,
  imports: [JsonPipe, DecimalPipe],
  template: `<div class="docs-container container">
    <section class="token-info card">
      <h2>Informações Atuais do Token</h2>
      <button (click)="fetchTokenData()" [disabled]="isLoadingInfo()">
        @if(isLoadingInfo()) {
        <span>Carregando... <span class="spinner"></span></span>
        } @else {
        <span>Atualizar Informações</span>
        }
      </button>

      @if (tokenData(); as data) {
      <div class="info-grid">
        <div class="info-item">
          <span class="label">Nome:</span>
          <span class="value">{{ data.metadata?.name || 'N/A' }}</span>
        </div>
        <div class="info-item">
          <span class="label">Símbolo:</span>
          <span class="value">{{ data.metadata?.symbol || 'N/A' }}</span>
        </div>
        <div class="info-item">
          <span class="label">Total Mintado:</span>
          <span class="value"
            >{{ (data.totalMinted | number) ?? 'N/A' }} GOHO</span
          >
        </div>
        <div class="info-item">
          <span class="label">Suprimento Máximo:</span>
          <span class="value"
            >{{ (data.maxSupply | number) ?? 'N/A' }} GOHO</span
          >
        </div>
        <div class="info-item">
          <span class="label">Taxa de Mintagem (por token):</span>
          <span class="value">{{ data.mintFee ?? 'N/A' }} ETH</span>
        </div>
      </div>

      } @else if (isLoadingInfo()) {
      <div class="loading-message">Carregando informações do token...</div>
      } @else {
      <div class="loading-message">
        Clique em "Atualizar Informações" para carregar os dados.
      </div>
      }
    </section>
    <section class="endpoint-section">
      <h2>Endpoints GET (Consulta)</h2>
      <div class="endpoint">
        <h3><code>GET /token/metadata</code></h3>
        <p>Retorna os metadados básicos do token (nome, símbolo).</p>
        <pre><code>{{ '{ "name": "GoHorse Token", "symbol": "GOHO" }' | json }}</code></pre>
      </div>
      <div class="endpoint">
        <h3><code>GET /token/total-minted</code></h3>
        <p>Retorna a quantidade total de tokens GOHO que já foram mintados.</p>
        <pre><code>{{ '{ "totalMinted": 123456 }' | json }}</code></pre>
      </div>
      <div class="endpoint">
        <h3><code>GET /token/max-supply</code></h3>
        <p>Retorna o suprimento máximo possível de tokens GOHO.</p>
        <pre><code>{{ '{ "maxSupply": 1000000 }' | json }}</code></pre>
      </div>
      <div class="endpoint">
        <h3><code>GET /token/mint-fee</code></h3>
        <p>Retorna a taxa atual de mintagem por token, em ETH.</p>
        <pre><code>{{ '{ "fee": 0.001 }' | json }}</code></pre>
      </div>
    </section>

    <section class="endpoint-section">
      <h2>Endpoint POST (Ação)</h2>
      <div class="endpoint">
        <h3><code>POST /token/mint</code></h3>
        <p>Minta novos tokens GOHO para um endereço específico.</p>
        <h4>Corpo da Requisição (Body):</h4>
        <pre><code>{{ '{ "to": "0x...", "amount": 100 }' | json }}</code></pre>
        <ul>
          <li>
            <code>to</code> (string, obrigatório): Endereço da carteira que
            receberá os tokens.
          </li>
          <li>
            <code>amount</code> (number, obrigatório): Quantidade de tokens a
            serem mintados (deve ser positivo).
          </li>
        </ul>
        <h4>Resposta Sucesso (200 OK):</h4>
        <pre><code>{{ '{ "transactionHash": "0x...", "to": "0x...", "amount": 100 }' | json }}</code></pre>
        <h4>Resposta Erro (400 Bad Request):</h4>
      </div>
    </section>
  </div>`,
  styleUrl: './documentation.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DocumentationComponent implements OnInit {
  private http = inject(HttpClient);
  private apiUrl = environment.apiUrl || '/api/token';

  tokenData = signal<TokenInfo | null>(null);
  infoError = signal<string | null>(null);
  isLoadingInfo = signal(false);

  ngOnInit(): void {
    this.fetchTokenData();
  }

  fetchTokenData(): void {
    this.isLoadingInfo.set(true);
    this.infoError.set(null);

    forkJoin({
      metadata: this.http
        .get<TokenMetadata>(`${this.apiUrl}/metadata`)
        .pipe(catchError(() => of({}))),
      totalMinted: this.http
        .get<TotalMintedResponse>(`${this.apiUrl}/total-minted`)
        .pipe(
          map((r) => r.totalMinted),
          catchError(() => of(null))
        ),
      maxSupply: this.http
        .get<MaxSupplyResponse>(`${this.apiUrl}/max-supply`)
        .pipe(
          map((r) => r.maxSupply),
          catchError(() => of(null))
        ),
      mintFee: this.http.get<MintFeeResponse>(`${this.apiUrl}/mint-fee`).pipe(
        map((r) => r.fee),
        catchError(() => of(null))
      ),
    })
      .pipe(
        catchError((error) => {
          console.error('Erro ao buscar dados do token:', error);
          this.infoError.set(
            error.message || 'Não foi possível buscar as informações do token.'
          );
          this.tokenData.set(null);
          return of(null);
        }),
        finalize(() => this.isLoadingInfo.set(false))
      )
      .subscribe((results: any) => {
        if (results) {
          this.tokenData.set(results);
        }
      });
  }
}

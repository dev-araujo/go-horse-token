import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environments';
import { Observable, map, catchError, of, forkJoin, tap } from 'rxjs';
import {
  MintData,
  MintFeeResponse,
  MintSuccessData,
} from '../../features/mint/mint.model';
import {
  MaxSupplyResponse,
  TokenInfo,
  TokenMetadata,
  TotalMintedResponse,
} from '../../features/documentation/documenation.model';

interface RawMintApiResponse {
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

@Injectable({
  providedIn: 'root',
})
export class TokenService {
  private http = inject(HttpClient);
  private apiUrl = environment.apiUrl || '/api/token';

  getMintFee(): Observable<number | null> {
    return this.http.get<MintFeeResponse>(`${this.apiUrl}/mint-fee`).pipe(
      tap((response) =>
        console.log('Resposta bruta da API (mint-fee):', response)
      ),
      map((res) => {
        console.log(
          'Valor de res.fee:',
          res.mintFeePerToken,
          'Tipo:',
          typeof res.mintFeePerToken
        );
        return res.mintFeePerToken;
      }),
      catchError((error) => {
        console.error('Erro DENTRO do catchError de getMintFee:', error);
        return of(null);
      })
    );
  }

  mintTokens(data: MintData): Observable<MintSuccessData> {
    return this.http.post<RawMintApiResponse>(`${this.apiUrl}/mint`, data).pipe(
      map((response) => {
        const successData: MintSuccessData = {
          message: response.message,
          transactionHash: response.data.transactionHash,
          amountMinted: Number(response.data.amountMinted),
          balanceAfterMint: Number(response.data.balanceAfterMint),
          totalFee: Number(response.data.totalFeeEth), // Assume que totalFeeEth é MATIC
        };
        if (
          isNaN(successData.amountMinted) ||
          isNaN(successData.totalFee ?? NaN)
        ) {
          console.error(
            'Falha ao converter valores da API para número:',
            response.data
          );
          throw new Error('Formato de resposta inválido da API de mintagem.');
        }
        return successData;
      })
    );
  }

  getMetadata(): Observable<TokenMetadata> {
    return this.http
      .get<TokenMetadata>(`${this.apiUrl}/metadata`)
      .pipe(catchError(() => of({ name: 'Erro', symbol: 'Erro' })));
  }

  getTotalMinted(): Observable<number | null> {
    return this.http
      .get<TotalMintedResponse>(`${this.apiUrl}/total-minted`)
      .pipe(
        map((res) => res.totalMinted),
        catchError(() => of(null))
      );
  }

  getMaxSupply(): Observable<number | null> {
    return this.http.get<MaxSupplyResponse>(`${this.apiUrl}/max-supply`).pipe(
      map((res) => res.maxSupply),
      catchError(() => of(null))
    );
  }

  getTokenInfo(): Observable<TokenInfo | any> {
    return forkJoin({
      metadata: this.getMetadata(),
      totalMinted: this.getTotalMinted(),
      maxSupply: this.getMaxSupply(),
      mintFee: this.getMintFee(),
    }).pipe(
      map((results) => results as TokenInfo),
      catchError((error) => {
        console.error('Erro ao buscar todas as informações do token:', error);
        return of({
          metadata: { name: 'Erro', symbol: 'Erro' },
          totalMinted: null,
          maxSupply: null,
          mintFee: null,
        });
      })
    );
  }
}

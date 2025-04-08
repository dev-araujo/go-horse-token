import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environments';
import { Observable, map, catchError, of, forkJoin } from 'rxjs';
import { MintFeeResponse } from '../../features/mint/mint.model';
import {
  MaxSupplyResponse,
  TokenInfo,
  TokenMetadata,
  TotalMintedResponse,
} from '../../features/documentation/documenation.model';

@Injectable({
  providedIn: 'root',
})
export class TokenService {
  private http = inject(HttpClient);
  private apiUrl = environment.apiUrl || '/api/token';

  getMintFee(): Observable<number | null> {
    return this.http.get<MintFeeResponse>(`${this.apiUrl}/mint-fee`).pipe(
      map((res) => res.mintFeePerToken),
      catchError((error) => {
        console.error('Erro ao buscar taxa de mintagem:', error);
        return of(null);
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

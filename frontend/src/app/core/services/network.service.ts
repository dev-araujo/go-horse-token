import { Injectable, signal, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environments';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

import amoyGoHorse from '../../../../contracts/amoy/GoHorse.json';
import mainnetGoHorse from '../../../../contracts/mainnet/GoHorse.json';

export type Network = 'amoy' | 'mainnet';

interface ContractConfig {
  abi: any;
  explorerUrl: string;
}

@Injectable({
  providedIn: 'root',
})
export class NetworkService {
  private http = inject(HttpClient);
  private baseUrl = environment.apiUrl || '/api/token';

  private readonly CONTRACT_CONFIGS: Record<Network, ContractConfig> = {
    amoy: {
      abi: amoyGoHorse.abi,
      explorerUrl: 'https://amoy.polygonscan.com',
    },
    mainnet: {
      abi: mainnetGoHorse.abi,
      explorerUrl: 'https://polygonscan.com',
    },
  };

  activeNetwork = signal<Network>('mainnet');

  constructor() {}

  setNetwork(network: Network): void {
    this.activeNetwork.set(network);
  }

  getContractConfig(): ContractConfig {
    return this.CONTRACT_CONFIGS[this.activeNetwork()];
  }

  getContractAbi(): any {
    return this.getContractConfig().abi;
  }

  getExplorerUrl(): string {
    return this.CONTRACT_CONFIGS[this.activeNetwork()].explorerUrl;
  }

  getContractAddress(): Observable<string | null> {
    const network = this.activeNetwork();
    return this.http
      .get<{ address: string }>(`${this.baseUrl}/token/${network}/address`)
      .pipe(
        map((response) => response.address),
        catchError((error) => {
          console.error(
            `Error fetching contract address for ${network}:`,
            error
          );
          return of(null);
        })
      );
  }
}

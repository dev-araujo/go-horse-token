import {
  Injectable,
  signal,
  computed,
  PLATFORM_ID,
  inject,
} from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { ethers, BrowserProvider, Eip1193Provider, Signer } from 'ethers';

declare global {
  interface Window {
    ethereum?: Eip1193Provider & BrowserProvider;
  }
}

@Injectable({
  providedIn: 'root',
})
export class WalletService {
  private platformId = inject(PLATFORM_ID);

  readonly connectedAccount = signal<string | null>(null);
  readonly isConnected = computed(() => !!this.connectedAccount());
  readonly provider = signal<BrowserProvider | null>(null);
  readonly signer = signal<Signer | null>(null);

  constructor() {
    if (isPlatformBrowser(this.platformId)) {
      this.checkExistingConnection();
      this.listenForAccountChanges();
    }
  }

  async connectWallet(): Promise<string | null> {
    if (!isPlatformBrowser(this.platformId)) {
      console.error('A conexão com a carteira só pode ser feita no navegador.');
      return null;
    }

    if (!window.ethereum) {
      console.error('Nenhuma carteira Ethereum detectada. Instale o MetaMask!');
      alert('Instale o MetaMask ou outra carteira Ethereum para continuar.');
      return null;
    }

    try {
      const browserProvider = new ethers.BrowserProvider(window.ethereum);
      this.provider.set(browserProvider);

      const accounts = await browserProvider.send('eth_requestAccounts', []);

      if (accounts && accounts.length > 0) {
        const account = accounts[0];
        this.connectedAccount.set(account);
        const currentSigner = await browserProvider.getSigner();
        this.signer.set(currentSigner);
        console.log('Carteira conectada:', account);
        return account;
      } else {
        console.warn('Nenhuma conta foi selecionada.');
        this.disconnectWallet();
        return null;
      }
    } catch (error: any) {
      if (error.code === 4001) {
        console.log('Usuário rejeitou a conexão.');
      } else {
        console.error('Erro ao conectar a carteira:', error);
      }
      this.disconnectWallet();
      return null;
    }
  }

  disconnectWallet(): void {
    this.connectedAccount.set(null);
    this.provider.set(null);
    this.signer.set(null);
    console.log('Estado da carteira desconectado.');
  }

  private async checkExistingConnection(): Promise<void> {
    if (window.ethereum) {
      try {
        const browserProvider = new ethers.BrowserProvider(window.ethereum);
        const accounts = await browserProvider.send('eth_accounts', []);
        if (accounts && accounts.length > 0) {
          this.provider.set(browserProvider);
          this.connectedAccount.set(accounts[0]);
          const currentSigner = await browserProvider.getSigner();
          this.signer.set(currentSigner);
          console.log('Conexão existente encontrada:', accounts[0]);
        } else {
          this.disconnectWallet();
        }
      } catch (error) {
        console.error('Erro ao verificar conexão existente:', error);
        this.disconnectWallet();
      }
    }
  }

  private listenForAccountChanges(): void {
    if (window.ethereum && window.ethereum.on) {
      window.ethereum.on('accountsChanged', async (accounts: string[]) => {
        if (accounts && accounts.length > 0) {
          console.log('Conta alterada:', accounts[0]);
          const browserProvider = new ethers.BrowserProvider(window.ethereum!);
          this.provider.set(browserProvider);
          this.connectedAccount.set(accounts[0]);
          const currentSigner = await browserProvider.getSigner();
          this.signer.set(currentSigner);
        } else {
          console.log('Carteira desconectada ou bloqueada.');
          this.disconnectWallet();
        }
      });

      window.ethereum.on('chainChanged', (chainId: string) => {
        console.log('Rede alterada para:', chainId);
        window.location.reload();
      });
    }
  }
}

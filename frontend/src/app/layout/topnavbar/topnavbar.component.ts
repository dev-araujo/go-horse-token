import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  signal,
} from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { WalletService } from '../../core/services/wallet.service';

@Component({
  selector: 'app-topnavbar',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './topnavbar.component.html',
  styleUrl: './topnavbar.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TopnavbarComponent {
  private walletService = inject(WalletService);
  isMenuOpen = signal(false);

  isConnected = this.walletService.isConnected;
  connectedAccount = this.walletService.connectedAccount;

  displayAddress = computed(() => {
    const account = this.connectedAccount();
    if (!account) return 'Connect Wallet';
    return `${account.substring(0, 6)}...${account.substring(
      account.length - 4
    )}`;
  });

  toggleMenu(): void {
    this.isMenuOpen.update((value) => !value);
  }

  closeMenu(): void {
    this.isMenuOpen.set(false);
  }

  async handleWalletAction(): Promise<void> {
    if (this.isConnected()) {
      console.log('Carteira já conectada:', this.connectedAccount());
    } else {
      try {
        await this.walletService.connectWallet();
      } catch (error) {
        console.error('Falha ao conectar carteira a partir do navbar:', error);
      }
    }
    this.closeMenu();
  }
}

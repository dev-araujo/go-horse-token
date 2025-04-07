import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit,
  signal,
} from '@angular/core';
import { DecimalPipe } from '@angular/common';
import { finalize } from 'rxjs';
import { TokenService } from '../../core/services/token.service';
import { TokenInfo } from './documenation.model';

const CORE = [DecimalPipe];

@Component({
  selector: 'app-documentation',
  imports: [...CORE],
  templateUrl: './documentation.component.html',
  styleUrl: './documentation.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DocumentationComponent implements OnInit {
  private tokenService = inject(TokenService);

  tokenData = signal<TokenInfo | null>(null);
  infoError = signal<string | null>(null);
  isLoadingInfo = signal(false);

  ngOnInit(): void {
    this.fetchTokenData();
  }

  fetchTokenData(): void {
    this.isLoadingInfo.set(true);
    this.infoError.set(null);
    this.tokenData.set(null);

    this.tokenService
      .getTokenInfo()
      .pipe(finalize(() => this.isLoadingInfo.set(false)))
      .subscribe({
        next: (results) => {
          if (
            results &&
            (results.metadata?.name !== 'Erro' || results.totalMinted !== null)
          ) {
            this.tokenData.set(results);
          } else {
            this.infoError.set(
              'Não foi possível buscar todas as informações do token.'
            );
            this.tokenData.set(null);
          }
        },
        error: (error) => {
          console.error('Erro inesperado ao buscar dados do token:', error);
          this.infoError.set('Ocorreu um erro inesperado.');
          this.tokenData.set(null);
        },
      });
  }
}

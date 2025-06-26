import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit,
  signal,
  computed,
} from '@angular/core';
import {
  DecimalPipe,
  CommonModule,
  TitleCasePipe,
  UpperCasePipe,
} from '@angular/common';
import {
  finalize,
  switchMap,
  tap,
  catchError,
  of,
  map,
  startWith,
  Subject,
} from 'rxjs';
import { TokenService } from '../../core/services/token.service';
import { TokenInfo } from './documenation.model';
import { NetworkService } from '../../core/services/network.service';
import { toSignal, toObservable } from '@angular/core/rxjs-interop';

const CORE = [DecimalPipe, CommonModule, TitleCasePipe, UpperCasePipe];

@Component({
  selector: 'app-documentation',
  imports: [...CORE],
  templateUrl: './documentation.component.html',
  styleUrl: './documentation.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DocumentationComponent {
  private tokenService = inject(TokenService);
  public networkService = inject(NetworkService);

  isLoadingInfo = signal(false);
  infoError = signal<string | null>(null);

  tokenAddress = toSignal(
    toObservable(this.networkService.activeNetwork).pipe(
      switchMap(() => this.networkService.getContractAddress())
    ),
    { initialValue: null }
  );

  private refreshTrigger = new Subject<void>();
  polygonScan = computed(() => this.networkService.getExplorerUrl());

  tokenData = toSignal(
    toObservable(this.networkService.activeNetwork).pipe(
      switchMap((activeNetwork) =>
        this.refreshTrigger.pipe(
          startWith(undefined),
          tap(() => {
            this.isLoadingInfo.set(true);
            this.infoError.set(null);
          }),
          switchMap(() =>
            this.tokenService.getTokenInfo().pipe(
              catchError((error) => {
                this.isLoadingInfo.set(false);
                console.error(
                  'Erro inesperado ao buscar dados do token:',
                  error
                );
                this.infoError.set(
                  'Ocorreu um erro inesperado ao buscar informações.'
                );
                return of(null);
              }),
              finalize(() => {
                this.isLoadingInfo.set(false);
              })
            )
          ),
          map((results) => {
            if (this.isValidTokenInfo(results)) {
              this.isLoadingInfo.set(false);

              return results;
            } else {
              if (!this.infoError()) {
                this.infoError.set(
                  'Não foi possível buscar todas as informações do token ou os dados são inválidos.'
                );
              }
              return null;
            }
          })
        )
      )
    ),
    { initialValue: null }
  );

  onRefreshClick(): void {
    this.refreshTrigger.next();
  }
  private isValidTokenInfo(data: TokenInfo | null): data is TokenInfo {
    return (
      !!data && (data.metadata?.name !== 'Erro' || data.totalMinted !== null)
    );
  }
}

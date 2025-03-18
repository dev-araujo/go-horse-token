import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-topnavbar',
  imports: [RouterLink, RouterLinkActive],
  template: ` <header class="topnavbar">
    <div class="topnavbar__content">
      <div class="logo">GoHorse</div>

      <section class="topnavbar__actions">
        <nav>
          <a [routerLink]="['/token']" routerLinkActive="active">Home</a>
          <a [routerLink]="['/sobre']" routerLinkActive="active">Sobre</a>
          <a [routerLink]="['/docs']" routerLinkActive="active">Docs</a>
        </nav>
        <button class="connect-btn">Connect</button>
      </section>
    </div>
  </header>`,
  styleUrl: './topnavbar.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TopnavbarComponent {}

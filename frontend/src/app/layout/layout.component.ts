import { ChangeDetectionStrategy, Component } from '@angular/core';

import { RouterOutlet } from '@angular/router';
import { TopnavbarComponent } from './topnavbar/topnavbar.component';

const COMPONENTS = [TopnavbarComponent];
const CORE = [RouterOutlet];

@Component({
  selector: 'app-layout',
  imports: [...COMPONENTS, ...CORE],
  template: `
    <div class="layout">
      <app-topnavbar />
      <main class="layout__content">
        <router-outlet />
      </main>
    </div>
  `,
  styleUrl: './layout.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LayoutComponent {}

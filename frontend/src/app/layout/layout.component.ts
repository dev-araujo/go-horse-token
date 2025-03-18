import { ChangeDetectionStrategy, Component } from '@angular/core';

import { RouterOutlet } from '@angular/router';
import { TopnavbarComponent } from './topnavbar/topnavbar.component';

const COMPONENTS = [TopnavbarComponent];
const CORE = [RouterOutlet];

@Component({
  selector: 'app-layout',
  imports: [...COMPONENTS, ...CORE],
  template: `<main class="layout">
    <div class="layout__content"><app-topnavbar /> <router-outlet /></div>
  </main> `,
  styleUrl: './layout.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LayoutComponent {}

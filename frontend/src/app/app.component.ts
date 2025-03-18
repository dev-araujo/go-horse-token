import { Component } from '@angular/core';
import { LayoutComponent } from './layout/layout.component';

const COMPONENTS = [LayoutComponent];

@Component({
  selector: 'app-root',
  imports: [...COMPONENTS],
  template: `<app-layout />`,
})
export class AppComponent {
  title = 'Go Horse Token';
}

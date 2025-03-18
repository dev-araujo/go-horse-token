import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-mint',
  imports: [],
  template: `<p>mint works!</p>`,
  styleUrl: './mint.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MintComponent { }

import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-topnavbar',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './topnavbar.component.html',
  styleUrl: './topnavbar.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TopnavbarComponent {
  isMenuOpen = signal(false);

  toggleMenu(): void {
    this.isMenuOpen.update((value) => !value);
  }

  closeMenu(): void {
    this.isMenuOpen.set(false);
  }
}

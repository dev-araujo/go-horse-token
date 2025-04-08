import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'token',
    loadComponent: () =>
      import('./features/mint/mint.component').then((m) => m.MintComponent),
    title: 'Token GoHorse',
  },
  {
    path: 'sobre',
    loadComponent: () =>
      import('./features/about/about.component').then((a) => a.AboutComponent),
    title: 'Sobre GoHorse',
  },
  {
    path: 'docs',
    loadComponent: () =>
      import('./features/documentation/documentation.component').then(
        (d) => d.DocumentationComponent
      ),
    title: 'Docs GoHorse',
  },
  { path: '**', redirectTo: '/token', pathMatch: 'full' },
];

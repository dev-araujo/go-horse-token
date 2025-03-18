import { AboutComponent } from './features/about/about.component';
import { DocsComponent } from './features/docs/docs.component';
import { MintComponent } from './features/mint/mint.component';
import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: 'token', component: MintComponent, title: 'Token GoHorse' },
  { path: 'sobre', component: AboutComponent, title: 'Sobre GoHorse' },
  { path: 'docs', component: DocsComponent, title: 'Docs GoHorse' },
  { path: '*', redirectTo: '/token', pathMatch: 'full' },
];

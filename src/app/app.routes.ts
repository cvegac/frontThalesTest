import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'home-page',
    pathMatch: 'full',
  },
  {
    path: 'home-page',
    loadComponent: () =>
      import('./home-page/home-page.component').then(
        (m) => m.HomePageComponent
      ),
    data: {
      title: 'Home Page',
    },
  },
  { path: '**', redirectTo: 'home-page' },
];

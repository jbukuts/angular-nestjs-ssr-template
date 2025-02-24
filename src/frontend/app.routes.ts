import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    title: 'Index Page (SSR)',
    loadComponent: () =>
      import('./pages/index.component').then((c) => c.IndexPage)
  },
  {
    path: 'csr',
    title: 'CSR Page',
    loadComponent: () => import('./pages/csr.component').then((c) => c.CSRPage)
  },
  {
    path: 'ssg',
    title: 'SSG Page',
    loadComponent: () => import('./pages/ssg.component').then((c) => c.SSGPage)
  }
];

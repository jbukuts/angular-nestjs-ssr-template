import { Routes } from '@angular/router';
import { IndexPage } from './pages/index.component';

export const routes: Routes = [
    { path: '', component: IndexPage, title: 'Index Page (SSR)' },
    { path: 'csr', title: 'CSR Page', loadComponent: () => import('./pages/csr.component').then(c => c.CSRPage) },
    { path: 'ssg', title: 'SSG Page', loadComponent: () => import('./pages/ssg.component').then(c => c.SSGPage) }
];

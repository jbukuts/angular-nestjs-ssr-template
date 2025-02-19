import { Routes } from '@angular/router';
import { CSRPage } from './pages/csr.component';
import { IndexPage } from './pages/index.component';
import { SSGPage } from './pages/ssg.component';

export const routes: Routes = [
    { path: '', component: IndexPage, title: 'Index Page (SSR)' },
    { path: 'csr', component: CSRPage, title: 'CSR Page' },
    { path: 'ssg', component: SSGPage, title: 'SSG Page' }
];

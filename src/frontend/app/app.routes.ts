import { Routes } from '@angular/router';
import { CSRPage } from './pages/csr.component';
import { IndexPage } from './pages/index.component';

export const routes: Routes = [
    { path: 'csr', component: CSRPage },
    { path: '', component: IndexPage }
];

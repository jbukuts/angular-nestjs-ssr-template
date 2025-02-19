import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RouterLink, RouterLinkActive],
  template: `
    <h1>NestJS/Angular 19 SSR Monorepo</h1>
    <nav>
      <a routerLink="/" routerLinkActive="active" ariaCurrentWhenActive="page">Index Page (SSR)</a>
      <a routerLink="/csr" routerLinkActive="active" ariaCurrentWhenActive="page">CSR Page</a>
    </nav>
    <main>
      <router-outlet />
    </main>
    
  `,
  styles: [`
    nav { 
      padding: 1rem;
      border: 2px dashed red;
      display: flex;
      flex-direction: row;
      gap: 0.5rem;

      & a:hover {
        cursor: pointer;  
      }
    }

    main {
      padding: 1rem;
      border: 2px dashed blue;
    }
  `],
})
export class AppComponent {}

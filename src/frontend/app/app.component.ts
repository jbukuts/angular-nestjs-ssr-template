import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { routes } from './app.routes'


@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RouterLink, RouterLinkActive],
  template: `
    <h1>Nest/Angular 19 Monorepo</h1>
    <nav>
      @for (route of routes; track $index) {
        <a [routerLink]="['/' + route.path]" [routerLinkActiveOptions]="{ exact: true }" routerLinkActive="active" ariaCurrentWhenActive="page">{{route.title}}</a>
      }
      <a href="/api">API Route</a>
    </nav>
    <main>
      <router-outlet />
    </main>
  `,
  styles: [`
    nav { 
      padding: 1rem;
      margin-bottom: 1rem;
      border: 2px dashed red;
      display: flex;
      flex-direction: row;
      gap: 0.5rem;

      & a {
        text-decoration: none;

        &.active {
          color: red;
        }

        &:hover { 
          cursor: pointer; 
          text-decoration: underline;
        }  
      }
    }

    main {
      padding: 1rem;
      border: 2px dashed blue;
    }
  `],
})
export class AppComponent {
  routes = routes
}

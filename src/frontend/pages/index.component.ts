import { Component } from '@angular/core';
import { CounterComponent } from '#/components/counter.component';
import { HydrateComponent } from '#/components/hydrate.component';
import { FetchComponent } from '#/components/fetch.component';

@Component({
  selector: 'app-index',
  imports: [CounterComponent, HydrateComponent, FetchComponent],
  template: `
    <app-hydrate-component />
    <app-counter />

    <app-fetch-test
      ><p>
        This data is fetched server-side. Verify this by watching the
        <b>Network</b> tab. Initial page loads will have no XHR request. Once
        CSR takes over returning to this page will trigger one.
      </p></app-fetch-test
    >

    <p>This template is built using:</p>
    <ul>
      <li><a href="https://angular.dev/">Angular v19</a></li>
      <li><a href="https://docs.nestjs.com/">NestJS</a></li>
    </ul>

    <p>Notes on this page:</p>
    <ul>
      <li><u>This page is server-side rendered</u></li>
      <li><u>This page performs hydration</u></li>
    </ul>

    <p>
      This page is defined to be <b>server-side rendered</b> via the server
      routing API in Angular and built/served using <b>NestJS middlware</b>.
    </p>

    <p>How to verify this page is server-side rendered:</p>
    <ul>
      <li>
        <b>Check the page source:</b> The page source should contain all content
        you see here.
      </li>
      <li>
        <b>Watch the server log:</b> The NestJS instance should trigger the
        middleware and producing a log when accessing this page.
      </li>
    </ul>

    <p>Docs on SSR:</p>
    <ul>
      <li>
        <a href="https://angular.dev/guide/prerendering">Prerendering (SSG)</a>
      </li>
      <li>
        <a
          href="https://angular.dev/guide/hybrid-rendering#configuring-server-routes"
          >Configuring server routes</a
        >
      </li>
    </ul>
  `,
  styles: []
})
export class IndexPage {}

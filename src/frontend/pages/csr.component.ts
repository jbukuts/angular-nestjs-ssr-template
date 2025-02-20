import { Component } from '@angular/core';
import { FetchComponent } from "#/components/fetch.component";

@Component({
  selector: 'csr-test',
  imports: [FetchComponent],
  template: `
    <div id="fetch-test">
      <fetch-test />
    </div>

    <p>Notes on this page:</p>
    <ul>
      <li><u>This page is client-side rendered</u></li>
      <li><u>This page is lazy-loaded</u></li>
    </ul>

    <p>How to verify this page is client-side rendered:</p>
    <ul>
      <li><b>Check the page source:</b> The page source should only contain the <code>app-root</code>.</li>
      <li><b>Page blink:</b> A quick blink on the initial page load is a sign this page is CSR</li>
    </ul>

    <p>Verifying lazy-loading:</p>
    <ul>
      <li><b>Watch the Network Tab:</b>When navigating to this page you should see a new JS bundle fetched</li>
    </ul>

    <p>Docs on lazy-loading:</p>
    <ul>
      <li><a href="https://angular.dev/reference/migrations/route-lazy-loading#after">Migration to lazy-loaded routes</a></li>
    </ul>
  `,
  styles: [`
    @use 'mixins' as *;

    #fetch-test {
      @include content-area(orange);
    }
  
  `],
})
export class CSRPage {}

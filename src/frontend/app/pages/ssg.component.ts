import { Component } from '@angular/core';

@Component({
  selector: 'ssg-test',
  imports: [],
  template: `
    <p>Notes on this page:</p>
    <ul>
      <li><u>This page is pre-rendered</u></li>
      <li><u>This page is lazy-loaded</u></li>
    </ul>

    <p>This page is <b>statically pre-rendered</b> via the server routing API in Angular allowing for pages to be pre-rendered at build time and served as static assets. 
    
    <p>How to verify this page is pre-rendered:</p>
    <ul>
      <li><b>Check the page source:</b> The page source should contain all content you see here.</li>
      <li><b>Verify the static asset in the build output:</b> Within <code>dist/[project]/browser/ssg</code> you should see this page's content.</li>
      <li><b>Watch the server log:</b> The NestJS instance serves SSG pages as static assets and as such should not even hit the SSR middleware to serve this page.</li>
    </ul>

    <p>Verifying lazy-loading:</p>
    <ul>
      <li><b>Watch the Network Tab:</b>When navigating to this page you should see a new JS bundle fetched</li>
    </ul>

    <p>Docs on pre-rendering:</p>
    <ul>
      <li><a href="https://angular.dev/guide/prerendering">Prerendering (SSG)</a></li>
      <li><a href="https://angular.dev/guide/hybrid-rendering#configuring-server-routes">Configuring server routes</a></li>
    </ul>
  `,
  styles: [],
})
export class SSGPage {}
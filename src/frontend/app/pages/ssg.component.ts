import { Component } from '@angular/core';

@Component({
  selector: 'ssg-test',
  imports: [],
  template: `
    <p>This page is statically pre-rendered. This is done via the server routing API in Angular allowing for pages to be pre-rendered at build time and served as static assets. To verify that this page is pre-rendered you can check the page source of this page. Instead of seeing an empty app-route tag it will instead be populated with this content on initial load of the HTML.</p>
  `,
  styles: [],
})
export class SSGPage {}
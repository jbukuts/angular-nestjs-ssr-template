import { Component } from '@angular/core';

@Component({
  selector: 'csr-test',
  imports: [],
  template: `
    <p>This page is client-side rendered. This can be verified given the initial blink you will see on initial page load when reloading this page.</p>
  `,
  styles: [],
})
export class CSRPage {}

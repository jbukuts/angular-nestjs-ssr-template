import { Component } from '@angular/core';
import { CounterComponent } from "../../components/counter.component";

@Component({
  selector: 'index',
  imports: [CounterComponent],
  template: `
    <p>Index page content</p>
    <counter/>
  `,
  styles: [],
})
export class IndexPage {}

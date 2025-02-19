import { Component } from '@angular/core';
import { CounterComponent } from "../../components/counter.component";
import { MyComponent } from "../../components/hydrate.component";

@Component({
  selector: 'index',
  imports: [CounterComponent, MyComponent],
  template: `
    <p>Index page content</p>
    <hydrate-component />
    <counter />
  `,
  styles: [],
})
export class IndexPage {}

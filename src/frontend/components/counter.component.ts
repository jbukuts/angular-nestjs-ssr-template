import { Component } from '@angular/core';

@Component({
  selector: 'counter',
  template: `
    <button (click)="increment()">Click Me</button>
    <p>count: {{ count }}</p>
  `,
  styles: [],
})
export class CounterComponent {
  count = 0;

    increment() {
        console.log('test')
        this.count++
    }
}

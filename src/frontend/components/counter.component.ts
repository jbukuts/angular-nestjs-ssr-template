import { Component } from '@angular/core';

@Component({
  selector: 'app-counter',
  template: `
    <div>
      <button (click)="increment()">Click Me</button>
      <p>count: {{ count }}</p>
    </div>
  `,
  styles: [
    `
      @use 'mixins' as *;

      div {
        display: flex;
        height: auto;
        flex-direction: row;
        gap: 1rem;
        @include content-area(purple);

        & p {
          margin: 0;
        }
      }
    `
  ]
})
export class CounterComponent {
  count = 0;

  increment() {
    this.count++;
  }
}

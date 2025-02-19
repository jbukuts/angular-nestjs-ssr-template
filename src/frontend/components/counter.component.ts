import { Component } from '@angular/core';

@Component({
  selector: 'counter',
  template: `
    <div>
      <button (click)="increment()">Click Me</button>
      <p>count: {{ count }}</p>
    </div>
  `,
  styles: [`
    div {
      display: flex;
      height: auto;
      flex-direction: row;
      gap: 1rem;
      padding: 1rem;
      border: 2px dashed purple;

      & p {
        margin: 0;
      }
    }
  `],
})
export class CounterComponent {
  count = 0;

  increment() {
    this.count++
  }
}

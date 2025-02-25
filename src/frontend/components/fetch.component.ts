import { JsonPipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import injectQuery from '../services/query.service';

interface TestData {
  userId: number;
  id: number;
  title: string;
  body: string;
}

@Component({
  selector: 'app-fetch-test',
  imports: [JsonPipe],
  template: `
    <div id="wrapper">
      <div><ng-content /></div>
      @if (query().pending) {
        <p>Loading...</p>
      } @else {
        <pre>{{ query().data | json }}</pre>
      }

      <button (click)="query().refetch()" [disabled]="query().pending">
        Refetch
      </button>
    </div>
  `,
  styles: [
    `
      @use 'mixins' as *;

      #wrapper {
        @include content-area(orange);
        margin-top: 1rem;
        overflow-x: auto;
      }
      pre {
        overflow-x: auto;
      }
    `
  ]
})
export class FetchComponent implements OnInit {
  query = injectQuery<TestData>({ route: `/api?wait=${1000}`, ttl: 500 });

  ngOnInit() {
    return;
  }
}

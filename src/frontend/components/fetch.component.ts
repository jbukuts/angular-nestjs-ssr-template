import { JsonPipe } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import injectQuery from '../services/query.service';
import { HttpClient } from '@angular/common/http';

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
      @if (query.isPending()) {
        <p>Loading...</p>
      } @else {
        <pre>{{ query.data() | json }}</pre>
      }

      <button (click)="query.refetch()" [disabled]="query.isPending()">
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
  #http = inject(HttpClient);

  query = injectQuery<TestData>({
    key: 'test-fetch',
    route: this.#http.get<TestData>('/api', { params: { wait: 500 } }),
    keepPreviousData: false,
    ttl: 500,
    onSuccess: (d) => console.log(d)
  });

  ngOnInit() {
    return;
  }
}

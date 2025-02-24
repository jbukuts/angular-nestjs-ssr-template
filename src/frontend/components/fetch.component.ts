import { JsonPipe } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { DataService } from '#/services/data.service';

interface TestData {
  userId: number;
  id: number;
  title: string;
  body: string;
}

@Component({
  selector: 'app-fetch-test',
  imports: [JsonPipe],
  template: `<pre>{{ data | json }}</pre>`,
  styles: [
    `
      pre {
        overflow-x: auto;
      }
    `
  ]
})
export class FetchComponent implements OnInit {
  count = 0;
  data: TestData | undefined;
  private dataService = inject(DataService);

  ngOnInit() {
    this.dataService
      .fetchData<TestData>({ route: '/api' })
      .subscribe((data) => {
        this.data = data;
      });
  }
}

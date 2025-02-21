import { JsonPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { DataService } from '#/services/data.service';

@Component({
  selector: 'fetch-test',
  imports: [JsonPipe],
  template: `<pre>{{ data | json }}</pre>`,
  styles: [`
    pre {
        overflow-x: auto;
    }
  `],
})
export class FetchComponent {
    count = 0;
    data: any
    private dataService = inject(DataService)
    
    ngOnInit() {
        this.dataService.fetchData({ route: '/api' }).subscribe((data) => {
            this.data = data;
        });
    }
}

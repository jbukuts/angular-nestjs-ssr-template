import { JsonPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { DataService } from '../app/services/data.service';

@Component({
  selector: 'fetch-test',
  imports: [JsonPipe],
  template: `<pre>{{ data | json }}</pre>`,
  styles: [],
})
export class FetchComponent {
    count = 0;
    data: any
    private dataService = inject(DataService)
    
    ngOnInit() {
        this.dataService.fetchData({ route: '/api', ignoreCache: true }).subscribe((data) => {
            this.data = data;
        });
    }
}

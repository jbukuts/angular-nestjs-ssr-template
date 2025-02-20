import { JsonPipe } from '@angular/common';
import { Component } from '@angular/core';
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

    constructor(private dataService: DataService) {}
    
    ngOnInit() {
        this.dataService.fetchData().subscribe((data) => {
            this.data = data;
        });
    }
}

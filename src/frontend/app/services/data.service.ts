import { HttpClient } from "@angular/common/http";
import { Injectable, makeStateKey, TransferState } from "@angular/core";
import { of, tap } from "rxjs";

const MY_DATA_KEY = makeStateKey<any>('myData');

@Injectable({
    providedIn: 'root',
})
export class DataService {
    constructor(
        private http: HttpClient,
        private transferState: TransferState
    ) {}

    fetchData() {
        // Check if data already exists in TransferState
        const storedData = this.transferState.get(MY_DATA_KEY, null);

        if (storedData) {
            // Return the stored data
            return of(storedData);
        } else {

            // await new Promise((r) => setTimeout(r, 2000))

            // Fetch data from the API
            return this.http.get('https://jsonplaceholder.typicode.com/posts/1').pipe(
                tap((data) => {
                    // Store the data in TransferState for the client
                    return data
                    // this.transferState.set(MY_DATA_KEY, data);
                })
            );
        }
    }
}
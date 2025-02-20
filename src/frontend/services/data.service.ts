import { HttpClient } from "@angular/common/http";
import { Injectable, makeStateKey, TransferState, Inject } from "@angular/core";
import { of, tap } from "rxjs";
// import crypto from 'crypto'

interface FetchDataOpts {
    /** route from which data is fetched */
    route: string;
    /** optional internal cache key (defaults to route) */
    key?: string;
    /** whether to ignore cache when fetching data */
    ignoreCache?: boolean;
}


@Injectable({
    providedIn: 'root',
})
export class DataService {
 
    constructor(
        private http: HttpClient,
        private transferState: TransferState
    ) {}

    fetchData<T = any>(opts: FetchDataOpts) {
        const { route, key, ignoreCache = false } = opts

        // const hash = crypto.createHash('sha256').update(route).digest('hex');
        const cacheKey = makeStateKey<T>(key ?? route);
        const storedData = this.transferState.get(cacheKey, null);
        if (!ignoreCache && storedData) return of<T>(storedData);

        // await new Promise((r) => setTimeout(r, 2000))
        return this.http.get<T>(route).pipe(
            tap((data) => {
                this.transferState.set(cacheKey, data);
                return data;
            })
        );
        
    }
}
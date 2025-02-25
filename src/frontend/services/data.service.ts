import { HttpClient } from '@angular/common/http';
import { Injectable, makeStateKey, TransferState } from '@angular/core';
import { of, tap } from 'rxjs';

interface CacheItem<T> {
  timestamp: number;
  ttl: number;
  data: T;
}

interface FetchDataOpts {
  /** route from which data is fetched */
  route: string;
  /** optional internal cache key (defaults to route) */
  key?: string;
  /** whether to ignore cache when fetching data */
  ignoreCache?: boolean;
  /** time in seconds til value is considered stale */
  ttl?: number;
}

@Injectable({
  providedIn: 'root'
})
export class DataService {
  constructor(
    private http: HttpClient,
    private transferState: TransferState
  ) {}

  fetchData<T = unknown>(opts: FetchDataOpts) {
    const { route, key, ttl = 0, ignoreCache = false } = opts;

    const cacheKey = makeStateKey<CacheItem<T>>(key ?? route);
    const storedData = this.transferState.get(cacheKey, null);
    if (
      !ignoreCache &&
      storedData &&
      storedData.timestamp + storedData.ttl > Date.now()
    ) {
      console.log('CACHE HIT');
      return of<T>(storedData.data);
    }

    return this.http.get<T>(route).pipe(
      tap((data) => {
        this.transferState.set(cacheKey, {
          timestamp: Date.now(),
          ttl: ttl * 1000,
          data
        });
        return data;
      })
    );
  }
}

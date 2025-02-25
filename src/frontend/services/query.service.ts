/* eslint-disable @typescript-eslint/no-unsafe-function-type */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-expressions */
import { HttpClient } from '@angular/common/http';
import {
  Injector,
  TransferState,
  assertInInjectionContext,
  computed,
  inject,
  makeStateKey,
  runInInjectionContext,
  signal
} from '@angular/core';
import { lastValueFrom } from 'rxjs';

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

function assertInector(
  fn: Function,
  injector: Injector | undefined | null,
  runner: () => any
) {
  !injector && assertInInjectionContext(fn);
  const asserted = injector ?? inject(Injector);
  return runInInjectionContext(asserted, runner);
}

function makeQuery<T>(opts: FetchDataOpts) {
  const { route, key, ttl = -1, ignoreCache = false } = opts;

  const transferState = inject(TransferState);
  const http = inject(HttpClient);

  const querySignal = signal<T | null>(null);

  const cacheKey = makeStateKey<CacheItem<T>>(key ?? route);
  const storedData = transferState.get(cacheKey, null);

  const fetch = () => {
    querySignal.set(null);

    lastValueFrom(http.get<T>(route)).then((data) => {
      transferState.set(cacheKey, {
        timestamp: Date.now(),
        ttl: ttl < 0 ? Infinity : ttl * 1000,
        data
      });
      console.log('FRESH DATA. TRIGGER SIGNAL');
      querySignal.set(data);
    });
  };

  if (
    !ignoreCache &&
    storedData &&
    storedData.timestamp + storedData.ttl > Date.now()
  ) {
    console.log('CACHE HIT');
    querySignal.set(storedData.data);
  } else {
    fetch();
  }

  return computed(() => ({
    refetch: fetch,
    pending: querySignal() === null,
    data: querySignal()
  }));
}

export default function injectQuery<T>(opts: FetchDataOpts) {
  return assertInector(injectQuery, null, () =>
    makeQuery<T>(opts)
  ) as ReturnType<typeof makeQuery<T>>;
}

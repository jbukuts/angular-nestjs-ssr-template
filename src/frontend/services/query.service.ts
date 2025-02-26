/* eslint-disable @typescript-eslint/no-unsafe-function-type */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-expressions */
import { isPlatformBrowser } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import {
  Injector,
  Signal,
  TransferState,
  assertInInjectionContext,
  computed,
  inject,
  makeStateKey,
  runInInjectionContext,
  signal,
  untracked,
  PLATFORM_ID
} from '@angular/core';
import { Observable, isObservable, lastValueFrom } from 'rxjs';

type MapToSignals<T> = {
  [K in keyof T]: T[K] extends Function ? T[K] : Signal<T[K]>;
};

interface CacheItem<T> {
  timestamp: number;
  ttl: number;
  data: T;
}

interface FetchDataOpts<T> {
  /** route from which data is fetched */
  route: string | (() => Observable<T>) | Observable<T>;
  /** optional internal cache key (defaults to route) */
  key: string;
  /** time in seconds until value is considered stale */
  ttl?: number;
  keepPreviousData?: boolean;
  onSuccess?: (data: T) => void;
  onError?: () => void;
}

function assertInjector(
  fn: Function,
  injector: Injector | undefined | null,
  runner: () => any
) {
  !injector && assertInInjectionContext(fn);
  const asserted = injector ?? inject(Injector);
  return runInInjectionContext(asserted, runner);
}

function signalProxy<TInput extends Record<string | symbol, any>>(
  inputSignal: Signal<TInput>
) {
  const internalState = {} as MapToSignals<TInput>;

  return new Proxy<MapToSignals<TInput>>(internalState, {
    get(target, prop) {
      // first check if we have it in our internal state and return it
      const computedField = target[prop];
      if (computedField) return computedField;

      // then, check if it's a function on the resultState and return it
      const targetField = untracked(inputSignal)[prop];
      if (typeof targetField === 'function') return targetField;

      // finally, create a computed field, store it and return it
      // @ts-expect-error generic type only meant for indexing
      return (target[prop] = computed(() => inputSignal()[prop]));
    },
    has(_, prop) {
      return !!untracked(inputSignal)[prop];
    },
    ownKeys() {
      return Reflect.ownKeys(untracked(inputSignal));
    },
    getOwnPropertyDescriptor() {
      return {
        enumerable: true,
        configurable: true
      };
    }
  });
}

function makeQuery<T>(opts: FetchDataOpts<T>) {
  const {
    route,
    key,
    ttl = -1,
    keepPreviousData = false,
    onSuccess = () => null
  } = opts;

  const transferState = inject(TransferState);
  const http = inject(HttpClient);
  const platform = inject(PLATFORM_ID);

  const querySignal = signal<T | null>(null);
  const cacheKey = makeStateKey<CacheItem<T>>(key);
  const storedData = transferState.get(cacheKey, null);

  const fetch = () => {
    if (!keepPreviousData) querySignal.set(null);

    const o =
      typeof route === 'string'
        ? http.get<T>(route)
        : isObservable(route)
          ? route
          : route();

    lastValueFrom(o).then((data) => {
      console.log('FRESH DATA. TRIGGER SIGNAL');
      transferState.set(cacheKey, {
        timestamp: Date.now(),
        ttl: ttl < 0 ? Infinity : ttl * 1000,
        data
      });
      querySignal.set(data);
      if (isPlatformBrowser(platform)) onSuccess(data);
    });
  };

  if (storedData && storedData.timestamp + storedData.ttl > Date.now()) {
    console.log('CACHE HIT!');
    querySignal.set(storedData.data);
  } else {
    fetch();
  }

  return signalProxy(
    computed(() => ({
      refetch: fetch,
      isPending: querySignal() === null,
      data: querySignal()
    }))
  );
}

export default function injectQuery<T>(opts: FetchDataOpts<T>) {
  return assertInjector(injectQuery, null, () =>
    makeQuery<T>(opts)
  ) as ReturnType<typeof makeQuery<T>>;
}

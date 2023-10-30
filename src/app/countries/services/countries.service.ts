import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, delay, map, of, tap } from 'rxjs';

import { CacheStore, Country, Region } from '../interfaces';
import { FilterRequest } from '../interfaces';

@Injectable({
  providedIn: 'root',
})  
export class CountriesService {
  private _httpClient: HttpClient;
  private _serviceUrl = 'https://restcountries.com/v3.1';

  public cacheStore: CacheStore = {
    byCapital: {
      term: '',
      countries: [],
    },
    byCountry: {
      term: '',
      countries: [],
    },
    byRegion: {
      region: '',
      countries: [],
    },
  };

  constructor(httpClient: HttpClient) {
    this._httpClient = httpClient;
  }

  private getCountriesRequest(url: string): Observable<Country[]> {
    return this._httpClient.get<Country[]>(url).pipe(catchError(() => of([])));
  }

  public searchCountriesByFilter(
    term: string,
    filter: FilterRequest
  ): Observable<Country[]> {
    const url = `${this._serviceUrl}/${filter}/${term}`;
    return this._httpClient.get<Country[]>(url).pipe(
      tap((countries) => {
        if (filter === 'capital')
          this.cacheStore.byCapital = { term, countries };

        if (filter === 'name') this.cacheStore.byCountry = { term, countries };

        if (filter === 'region')
          this.cacheStore.byRegion = { region: term as Region, countries };
      }),
      catchError(() => of([])),
      delay(1000)
    );
  }

  public searchCountryByCode(code: string): Observable<Country | null> {
    const url = `${this._serviceUrl}/alpha/${code}`;
    return this._httpClient.get<Country[]>(url).pipe(
      map((countries) => countries[0]),
      catchError(() => of(null))
    );
  }
}

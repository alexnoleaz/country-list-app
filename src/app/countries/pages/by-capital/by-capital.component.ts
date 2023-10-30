import { Component } from '@angular/core';

import { CountriesService } from '../../services/countries.service';
import { Country } from '../../interfaces';

@Component({
  selector: 'countries-by-capital-page',
  templateUrl: './by-capital.component.html',
})
export class ByCapitalPageComponent {
  private _countriesService: CountriesService;

  public countries: Country[] = [];
  public isLoading: boolean = false;

  constructor(countriesService: CountriesService) {
    this._countriesService = countriesService;
  }

  public searchCountries(capital: string): void {
    this.isLoading = true;
    this._countriesService
      .searchCountriesByFilter(capital, 'capital')
      .subscribe((countries) => {
        this.countries = countries;
        this.isLoading = false;
      });
  }
}

import { Component } from '@angular/core';
import { CountriesService } from '../../services/countries.service';
import { Country } from '../../interfaces';

@Component({
  selector: 'countries-by-country-page',
  templateUrl: './by-country.component.html',
})
export class ByCountryPageComponent {
  private _countriesService: CountriesService;

  public countries: Country[] = [];
  public isLoading: boolean = false;

  constructor(countriesService: CountriesService) {
    this._countriesService = countriesService;
  }

  public searchCountries(country: string): void {
    this.isLoading = true;
    this._countriesService
      .searchCountriesByFilter(country, 'name')
      .subscribe((countries) => {
        this.countries = countries;
        this.isLoading = false;
      });
  }
}

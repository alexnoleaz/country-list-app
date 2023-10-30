import { Component } from '@angular/core';
import { CountriesService } from '../../services/countries.service';
import { Country, Region } from '../../interfaces';

@Component({
  selector: 'countries-by-region-page',
  templateUrl: './by-region.component.html',
})
export class ByRegionPageComponent {
  private _countriesService: CountriesService;

  public isLoading: boolean = false;
  public countries: Country[] = [];
  public selectedRegion?: Region;
  public regions: Region[] = [
    'Africa',
    'Americas',
    'Europe',
    'Oceania',
    'Asia',
  ];

  constructor(countriesService: CountriesService) {
    this._countriesService = countriesService;
  }

  public searchCountries(country: Region): void {
    this.isLoading = true;
    this.selectedRegion = country;
    this._countriesService
      .searchCountriesByFilter(country, 'region')
      .subscribe((countries) => {
        this.countries = countries;
        this.isLoading = false;
      });
  }
}

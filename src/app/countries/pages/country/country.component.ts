import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CountriesService } from '../../services/countries.service';
import { switchMap } from 'rxjs';
import { Country } from '../../interfaces';

@Component({
  selector: 'countries-country-page',
  templateUrl: './country.component.html',
  styles: ['a{text-decoration: none}'],
})
export class CountryPageComponent implements OnInit {
  private _activatedRoute: ActivatedRoute;
  private _countriesService: CountriesService;
  private _router: Router;

  public country?: Country;

  constructor(
    activatedRoute: ActivatedRoute,
    router: Router,
    countriesService: CountriesService
  ) {
    this._activatedRoute = activatedRoute;
    this._router = router;
    this._countriesService = countriesService;
  }

  ngOnInit(): void {
    this._activatedRoute.params
      .pipe(
        switchMap(({ id }) => this._countriesService.searchCountryByCode(id))
      )
      .subscribe((country) =>
        !country ? this._router.navigateByUrl('') : (this.country = country)
      );
  }
}

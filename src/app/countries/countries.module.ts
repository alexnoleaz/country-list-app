import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CountriesRoutingModule } from './countries-routing.module';
import { SharedModule } from '../shared/shared.module';

import { ByCapitalPageComponent } from './pages/by-capital/by-capital.component';
import { ByCountryPageComponent } from './pages/by-country/by-country.component';
import { ByRegionPageComponent } from './pages/by-region/by-region.component';
import { CountryPageComponent } from './pages/country/country.component';
import { CountriesTableComponent } from './components/countries-table/countries-table.component';

@NgModule({
  declarations: [
    ByCapitalPageComponent,
    ByCountryPageComponent,
    ByRegionPageComponent,
    CountryPageComponent,
    CountriesTableComponent,
  ],
  imports: [CommonModule, CountriesRoutingModule, SharedModule],
})
export class CountriesModule {}

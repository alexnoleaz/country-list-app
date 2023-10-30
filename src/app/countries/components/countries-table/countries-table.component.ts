import { Component, Input, OnInit } from '@angular/core';
import { Country } from '../../interfaces';

@Component({
  selector: 'countries-table',
  templateUrl: './countries-table.component.html',
  styles: ['img{width:25px}', 'a{text-decoration:none}'],
})
export class CountriesTableComponent implements OnInit {
  @Input()
  public countries!: Country[];

  ngOnInit(): void {
    if (!this.countries) throw new Error('Countries property is required');
  }
}

import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CountriesService } from '../services/countries.service';
import { Region, SmallCountry } from '../interfaces/country.interfaces';
import { switchMap } from 'rxjs';

@Component({
  selector: 'app-selector-page',
  templateUrl: './selector-page.component.html'
})
export class SelectorPageComponent implements OnInit {

  public countriesByRegion: SmallCountry[] = [];

  public myForm: FormGroup = this.fb.group({
    region : ['', Validators.required ],
    country: ['', Validators.required ],
    border : ['', Validators.required ],
  });


  constructor(
    private fb: FormBuilder,
    private countriesService: CountriesService
  ) {}

  get regions(): Region[] {
    return this.countriesService.regions;
  }

  ngOnInit(): void {
    this.onRegionChanged();
  }


  onRegionChanged(): void {
    this.myForm.get('region')!.valueChanges
      .pipe(
        switchMap( (region) => this.countriesService.getCountriesByRegion(region) ),
      )
      .subscribe( countries => {
      this.countriesByRegion= countries;
      });
  }

}

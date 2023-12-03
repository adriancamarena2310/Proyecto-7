import { Injectable } from '@angular/core';
import { Region, SmallCountry } from '../interfaces/country.interfaces';
import { Observable, of, tap } from 'rxjs';
import { HttpClient, HttpClientModule } from '@angular/common/http';

@Injectable({providedIn: 'root'})


export class CountriesService {

  private _regions: Region[] = [ Region.Africa, Region.Americas, Region.Asia, Region.Europe, Region.Oceania ];
  private baseUrl: string = 'https://restcountries.com/v3.1';

  constructor(private http: HttpClient) { }
  get regions(): Region[] {
    return [ ...this._regions ];
  }

  getCountriesByRegion(region: Region):Observable<SmallCountry[]> {

    if ( !region ) return of([]);

    const url: string = `${ this.baseUrl }/region/${ region }?fields=cca3,name,borders`;

   return  this.http.get<SmallCountry[]>(url)
      .pipe(
        tap(response => console.log({response}))
      )
  }
}

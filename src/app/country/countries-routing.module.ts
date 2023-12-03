import { Router, RouterModule, Routes } from "@angular/router";
import { NgModule } from '@angular/core';
import { SelectorPageComponent } from "./pages/selector-page/selector-page.component";


const routes: Routes = [

  {
    path: '',
    children:[
      {path:'selector', component: SelectorPageComponent},
      {path:'**',redirectTo:'selector'}
    ]
    //loadChildren: () => import('./countries/countries.module').then( m => m.CountriesModule ),
  }

];

@NgModule({
imports:[
RouterModule.forChild(routes)
],
exports:[
RouterModule
]
})
export class CountriesRoutingModule{}

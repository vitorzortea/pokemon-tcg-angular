import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {path:'', loadChildren:()=>import('./modules/pages/home/home.module').then(m=>m.HomeModule)},
  {path:'baralho', loadChildren:()=>import('./modules/pages/baralho/baralho.module').then(m=>m.BaralhoModule)},
  {path:'**', loadChildren:()=>import('./modules/pages/home/home.module').then(m=>m.HomeModule)}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

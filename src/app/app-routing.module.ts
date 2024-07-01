import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {path:'', redirectTo: 'home', pathMatch: 'full'},
  {path:'home', loadChildren:()=>import('./modules/pages/home/home.module').then(m=>m.HomeModule)},
  {path:'baralho', loadChildren:()=>import('./modules/pages/baralho/baralho.module').then(m=>m.BaralhoModule)}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListComponent } from './list/list.component';
import { EditComponent } from './edit/edit.component';
import { ViewComponent } from './view/view.component';

const routes: Routes = [
  {path:'', redirectTo: 'list', pathMatch: 'full'},
  {path:'list', component:ListComponent},
  {path:'new', component:EditComponent},
  {path:'edit/:id', component:EditComponent},
  {path:':id', component:ViewComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BaralhoRoutingModule { }

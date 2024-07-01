import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BaralhoRoutingModule } from './baralho-routing.module';
import { ListComponent } from './list/list.component';
import { IconsComponent } from '../../../shared/icons/icons.component';
import { EditComponent } from './edit/edit.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ViewComponent } from './view/view.component';


@NgModule({
  declarations: [
    ListComponent,
    EditComponent,
    ViewComponent
  ],
  imports: [
    CommonModule,
    BaralhoRoutingModule,
    IconsComponent,
    FormsModule,
    ReactiveFormsModule,
  ]
})
export class BaralhoModule { }

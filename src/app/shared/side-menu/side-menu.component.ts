import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { IconsComponent } from '../icons/icons.component';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-side-menu',
  templateUrl: './side-menu.component.html',
  styleUrl: './side-menu.component.scss',
  standalone:true,
  imports:[CommonModule, IconsComponent, RouterModule ]
})
export class SideMenuComponent {
}
    


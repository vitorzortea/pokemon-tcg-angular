import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { IconsComponent } from '../icons/icons.component';
import { RouterModule } from '@angular/router';
import { itemMenu } from '../../core/model/item-menu';

@Component({
  selector: 'app-side-menu',
  templateUrl: './side-menu.component.html',
  styleUrl: './side-menu.component.scss',
  standalone:true,
  imports:[CommonModule, IconsComponent, RouterModule ]
})
export class SideMenuComponent {
  public itemMenu:itemMenu[] = [
    {
      router: '/',
      icon: 'baralho',
      label: 'Home'
    },
    {
      router: '/baralho',
      icon: 'baralho',
      label: 'Meus Baralhos'
    },
    {
      router: '/baralho/new',
      icon: 'baralhoPlus',
      label: 'Criar Baralho'
    },
  ]

  public socialMenu:itemMenu[]= [
    {
      router:'https://github.com/vitorzortea',
      icon: 'github',
      label: 'Github'
    },
    {
      router:'https://www.linkedin.com/in/vitorzortea/',
      icon: 'linkedin',
      label: 'Linkedin'
    },
    {
      router:'https://www.youtube.com/@vitorzortea',
      icon: 'youtube',
      label: 'Youtube'
    },
  ]
}



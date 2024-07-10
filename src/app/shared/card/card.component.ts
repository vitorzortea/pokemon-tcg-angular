import { CommonModule } from '@angular/common';
import { AfterViewChecked, Component, Input } from '@angular/core';
import { PokemonTCGService } from '../../core/services/pokemontcg.service';
import { Carta } from '../../core/model/carta';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrl: './card.component.scss',
  standalone:true,
  imports:[CommonModule],
})
export class CardComponent implements AfterViewChecked {
  init=false;
  @Input() src!:string;
  @Input() alt!:string;
  constructor(){}
  ngAfterViewChecked(): void { this.init = true; }
}

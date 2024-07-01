import { CommonModule } from '@angular/common';
import { AfterViewChecked, Component, Input, input } from '@angular/core';
import { card } from '../../core/model/card';
import { PokemonTCGService } from '../../core/services/pokemontcg.service';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrl: './card.component.scss',
  standalone:true,
  imports:[CommonModule],
})
export class CardComponent implements AfterViewChecked {
  init=false;
  carta!:card;
  @Input() id:string = '';

  constructor(
    private crud:PokemonTCGService,
  ){
  }

  ngAfterViewChecked(): void {
    if(!this.init){
      this.crud.getID('cards', this.id).subscribe({ next:(e)=>{ this.carta = e.data } })
    }
    this.init = true;
  }

}

import { Component, ChangeDetectorRef, NgZone } from '@angular/core';
import { PokemonTCGService } from '../../../core/services/pokemontcg.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  cartas:{image:string, alt:string }[] = [
    {image:'https://images.pokemontcg.io/ex8/3.png', alt:'carta inicial'},
    {image:'https://images.pokemontcg.io/ex8/2.png', alt:'carta inicial'},
    {image:'https://images.pokemontcg.io/ex8/1.png', alt:'carta inicial'},
    {image:'https://images.pokemontcg.io/ex8/4.png', alt:'carta inicial'},
    {image:'https://images.pokemontcg.io/ex8/5.png', alt:'carta inicial'},
  ];

  constructor(
    private cdr: ChangeDetectorRef,
    private ps: PokemonTCGService,
    private ngZone: NgZone,
  ) { this.loadInitialCards(); }


  loadInitialCards() {
    this.ps.get('cards',
      {
        page: (Math.floor(Math.random()*10)+1),
        pageSize: 50,
      }
    ).subscribe({
      next: (e) => {
        this.cartas=e.data.map((card)=>(
          {
            image: card.images.small,
            alt: card.name,
          }
        )).sort(()=>Math.random()-0.5);
        this.changeCard();
        this.cdr.detectChanges();
      },
    });
  }
  
  changeCard(){
    this.ngZone.runOutsideAngular(()=>{
      setTimeout(()=>{
        this.ngZone.run(()=>{
          this.cartas.sort(
            ()=>Math.random()-0.5
          )
        });
        
        this.changeCard();
      }, 5000);
    });
  }
}
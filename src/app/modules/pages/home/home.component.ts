import { Component, ChangeDetectorRef, NgZone, OnInit, OnDestroy } from '@angular/core';
import { PokemonTCGService } from '../../../core/services/pokemontcg.service';
import { PreviaCarta } from '../../../core/model/previaCarta';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {  
  public cartas:PreviaCarta[] = [];
  private cartasAmostra:PreviaCarta[] = [];
  private paginacao = { page: (Math.floor(Math.random()*10)+1), pageSize: 50};
  
  private abrirTimeout!:NodeJS.Timeout;
  private fecharTimeout!:NodeJS.Timeout;
  private reiniciarTimeout!:NodeJS.Timeout;

  constructor(
    private cdr: ChangeDetectorRef,
    private pokemonTCGService: PokemonTCGService,
    private ngZone: NgZone,
  ) {}

  public ngOnInit(): void {
    this.getCartas();
  }

  private getCartas():void {
    this.pokemonTCGService.get('cards', this.paginacao).subscribe({
      next:(amostra) => {
        this.cartasAmostra = amostra.data.map((card)=>(
          {image:card.images.small, alt:card.name, view:false }
        ));
        this.setCartas();
      },
    });
  }
  
  private setCartas():void{
    this.ngZone.runOutsideAngular(()=>{      
      this.ngZone.run(()=>{

        this.cartas = [...this.cartasAmostra]
          .sort( ()=>Math.random()-0.5 )
          .slice(0, 5);

        this.abrirTimeout = setTimeout(()=>{ this.setCartasView(true); }, 10);
        this.fecharTimeout = setTimeout(()=>{ this.setCartasView(false); }, 4500);

        this.cdr.detectChanges();
      });

      this.reiniciarTimeout = setTimeout(()=>{
        this.clearTimes();
        this.setCartas();
      }, 5000);
    });
  }
  
  private clearTimes():void{
    clearTimeout(this.abrirTimeout);
    clearTimeout(this.fecharTimeout);
    clearTimeout(this.reiniciarTimeout);
  }

  private setCartasView(view:boolean):void { 
    this.cartas.forEach(carta=>{carta.view=view});
  }
  
  public ngOnDestroy():void {
    this.clearTimes();
  }
}
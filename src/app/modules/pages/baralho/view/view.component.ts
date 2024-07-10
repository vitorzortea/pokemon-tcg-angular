import { Component, ViewChild, ViewContainerRef } from '@angular/core';
import { MockapiService } from '../../../../core/services/mockapi.service';
import { ActivatedRoute } from '@angular/router';
import { Baralho } from '../../../../core/model/baralho';
import Swal from 'sweetalert2';
import { CardComponent } from '../../../../shared/card/card.component';
import { Carta } from '../../../../core/model/carta';
import { TypeColors } from '../../../../core/enums/types-color';
import { Tipos } from '../../../../core/model/tipagem';

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrl: './view.component.scss'
})
export class ViewComponent {
  public baralho!:Baralho;
  public cores = TypeColors;
  
  @ViewChild('viewCard',{read:ViewContainerRef }) viewContainerRef!: ViewContainerRef ;

  constructor(
    private activatedRoute:ActivatedRoute,
    private Mockapi:MockapiService,
  ){
    const id = activatedRoute.snapshot.paramMap.get('id') as string;
    this.Mockapi.getID('baralho', id).subscribe({
      next:(e)=>{ this.baralho = e }
    })
  }

  verCarta(carta:Carta){
    this.viewContainerRef.clear();
    const componentRef = this.viewContainerRef.createComponent(CardComponent);
    componentRef.instance.src = carta.images.large;
    componentRef.instance.alt = carta.name;
    const componentElement = componentRef.location.nativeElement;

    Swal.fire({
      html: componentElement,
      showConfirmButton: false,
      showCloseButton: true,
      willClose: () => { componentRef.destroy(); }
    });
  }

  public primeiraCor(baralho:Baralho):Tipos{
    return (baralho?.tipos.length) ? baralho.tipos[0].label : 'Metal';
  }

}

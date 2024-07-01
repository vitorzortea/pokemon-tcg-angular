import { Component, ComponentFactoryResolver, ViewChild, ViewContainerRef } from '@angular/core';
import { MockapiService } from '../../../../core/services/mockapi.service';
import { ActivatedRoute } from '@angular/router';
import { baralho } from '../../../../core/model/baralho';
import Swal from 'sweetalert2';
import { CardComponent } from '../../../../shared/card/card.component';

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrl: './view.component.scss'
})
export class ViewComponent {
  baralho!:baralho;
  
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

  verCarta(id:string){
    this.viewContainerRef.clear();
    const componentRef = this.viewContainerRef.createComponent(CardComponent);
    componentRef.instance.id = id;
    const componentElement = componentRef.location.nativeElement;

    Swal.fire({
      html: componentElement,
      showConfirmButton: false,
      showCloseButton: true,
      willClose: () => { componentRef.destroy(); }
    });
  }

}

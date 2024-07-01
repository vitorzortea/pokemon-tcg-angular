import { Component } from '@angular/core';
import { MockapiService } from '../../../../core/services/mockapi.service';
import { baralho } from '../../../../core/model/baralho';
import { typeColors } from '../../../../core/enums/types-color';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrl: './list.component.scss'
})
export class ListComponent {
  loading = true;
  typeColors = typeColors;
  baralhos:baralho[] = [];
  total:number = 0;
  lastPage:number = 0;
  pag = {limit: 12, page:1};

  constructor(
    //private router:Router,
    private crud:MockapiService,
  ){
    this.loadLit();
  }

  loadLit(){
    this.loading = true;
    this.crud.get('baralho', this.pag).subscribe({
      next:(baralhos)=>{
        this.baralhos = baralhos.items;
        this.total = baralhos.count;
        this.lastPage = Math.ceil(this.total / this.pag.limit);
        this.loading = false;
      },
      error:()=>{},
      complete:()=>{}
    });
  }

  deletarBaralho(id:string){
    Swal.fire({
      title: "Tem certeza que quer deletar esse baralho?",
      showDenyButton: true,
      showCancelButton: false,
      confirmButtonText: "Deletar",
      denyButtonText: `Cancelar`
    }).then((result) => {
      if (result.isConfirmed) {
        this.crud.delete('baralho', id).subscribe({
          next:()=>{
            Swal.fire("Deletado!", "", "success");
            this.loadLit();
          },
          error:(er)=>{
            Swal.fire("Algo Deu errado", er, "error");
            this.loadLit();
          }
        })
      }
    });
  }

  navPage(calc:number){
    this.pag.page = (this.pag.page+calc >= 1 && this.pag.page+calc <= this.lastPage) ? this.pag.page+calc : this.pag.page;
    this.loadLit();
  }
  goPage(page:number){
    this.pag.page = page;
    this.loadLit();
  }
  sizelist(count:number){
    this.pag = {limit: count, page:1};
    this.loadLit();
  }


}

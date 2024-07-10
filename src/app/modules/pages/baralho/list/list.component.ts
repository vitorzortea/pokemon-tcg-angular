import { Component, OnInit } from '@angular/core';
import { MockapiService } from '../../../../core/services/mockapi.service';
import { Baralho } from '../../../../core/model/baralho';
import { TypeColors } from '../../../../core/enums/types-color';
import Swal from 'sweetalert2';
import { Tipos } from '../../../../core/model/tipagem';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrl: './list.component.scss'
})
export class ListComponent implements OnInit{
  public carregandoPagina:boolean = true;

  public cores = TypeColors;
  public listagem:Baralho[] = [];
  public total!:number;
  public ultimaPagina!:number;
  public paginacao={limit: 12, page:1};
  public skeletonNavegacao = [
    {'width': '80px', 'height':'calc(var(--font-size) * 1.2)', 'border-radius':'5px', 'opacity':0.5 },
    {'width': '20px', 'height':'calc(var(--font-size) * 2)', 'border-radius':'5px', 'opacity':0.5 },
    {'width': '20px', 'height':'calc(var(--font-size) * 2)', 'border-radius':'5px', 'opacity':0.5 },
    {'width': '53px', 'height':'calc(var(--font-size) * 2)', 'border-radius':'5px', 'opacity':0.5 },
    {'width': '20px', 'height':'calc(var(--font-size) * 2)', 'border-radius':'5px', 'opacity':0.5 },
    {'width': '20px', 'height':'calc(var(--font-size) * 2)', 'border-radius':'5px', 'opacity':0.5 },
  ]

  constructor( private crud:MockapiService ){}

  public ngOnInit():void { this.getLista(); }

  private getLista():void {
    this.listagem = [];
    this.carregandoPagina = true;
    this.crud.get('baralho', {...this.paginacao, sortBy:'dataCriacao', order:'desc'}).subscribe({
      next:(res)=>{
        this.listagem = res.data;
        this.total = res.totalCount;
        this.ultimaPagina = Math.ceil(this.total / this.paginacao.limit);
        this.carregandoPagina = false;
      },
      error:()=>{
        Swal.fire({
          icon:'error',
          title:'Ops...',
          text: 'Houve um erro ao carregar seus baralhos. Tente novamente mais tarde'
        })
      }
    });
  }

  public avisoDeletar(id:string):void{
    Swal.fire({
      icon:'warning',
      title: 'Tem certeza?',
      text: 'Ao deletar não terá como restaurar.',
      showDenyButton: true,
      showCancelButton: false,
      confirmButtonText: 'Deletar',
      denyButtonText: 'Cancelar'
    }).then((result) => {
      if(result.isConfirmed) { this.deleteItem(id); }
    });
  }

  private deleteItem(id:string):void{
    this.crud.delete('baralho', id).subscribe({
      next:()=>{
        Swal.fire("Bye Bye Butterfree! 🦋", "Baralho deletado com sucesso.", "success");
        this.getLista();
      },
      error:(er)=>{
        Swal.fire("Algo Deu errado", er, "error");
        this.getLista();
      }
    })
  }

  public mudarPaginacao(direcao:number):void{
    console.log(this.paginacao,
      this.paginacao.page+direcao >= 1 && this.paginacao.page+direcao <= this.ultimaPagina,
      this.paginacao.page+direcao >= 1,
      this.paginacao.page+direcao <= this.ultimaPagina,
      this.ultimaPagina
    );
    this.paginacao.page = (this.paginacao.page+direcao >= 1 && this.paginacao.page+direcao <= this.ultimaPagina)
      ? this.paginacao.page+direcao
      : this.paginacao.page;
    this.getLista();
  }

  public mudarPaginaDireta(pagina:number):void{
    this.paginacao.page = pagina;
    this.getLista();
  }

  public mudarTamanhoLista(tamanho:number):void{
    this.paginacao = {limit: tamanho, page:1};
    this.getLista();
  }

  public primeiraCor(baralho:Baralho):Tipos{
    return (baralho?.tipos.length) ? baralho.tipos[0].label : 'Metal';
  }

  public misturarCor(mistura:string, porcentagem:number, tipo: keyof typeof TypeColors):string{
    return `color-mix(in srgb, ${mistura} ${porcentagem}%, ${this.cores[tipo]})`
  }

  get primeiroItem():number{
    return (this.paginacao.limit * this.paginacao.page) - this.paginacao.limit+1;
  }

  get ultimoItem():number{
    return (this.paginacao.limit * this.paginacao.page) - (this.paginacao.limit - this.listagem.length);
  }


}

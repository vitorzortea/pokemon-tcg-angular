import { Component, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MockapiService } from '../../../../core/services/mockapi.service';
import { PokemonTCGService } from '../../../../core/services/pokemontcg.service';
import Swal from 'sweetalert2';
import { RaridadesValor } from '../../../../core/enums/raridades';
import { Carta } from '../../../../core/model/carta';
import { ObjetoNumber, SuperTipos, Tipos } from '../../../../core/model/tipagem';
import { Baralho } from '../../../../core/model/baralho';
import { CardComponent } from '../../../../shared/card/card.component';
import { TypeColors } from '../../../../core/enums/types-color';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrl: './edit.component.scss'
})
export class EditComponent implements OnInit {
  @ViewChild('viewCard',{read:ViewContainerRef }) viewContainerRef!: ViewContainerRef;


  public carregandoPagina:boolean = true;
  public carregandoCartasApi:boolean = true;
  public titulo:string ='Criar'
  


  public form!:FormGroup
  
  public contagemCarta:ObjetoNumber = {};
  public raridades = RaridadesValor;
  private cores = TypeColors;


  public busca:string = '';
  public cartas:Carta[] = [];
  private listSelectPaginator = {page:1, pageSize: 32, q:''};



  constructor(
    private fb: FormBuilder,
    private activatedRoute:ActivatedRoute,
    private Mockapi:MockapiService,
    private CartaService:PokemonTCGService,
    private router:Router,
  ){}

  public ngOnInit(): void {
    this.getCartas();
    
    const id:string|null = this.activatedRoute.snapshot.paramMap.get('id');
    if(id){
      this.getBaralho(id);
      return;
    }

    this.form = this.fb.group({
      nome:['', [Validators.required, Validators.max(120), Validators.min(3)]],
      dataCriacao:[new Date(), [Validators.required]],
      cartas:[[]],
      tipos:[[]],
      superTipos:[[]],
      raridade:[0],
    });
    this.carregandoPagina=false;
  }



  private getBaralho(id:string){
    this.titulo = "Editar"
    this.Mockapi.getID('baralho', id).subscribe({
      next:(baralho)=>{
        this.form = this.fb.group({
          id:[baralho.id, [Validators.required]],
          nome:[baralho.nome, [Validators.required, Validators.max(120), Validators.min(3)]],
          dataCriacao:[new Date(baralho.dataCriacao), [Validators.required]],
          cartas:[baralho.cartas],
          tipos:[baralho.tipos],
          superTipos:[baralho.superTipos],
          raridade:[baralho.raridade]
        });
        console.log(this.form.value);
        
        this.contabilizarBaralho();
        this.carregandoPagina=false;
      }
    })
  }

  private contabilizarBaralho():void{
    const cartas:Carta[] = this.form.value.cartas || [];

    //limitarCartas
    this.contagemCarta = {};
    cartas.forEach((e:Carta)=>{
      this.contagemCarta[e.name] = (this.contagemCarta[e.name] || 0)+1;
    })

    //Raridade
    const raridades:number[] = cartas.map(e=>this.raridades[e.rarity||'Common']) || [];
    const raridade:number = raridades.reduce((a,b)=>a+b, 0)*100/(cartas.length || 1)
    
    console.log('raridade:', raridade);
    this.form.get('raridade')?.setValue(raridade);
    
    //SuperTipos superTipo
    const superTipo = Array
    .from(
      cartas.map(e=>e.supertype)
        .reduce((acc, supertype) => {
          (acc.has(supertype))
            ? acc.set(supertype, acc.get(supertype)! + 1)
            : acc.set(supertype, 1);
          return acc;
        },  new Map<SuperTipos, number>()), 
      ([label, count])=>({label,count})
    );
    this.form.get('superTipos')?.setValue(superTipo);

      


      //Tipos
      const tipos = Array
        .from(
          cartas.filter(e=>e.types?.length)
          .flatMap(e=>e.types)
          .reduce((acc, type) => {
            (acc.has(type))
              ? acc.set(type, acc.get(type)! + 1)
              : acc.set(type, 1);
            return acc;
          },  new Map<Tipos, number>()),
        ([label, count])=>({label,count, cor:this.cores[label]})
      ).sort((a, b) => b.count - a.count);
      this.form.get('tipos')?.setValue(tipos);
  }
  
  getCartas(){
    this.carregandoCartasApi = true;
    this.cartas = [];

    //Parametros de Busca
    this.listSelectPaginator.q = '';
    let _busca = [];
    _busca.push(...Object.entries(this.contagemCarta).filter((e)=>e[1]>=4).flatMap(e=>'-name:"'+e[0]+'"'));
    if(this.busca){ _busca.push('name:"'+this.busca+'*"') }
    this.listSelectPaginator.q = _busca.join(' ');

    
    this.CartaService.get('cards', this.listSelectPaginator).subscribe({
      next:(e)=>{
        this.carregandoCartasApi = false;
        this.cartas = e.data;
      }
    })
  }



  changeinput(){ if(!this.busca){ this.getCartas(); } }

  addCarta(Carta:Carta){
    console.log({Carta, contagemCarta:this.contagemCarta});
    if((this.contagemCarta[Carta.name] | 0) < 4 && this.form.value.cartas.length<60){
      //A CARTA INTEIRA IRIA PESAR O REST, SALVAR SÓ O ID TERÁ MUITOS GETS NO EDIT.//
      //RESOLVI APAGAR AQUI O QUE EU NÃO VOU USARM MAS EM UM SISTEMA REAL NÃO SERIA ASSIM...//
          const _Carta = {
            id: Carta.id,
            name: Carta.name,
            supertype: Carta.supertype,
            types: Carta.types,
            images: Carta.images,
            rarity: Carta.rarity,
          };
          this.form.value.cartas.push(_Carta as Carta);
      //=====================================================================================/
      
      //Conferindo através de um objeto quantos cada nome tem.
      this.contabilizarBaralho();
    }
  }

  addTodasCartas(){
    this.cartas.forEach(e=>{ this.addCarta(e) })
  }

  removerCarta(index:number){
    const Carta = this.form.value.cartas[index];
    this.contagemCarta[Carta.name] = this.contagemCarta[Carta.name]-1;
    if(this.contagemCarta[Carta.name]<=0){ delete this.contagemCarta[Carta.name]; }
    this.form.value.cartas.splice(index, 1);
    this.contabilizarBaralho();
  }
  removeTodasCartas(){
    this.form.get('cartas')?.setValue([]);
    this.contabilizarBaralho();
  }

  submit(){
    this.form.markAllAsTouched();
    if(this.form.value.cartas.length >= 24 && this.form.value.cartas.length <=60){
      if(this.form.valid){
        const _form = this.form.value as Baralho;
        this.Mockapi.save('baralho', _form).subscribe({
          next:()=>{ 
            const acao = (_form.id)?'editado':'salvo';
            Swal.fire({
              icon:'success',
              title:'Feito!', text: 'O Baralho foi '+acao+' com sucesso' })
            .then(()=>{
              this.router.navigate(['/baralho'])
            })
          },
          error:(e)=>{
            Swal.fire({ icon:'error', title:'Ops!', text: 'Algo deu errado, tente novamente mais tarde' })
          },
        });
      }else{
        Swal.fire({ 'icon':'warning', title:'Formulário incorreto', text: 'Todo Baralho deve ter um Título' })
      }

    }else{
      Swal.fire({ 'icon':'warning', title:'Cartas Insuficiente', text: 'O baralho deve ter entre 28 e 60 cartas' })
    }
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



}
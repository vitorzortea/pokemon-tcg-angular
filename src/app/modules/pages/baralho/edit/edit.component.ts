import { Component, ViewChild, ViewContainerRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MockapiService } from '../../../../core/services/mockapi.service';
import { PokemonTCGService } from '../../../../core/services/pokemontcg.service';
import { card } from '../../../../core/model/card';
import { baralho } from '../../../../core/model/baralho';
import { Rarities } from '../../../../core/enums/rarities ';
import { typeColors } from '../../../../core/enums/types-color';
import Swal from 'sweetalert2';
import { CardComponent } from '../../../../shared/card/card.component';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrl: './edit.component.scss'
})
export class EditComponent {
  form:FormGroup
  title='Criar'

  
  @ViewChild('viewCard',{read:ViewContainerRef }) viewContainerRef!: ViewContainerRef ;
  
  cardMax:{[key:string]:number} = {};
  listSelect:card[] = [];
  listSelectPaginator = {page:1, pageSize: 32/*, orderBy:0*/, q:''};
  busca='';
  loadCard = true;

  constructor(
    private fb: FormBuilder,
    private activatedRoute:ActivatedRoute,
    private Mockapi:MockapiService,
    private cardService:PokemonTCGService,
    private router:Router,
  ){
    this.loadCardsAPI();
    this.form = fb.group({
      cor:['#A8A878'],
      name:['', [Validators.required, Validators.max(120), Validators.min(3)]],
      criatedAt:[new Date(), [Validators.required]],
      cartas:[[]],
      tipos:[[]],
      superTipo:[[]],
      raridades:[0],
    });
    const id = this.activatedRoute.snapshot.paramMap.get('id');
    if(id){this.loadForm(id);}
  }

  loadForm(id:string){
    this.title = "Editar"
    this.Mockapi.getID('baralho', id).subscribe({
      next:(e)=>{
        this.form = this.fb.group({
          id:[e.id, [Validators.required]],
          cor:[e.cor],
          name:[e.name, [Validators.required, Validators.max(120), Validators.min(3)]],
          criatedAt:[new Date(e.criatedAt), [Validators.required]],
          cartas:[e.cartas],
          tipos:[e.tipos],
          superTipo:[e.superTipo],
          raridades:[e.raridades]
        });
        console.log(this.form.value);
        
        this.calcDataDeck();
      }
    })
  }
  loadCardsAPI(){
    this.loadCard = true;
    this.listSelect = [];

    //Parametros de Busca
    this.listSelectPaginator.q = '';
    let _busca = [];
    _busca.push(...Object.entries(this.cardMax).filter((e)=>e[1]>=3).flatMap(e=>'-name:"'+e[0]+'"'));
    if(this.busca){ _busca.push('name:"'+this.busca+'*"') }
    this.listSelectPaginator.q = _busca.join(' ');

    
    this.cardService.get('cards', this.listSelectPaginator).subscribe({
      next:(e)=>{
        this.loadCard = false;
        this.listSelect = e.data;
      }
    })
  }
  changeinput(){ if(!this.busca){ this.loadCardsAPI(); } }

  addCard(card:card){
    console.log({card, cardMax:this.cardMax});
    if((this.cardMax[card.name] | 0) < 3 && this.form.value.cartas.length<60){
      //A CARTA INTEIRA IRIA PESAR O REST, SALVAR SÓ O ID TERÁ MUITOS GETS NO EDIT.//
      //RESOLVI APAGAR AQUI O QUE EU NÃO VOU USARM MAS EM UM SISTEMA REAL NÃO SERIA ASSIM...//
          const _card = {
            id: card.id,
            name: card.name,
            supertype: card.supertype,
            types: card.types,
            images: card.images,
            rarity: card.rarity,
          };
          this.form.value.cartas.push(_card as card);
      //=====================================================================================/
      
      //Conferindo através de um objeto quantos cada nome tem.
      this.calcDataDeck();
    }
  }
  addAll(){
    this.listSelect.forEach(e=>{ this.addCard(e) })
  }

  removerCard(index:number){
    const card = this.form.value.cartas[index];
    this.cardMax[card.name] = this.cardMax[card.name]-1;
    if(this.cardMax[card.name]<=0){ delete this.cardMax[card.name]; }
    this.form.value.cartas.splice(index, 1);
  }
  removeall(){
    this.form.get('cartas')?.setValue([]);
    this.calcDataDeck();
  }

  submit(){
    this.form.markAllAsTouched();
    const saved = (acao:string)=>{
      Swal.fire({ icon:'success', title:acao+'!', text: 'O Baralho foi '+acao+' com sucesso' })
      .then(()=>{ this.router.navigate(['/baralho']) })
    }
    const erro = ()=>{
      Swal.fire({ icon:'error', title:'Ops!', text: 'Algo deu errado, tente ovamente' })
    }
    if(this.form.value.cartas.length >= 24 && this.form.value.cartas.length <=60){
      if(this.form.valid){
        const _form = this.form.value as baralho;
        if(_form.id){
          this.Mockapi.put('baralho', _form.id, _form).subscribe({
            next:()=>{ saved('Editado'); },
            error:(e)=>{erro()},
          });
        }else{
          this.Mockapi.post('baralho', _form).subscribe({
            next:()=>{ saved('Salvo'); },
            error:(e)=>{erro()},
          });
        }
      }else{
        Swal.fire({
          'icon':'warning',
          title:'Formulário incorreto',
          text: 'Todo Baralho deve ter um Título'
        })
      }

    }else{
      Swal.fire({
        'icon':'warning',
        title:'Cartas Insuficiente',
        text: 'O baralho deve ter entre 28 e 60 cartas'
      })
    }
  }


  calcDataDeck(){
    this.cardMax = {};
    if(this.form.value.cartas.length){
      const listSelected = this.form.value.cartas as card[];

      //limitarCartas
      this.form.value.cartas.forEach((e:card)=>{
        this.cardMax[e.name] = (this.cardMax.hasOwnProperty(e.name)) ? this.cardMax[e.name]+1 : 0;
      })
      
      //Raridade
      this.form.get('raridades')?.setValue(listSelected.map(e=>Rarities[e.rarity||'Common']?.count).reduce((a,b)=>a+b)*100/listSelected.length);

      //SuperTipos superTipo
      this.form.get('superTipo')?.setValue(listSelected.map(e=>e.supertype).sort().reduce((a,b,i,array)=>{            
        if(array[i-1] == b){
          if(a.length){
            a[a.length-1].count = a[a.length-1].count+1;
          }
          return a
        } else {
          a.push({label:b, count:1});
          return a;
        }
      }, [] as {label:string, count:number}[]).sort((a, b) => b.count - a.count));

      //Tipos
      this.form.get('tipos')?.setValue(listSelected.filter(e=>e.types?.length).flatMap((e:card)=>e.types).sort().reduce((a,b,i,array)=>{
        if(array[i-1] == b){
          if(a.length){
            a[a.length-1].count = a[a.length-1].count+1;
          }
          return a
        } else{
          a.push({label:b, count:1});
          return a;
        }
      }, [] as {label:string, count:number}[]).sort((a, b) => b.count - a.count));
      
      //Cor Predominante
      this.form.get('cor')?.setValue(typeColors[this.form.value.tipos[0]?.label]  || 'var(--primary)');
    }else{
      this.form.get('raridades')?.reset();
      this.form.get('superTipo')?.reset();
      this.form.get('tipos')?.reset();
      this.form.get('cor')?.reset();
    }
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
import { Injectable } from '@angular/core';
import { CrudService } from './crud.service';
import { card, cards } from '../model/card';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PokemonTCGService {
  private api = 'https://api.pokemontcg.io/v2/';
  
  constructor( private CRUD:CrudService<cards,{data:card}> ) {
    this.api = this.api.endsWith('/') ? this.api : `${this.api}/`;
  }

  get(table:string, params?:{[key:string]:any}):Observable<cards>{ return this.CRUD.get(this.api,table,params); }
  
  getID(table:string, id:string, params?:{[key:string]:any}):Observable<{data:card}>{ return this.CRUD.getID(this.api,table,id,params); }
  
  //post(table:string, body:any){ return this.CRUD.post(this.api,table,body); }
  //
  //put(table:string, id:string, body:any){ return this.CRUD.put(this.api,table,id,body); }
  //
  //delete(table:string, id:string){ return this.CRUD.delete(this.api,table,id); }


}
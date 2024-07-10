import { Injectable } from '@angular/core';
import { CrudService } from './crud.service';
import { Carta, CartaAPI } from '../model/carta';
import { Observable } from 'rxjs';
import { Listagem } from '../model/listagem';
import { ObjetoDinamico } from '../model/tipagem';

@Injectable({
  providedIn: 'root'
})
export class PokemonTCGService {
  private api = 'https://api.pokemontcg.io/v2/';
  
  constructor(
    private CRUD:CrudService<any>,
  ) {}

  public get(table:string, params?:ObjetoDinamico):Observable<Listagem<Carta>>{
    return this.CRUD.get(this.api,table,params)
  }
  
  public getID(table:string, id:string, params?:ObjetoDinamico):Observable<CartaAPI>{
    return this.CRUD.getID(this.api,table,id,params) as Observable<CartaAPI>;
  }


}
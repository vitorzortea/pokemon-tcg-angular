import { Injectable } from '@angular/core';
import { CrudService } from './crud.service';
import { Observable } from 'rxjs';
import { Listagem } from '../model/listagem';
import { Baralho } from '../model/baralho';

@Injectable({
  providedIn: 'root'
})
export class MockapiService {
  private api:string = 'https://66802e8656c2c76b495b64a4.mockapi.io/';

  constructor( private CRUD:CrudService<Baralho> ) {}

  public get(table:string, params?:{[key:string]:any}):Observable<Listagem<Baralho>>{
    return this.CRUD.get(this.api,table,params);
  }
  
  public getID(table:string, id:string, params?:{[key:string]:any}):Observable<Baralho>{
    return this.CRUD.getID(this.api,table,id,params);
  }
  
  public save(table:string, body:any):Observable<Object>{
    return this.CRUD.save(this.api,table,body);
  }
  
  public delete(table:string, id:string):Observable<Object>{
    return this.CRUD.delete(this.api,table,id);
  }

}

import { Injectable } from '@angular/core';
import { CrudService } from './crud.service';
import { baralho, baralhos } from '../model/baralho';

@Injectable({
  providedIn: 'root'
})
export class MockapiService {
  private api = 'https://66802e8656c2c76b495b64a4.mockapi.io/';
  constructor( private CRUD:CrudService<baralhos, baralho> ) {
    this.api = this.api.endsWith('/') ? this.api : `${this.api}/`;
  }

  get(table:string, params?:{[key:string]:any}){ return this.CRUD.get(this.api,table,params); }
  
  getID(table:string, id:string, params?:{[key:string]:any}){ return this.CRUD.getID(this.api,table,id,params); }
  
  post(table:string, body:any){ return this.CRUD.post(this.api,table,body); }
  
  put(table:string, id:string, body:any){ return this.CRUD.put(this.api,table,id,body); }
  
  delete(table:string, id:string){ return this.CRUD.delete(this.api,table,id); }


}

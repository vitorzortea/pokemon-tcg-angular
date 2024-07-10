import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable, OnDestroy } from '@angular/core';
import { Observable, Subject, forkJoin, takeUntil } from 'rxjs';
import { Listagem } from '../model/listagem';
import { ObjetoDinamico } from '../model/tipagem';

@Injectable({
  providedIn: 'root'
})
export class CrudService<T extends ObjetoDinamico> implements OnDestroy {
  private httpOption = {headers: new HttpHeaders({'Content-Type': 'application/json'})};
  private destroy$ = new Subject<void>();
  
  constructor( protected http: HttpClient){}

  public get(api:string, table:string, params?:{[key:string]:any}): Observable<Listagem<T>>{
    const httpParams = new HttpParams({ fromObject: params });
    const _httpOption = {...this.httpOption, params: httpParams};
    return this.http.get<Listagem<T>>(`${api}${table}`, _httpOption).pipe(takeUntil(this.destroy$));
  }
  public getID(api:string, table:string, id:string, params?:{[key:string]:any}): Observable<T>{
    const httpParams = new HttpParams({ fromObject: params });
    const _httpOption = {...this.httpOption, params: httpParams};
    return this.http.get<T>(`${api}${table}/${id}`, _httpOption).pipe(takeUntil(this.destroy$));
  }
  public save(api:string, table:string, body:T):Observable<Object>{
    if(body['id']){ return this.put(api, table, body) }
    return this.post(api, table, body)
  }
  private post(api:string, table:string, body:T):Observable<Object>{
    return this.http.post(`${api}${table}`, JSON.stringify(body), this.httpOption).pipe(takeUntil(this.destroy$));
  }
  private put(api:string, table:string, body:T):Observable<Object>{
    return this.http.put(`${api}${table}/${body['id']}`, JSON.stringify(body), this.httpOption).pipe(takeUntil(this.destroy$));
  }
  public delete(api:string, table:string, id:string):Observable<Object>{
    return this.http.delete(`${api}${table}/${id}`, this.httpOption).pipe(takeUntil(this.destroy$));
  }
  public deleteList(api:string, table:string, id:string[]):Observable<Object>{
    //Não utilizei no sistema, fiz essa função para que eu possa ter um feedback dos avaliadores se é uma boa prática
    const deletes = id.map(e=>this.http.delete(`${api}${table}/${e}`, this.httpOption).pipe(takeUntil(this.destroy$)));
    return forkJoin(deletes);
  }

  public ngOnDestroy():void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}


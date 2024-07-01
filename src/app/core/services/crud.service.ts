import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable, OnDestroy } from '@angular/core';
import { Observable, Subject, forkJoin, takeUntil } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CrudService<List, Item> implements OnDestroy {
  private httpOption = {headers: new HttpHeaders({'Content-Type': 'application/json'})};
  private destroy$ = new Subject<void>();
  
  constructor( protected http: HttpClient, ){}

  get(api:string, table:string, params?:{[key:string]:any}): Observable<List>{
    const httpParams = new HttpParams({ fromObject: params });
    const _httpOption = {...this.httpOption, params: httpParams};
    return this.http.get<List>(`${api}${table}`, _httpOption).pipe(takeUntil(this.destroy$));
  }
  getID(api:string, table:string, id:string, params?:{[key:string]:any}): Observable<Item>{
    const httpParams = new HttpParams({ fromObject: params });
    const _httpOption = {...this.httpOption, params: httpParams};
    return this.http.get<Item>(`${api}${table}/${id}`, _httpOption).pipe(takeUntil(this.destroy$));
  }
  post(api:string, table:string, body:Item):Observable<Object>{
    return this.http.post(`${api}${table}`, JSON.stringify(body), this.httpOption).pipe(takeUntil(this.destroy$));
  }
  put(api:string, table:string, id:string, body:Item):Observable<Object>{
    return this.http.put(`${api}${table}/${id}`, JSON.stringify(body), this.httpOption).pipe(takeUntil(this.destroy$));
  }
  delete(api:string, table:string, id:string):Observable<Object>{
    return this.http.delete(`${api}${table}/${id}`, this.httpOption).pipe(takeUntil(this.destroy$));
  }
  deleteList(api:string, table:string, id:string[]):Observable<Object>{
    //Não utilizei no sistema, fiz essa função para que eu possa ter um feedback dos avaliadores se é uma boa prática
    const deletes = id.map(e=>this.http.delete(`${api}${table}/${e}`, this.httpOption).pipe(takeUntil(this.destroy$)));
    return forkJoin(deletes);
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}

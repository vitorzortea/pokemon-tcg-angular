import{a as c,b as m,e as f,h as u,i as p,l as h,o as a,va as d,wa as $,xa as l}from"./chunk-7YPHLG3W.js";var y=(()=>{let r=class r{constructor(t){this.http=t,this.httpOption={headers:new d({"Content-Type":"application/json"})},this.destroy$=new f}get(t,i,e){let o=new $({fromObject:e}),n=m(c({},this.httpOption),{params:o});return this.http.get(`${t}${i}`,n).pipe(p(this.destroy$))}getID(t,i,e,o){let n=new $({fromObject:o}),O=m(c({},this.httpOption),{params:n});return this.http.get(`${t}${i}/${e}`,O).pipe(p(this.destroy$))}save(t,i,e){return e.id?this.put(t,i,e):this.post(t,i,e)}post(t,i,e){return this.http.post(`${t}${i}`,JSON.stringify(e),this.httpOption).pipe(p(this.destroy$))}put(t,i,e){return this.http.put(`${t}${i}/${e.id}`,JSON.stringify(e),this.httpOption).pipe(p(this.destroy$))}delete(t,i,e){return this.http.delete(`${t}${i}/${e}`,this.httpOption).pipe(p(this.destroy$))}deleteList(t,i,e){let o=e.map(n=>this.http.delete(`${t}${i}/${n}`,this.httpOption).pipe(p(this.destroy$)));return u(o)}ngOnDestroy(){this.destroy$.next(),this.destroy$.complete()}};r.\u0275fac=function(i){return new(i||r)(a(l))},r.\u0275prov=h({token:r,factory:r.\u0275fac,providedIn:"root"});let s=r;return s})();var k=(()=>{let r=class r{constructor(t){this.CRUD=t,this.api="https://api.pokemontcg.io/v2/"}get(t,i){return this.CRUD.get(this.api,t,i)}getID(t,i,e){return this.CRUD.getID(this.api,t,i,e)}};r.\u0275fac=function(i){return new(i||r)(a(y))},r.\u0275prov=h({token:r,factory:r.\u0275fac,providedIn:"root"});let s=r;return s})();export{y as a,k as b};

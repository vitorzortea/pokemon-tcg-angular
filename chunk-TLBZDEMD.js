import{a as c,b as $,e as d,h as f,i as o,l as h,o as a,va as u,wa as m,xa as l}from"./chunk-GDMLZSLX.js";var y=(()=>{let e=class e{constructor(t){this.http=t,this.httpOption={headers:new u({"Content-Type":"application/json"})},this.destroy$=new d}get(t,i,s){let r=new m({fromObject:s}),n=$(c({},this.httpOption),{params:r});return this.http.get(`${t}${i}`,n).pipe(o(this.destroy$))}getID(t,i,s,r){let n=new m({fromObject:r}),O=$(c({},this.httpOption),{params:n});return this.http.get(`${t}${i}/${s}`,O).pipe(o(this.destroy$))}post(t,i,s){return this.http.post(`${t}${i}`,JSON.stringify(s),this.httpOption).pipe(o(this.destroy$))}put(t,i,s,r){return this.http.put(`${t}${i}/${s}`,JSON.stringify(r),this.httpOption).pipe(o(this.destroy$))}delete(t,i,s){return this.http.delete(`${t}${i}/${s}`,this.httpOption).pipe(o(this.destroy$))}deleteList(t,i,s){let r=s.map(n=>this.http.delete(`${t}${i}/${n}`,this.httpOption).pipe(o(this.destroy$)));return f(r)}ngOnDestroy(){this.destroy$.next(),this.destroy$.complete()}};e.\u0275fac=function(i){return new(i||e)(a(l))},e.\u0275prov=h({token:e,factory:e.\u0275fac,providedIn:"root"});let p=e;return p})();var k=(()=>{let e=class e{constructor(t){this.CRUD=t,this.api="https://api.pokemontcg.io/v2/",this.api=this.api.endsWith("/")?this.api:`${this.api}/`}get(t,i){return this.CRUD.get(this.api,t,i)}getID(t,i,s){return this.CRUD.getID(this.api,t,i,s)}};e.\u0275fac=function(i){return new(i||e)(a(y))},e.\u0275prov=h({token:e,factory:e.\u0275fac,providedIn:"root"});let p=e;return p})();export{y as a,k as b};

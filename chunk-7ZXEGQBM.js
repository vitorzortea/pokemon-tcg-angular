import{b as y}from"./chunk-A4NXPO5U.js";import{A as h,B as m,C as r,E as p,H as f,I as g,Ja as d,K as C,L as u,M,N as O,O as P,ea as _,la as b,m as a,oa as x,pa as v,q as l,r as o,ua as w}from"./chunk-7YPHLG3W.js";var j=n=>({load:n});function N(n,t){if(n&1&&(O(0),M(1,"img",2),P()),n&2){let s=t.$implicit;m(),g("ngClass",_(3,j,s.view))("src",s.image,h)("alt",s.alt)}}var k=(()=>{let t=class t{constructor(i,e,c){this.cdr=i,this.pokemonTCGService=e,this.ngZone=c,this.cartas=[],this.cartasAmostra=[],this.paginacao={page:Math.floor(Math.random()*10)+1,pageSize:50}}ngOnInit(){this.getCartas()}getCartas(){this.pokemonTCGService.get("cards",this.paginacao).subscribe({next:i=>{this.cartasAmostra=i.data.map(e=>({image:e.images.small,alt:e.name,view:!1})),this.setCartas()}})}setCartas(){this.ngZone.runOutsideAngular(()=>{this.ngZone.run(()=>{this.cartas=[...this.cartasAmostra].sort(()=>Math.random()-.5).slice(0,5),this.abrirTimeout=setTimeout(()=>{this.setCartasView(!0)},10),this.fecharTimeout=setTimeout(()=>{this.setCartasView(!1)},4500),this.cdr.detectChanges()}),this.reiniciarTimeout=setTimeout(()=>{this.clearTimes(),this.setCartas()},5e3)})}clearTimes(){clearTimeout(this.abrirTimeout),clearTimeout(this.fecharTimeout),clearTimeout(this.reiniciarTimeout)}setCartasView(i){this.cartas.forEach(e=>{e.view=i})}ngOnDestroy(){this.clearTimes()}};t.\u0275fac=function(e){return new(e||t)(r(b),r(y),r(p))},t.\u0275cmp=l({type:t,selectors:[["app-home"]],decls:2,vars:1,consts:[["id","banner-cards"],[4,"ngFor","ngForOf"],[3,"ngClass","src","alt"]],template:function(e,c){e&1&&(C(0,"div",0),f(1,N,2,5,"ng-container",1),u()),e&2&&(m(),g("ngForOf",c.cartas))},dependencies:[x,v],styles:['[_nghost-%COMP%]{align-items:center;justify-content:flex-end;background-image:url("./media/trainer-L2DS5PDQ.webp");background-size:contain;background-position:center;background-repeat:no-repeat;overflow:hidden;animation:_ngcontent-%COMP%_trainer .8s forwards linear}[_nghost-%COMP%]   #banner-cards[_ngcontent-%COMP%]{width:100%;display:flex;flex-wrap:wrap;align-items:center;justify-content:center;gap:15px;padding-bottom:100px}[_nghost-%COMP%]   #banner-cards[_ngcontent-%COMP%] > img[_ngcontent-%COMP%]{flex:none;width:125px;max-width:40%;margin-bottom:-100px;box-shadow:2px 2px 6px 1px #250623ad,-2px -2px 6px 1px #ffd7fb80;animation:_ngcontent-%COMP%_cardsFloat 6s infinite 0s alternate ease-in-out;opacity:0;filter:blur(5px);transition:1s opacity,1s filter}[_nghost-%COMP%]   #banner-cards[_ngcontent-%COMP%] > img[_ngcontent-%COMP%]:nth-child(2){animation-duration:5.5s;animation-direction:alternate-reverse}[_nghost-%COMP%]   #banner-cards[_ngcontent-%COMP%] > img[_ngcontent-%COMP%]:nth-child(3){animation-duration:7s}[_nghost-%COMP%]   #banner-cards[_ngcontent-%COMP%] > img[_ngcontent-%COMP%]:nth-child(4){animation-duration:6.5s;animation-direction:alternate-reverse}[_nghost-%COMP%]   #banner-cards[_ngcontent-%COMP%] > img[_ngcontent-%COMP%]:nth-child(5){animation-duration:6.2s}[_nghost-%COMP%]   #banner-cards[_ngcontent-%COMP%] > img.load[_ngcontent-%COMP%]{filter:blur(0px);opacity:1}@keyframes _ngcontent-%COMP%_trainer{0%{background-position:50% 30px;filter:brightness(2) opacity(0)}to{background-position:center;filter:brightness(1) opacity(1)}}@keyframes _ngcontent-%COMP%_cardsFloat{0%{transform:translateY(-8%)}to{transform:translateY(8%)}}@media (max-width: 700px){[_nghost-%COMP%]{top:0;right:0;width:100dvw;height:100dvh;overflow:hidden;position:absolute!important;z-index:1!important;background:transparent}[_nghost-%COMP%]   #banner-cards[_ngcontent-%COMP%]{position:absolute;top:0;right:0;width:60%;height:100%;flex-direction:column;justify-content:space-evenly;transform:skew(-12deg) scale(1.1) translateY(-4%)}[_nghost-%COMP%]   #banner-cards[_ngcontent-%COMP%] > img[_ngcontent-%COMP%]{animation:cardsFloatMobile 6s infinite 0s alternate ease-in-out}[_nghost-%COMP%]   #banner-cards[_ngcontent-%COMP%] > img[_ngcontent-%COMP%]:nth-child(2){animation-duration:5.5s;animation-direction:alternate-reverse}[_nghost-%COMP%]   #banner-cards[_ngcontent-%COMP%] > img[_ngcontent-%COMP%]:nth-child(3){animation-duration:7s}[_nghost-%COMP%]   #banner-cards[_ngcontent-%COMP%] > img[_ngcontent-%COMP%]:nth-child(4){animation-duration:6.5s;animation-direction:alternate-reverse}[_nghost-%COMP%]   #banner-cards[_ngcontent-%COMP%] > img[_ngcontent-%COMP%]:nth-child(5){animation-duration:6.2s}@keyframes cardsFloatMobile{0%{transform:rotate(72deg) scale(1.4,1.7) translateY(40%)}to{transform:rotate(72deg) scale(1.4,1.7) translateY(10%)}}}']});let n=t;return n})();var S=[{path:"",component:k}],F=(()=>{let t=class t{};t.\u0275fac=function(e){return new(e||t)},t.\u0275mod=o({type:t}),t.\u0275inj=a({imports:[d.forChild(S),d]});let n=t;return n})();var Q=(()=>{let t=class t{};t.\u0275fac=function(e){return new(e||t)},t.\u0275mod=o({type:t}),t.\u0275inj=a({imports:[w,F]});let n=t;return n})();export{Q as HomeModule};

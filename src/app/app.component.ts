import { Component, ElementRef } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  rotaAtual:string='';
  constructor(
    private router: Router,
    private el: ElementRef<HTMLElement>,
  ){}
  
  ngOnInit() {
    this.router.events.subscribe({
      next:(e)=>{if(e instanceof NavigationEnd){
        this.rotaAtual=e.url;
        if(this.rotaAtual==='/'||this.rotaAtual==='/home'){
          this.el.nativeElement.classList.add("home")
          this.el.nativeElement.classList.remove("no-home")
        }else{
          this.el.nativeElement.classList.add("no-home")
          this.el.nativeElement.classList.remove("home")
        }
      }}
    });
  }
}

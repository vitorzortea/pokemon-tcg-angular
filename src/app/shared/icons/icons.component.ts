import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, ElementRef, Input, TemplateRef, ViewChild } from '@angular/core';
import { ICONES } from '../../core/model/tipagem';

@Component({
  selector: 'app-icons',
  templateUrl: './icons.component.html',
  styles:`
    :host{
      display: inline-block;
      width: calc(var(--font-size)* 1.2);
      height: calc(var(--font-size)* 1.2);
      margin: var(--margin-icon);
    }
    svg{
      width: 100%;
      height: 100%;
      fill: var(--color);
    }
  `,
  standalone:true,
  imports:[CommonModule],
})
export class IconsComponent implements AfterViewInit {
  [key:string]:any; //Poder selecionar uma Var pelo String

  @Input({required:true}) icon:ICONES = 'default';
  @Input() setStyle: {key:string, value:string}[] = [];
  @Input() setClass:string[] = [];
  styleString:string = '';

  constructor(private el:ElementRef<HTMLElement>){}

  @ViewChild('baralho', { static: true }) baralho: TemplateRef<any> | null = null;
  @ViewChild('baralhoPlus', { static: true }) baralhoPlus: TemplateRef<any> | null = null;
  @ViewChild('carta', { static: true }) carta: TemplateRef<any> | null = null;
  @ViewChild('github', { static: true }) github: TemplateRef<any> | null = null;
  @ViewChild('linkedin', { static: true }) linkedin: TemplateRef<any> | null = null;
  @ViewChild('youtube', { static: true }) youtube: TemplateRef<any> | null = null;
  @ViewChild('whats', { static: true }) whats: TemplateRef<any> | null = null;
  @ViewChild('edit', { static: true }) edit: TemplateRef<any> | null = null;
  @ViewChild('shared', { static: true }) shared: TemplateRef<any> | null = null;
  @ViewChild('delete', { static: true }) delete: TemplateRef<any> | null = null;
  @ViewChild('leftLeft', { static: true }) leftLeft: TemplateRef<any> | null = null;
  @ViewChild('left', { static: true }) left: TemplateRef<any> | null = null;
  @ViewChild('right', { static: true }) right: TemplateRef<any> | null = null;
  @ViewChild('rightRight', { static: true }) rightRight: TemplateRef<any> | null = null;
  @ViewChild('plusCircle', { static: true }) plusCircle: TemplateRef<any> | null = null;
  @ViewChild('minusCircle', { static: true }) minusCircle: TemplateRef<any> | null = null;
  @ViewChild('view', { static: true }) view: TemplateRef<any> | null = null;
  @ViewChild('save', { static: true }) save: TemplateRef<any> | null = null;
  @ViewChild('searchUpdate', { static: true }) searchUpdate: TemplateRef<any> | null = null;
  @ViewChild('noFile', { static: true }) noFile: TemplateRef<any> | null = null;
  @ViewChild('default', { static: true }) default: TemplateRef<any> | null = null;

  ngAfterViewInit(): void {
    //ADiciona style
    this.setStyle.forEach(e=>{ this.el.nativeElement.style.setProperty(e.key, e.value); })

    //Adiciona Classe
    this.setClass.forEach(e=>{ this.el.nativeElement.classList.add(e); })
  }

  getTemplate():TemplateRef<any> { return this[(this.icon as string)] || this.default; }

}
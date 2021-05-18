import { Component, Input, OnInit, SimpleChanges, OnChanges } from '@angular/core';

@Component({
  // tslint:disable-next-line: component-selector
  selector: 'paginator-usuario',
  templateUrl: './usuario-paginator.component.html'
})
export class UsuarioPaginatorComponent implements OnInit, OnChanges {

  @Input() paginador: any;

  paginas: number[];

  desde: number;
  hasta: number;

  constructor() { }

  ngOnInit(): void {
    this.initiPaginator();
  }

  ngOnChanges(changes: SimpleChanges): void {
    let paginadorActualizado = null;

    // tslint:disable-next-line: no-string-literal
    paginadorActualizado = changes['paginador'];

    if (paginadorActualizado.previousValue){
      this.initiPaginator();
    }
  }

  private initiPaginator(): void{
    this.desde = Math.min(Math.max(1, this.paginador.number - 4), this.paginador.totalPages - 5);
    this.hasta = Math.max(Math.min(this.paginador.totalPages, this.paginador.number + 4), 6);

    if (this.paginador.totalPages > 5) {
      this.paginas = new Array(this.hasta - this.desde + 1).fill(0).map((valor, indice) => indice + this.desde);
    } else {
      this.paginas = new Array(this.paginador.totalPages).fill(0).map((valor, indice) => indice + 1);
    }
  }


}

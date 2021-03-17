import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-marcas-producto',
  templateUrl: './marcas-producto.component.html',
  styleUrls: ['./marcas-producto.component.css']
})
export class MarcasProductoComponent implements OnInit {

  public title: string;

  constructor() {
    this.title = "Listado de Marcas de Productos";
   }

  ngOnInit(): void {
  }

}

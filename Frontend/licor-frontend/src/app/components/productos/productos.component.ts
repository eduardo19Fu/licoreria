import { Component, OnInit } from '@angular/core';
import { Producto } from 'src/app/models/producto';

@Component({
  selector: 'app-productos',
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.css']
})
export class ProductosComponent implements OnInit {

  public title: string;

  constructor() {
    this.title = "Listado de Productos";
   }

  ngOnInit(): void {
  }
   

}

import { Component, OnInit } from '@angular/core';
import { Producto } from '../../models/producto';
import { ProductoService } from '../../services/producto.service';

@Component({
  selector: 'app-productos',
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.css'],
  providers: [ProductoService]
})
export class ProductosComponent implements OnInit {

  public title: string;
  public productos: Producto[];

  constructor(
    private productoService: ProductoService
  ) {
    this.title = 'Listado de Productos';
   }

  ngOnInit(): void {
    this.productoService.getProductos().subscribe(
      productos => this.productos = productos,
      error => { }
    );
  }
}

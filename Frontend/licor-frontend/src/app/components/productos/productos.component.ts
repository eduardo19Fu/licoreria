import { Component, OnInit } from '@angular/core';
import { Producto } from '../../models/producto';
import { ProductoService } from '../../services/producto.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-productos',
  templateUrl: './productos.component.html',
  providers: [ProductoService]
})
export class ProductosComponent implements OnInit {

  public title: string;
  public productos: Producto[];

  paginador: any;

  constructor(
    private productoService: ProductoService,
    private activatedRoute: ActivatedRoute
  ) {
    this.title = 'Listado de Productos';
   }

  ngOnInit(): void {
    // tslint:disable-next-line: deprecation
    this.activatedRoute.paramMap.subscribe(params => {
      let page: number = +params.get('page');

      if (!page){
        page = 0;
      }

      this.getProductosPaginados(page);
    });
  }

  getProductos(): void{
    // tslint:disable-next-line: deprecation
    this.productoService.getProductos().subscribe(
      productos => this.productos = productos,
      error => { }
    );
  }

  getProductosPaginados(page: number): void{
    // tslint:disable-next-line: deprecation
    this.productoService.getProductosPaginados(page).subscribe(
      (response: any) => {
        this.productos = response.content as Producto[];
        this.paginador = response;
      }
    );
  }
}

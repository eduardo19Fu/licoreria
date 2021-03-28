import { Component, ElementRef, OnInit } from '@angular/core';
import { Producto } from 'src/app/models/producto';
import { ProductoService } from '../../../services/producto.service';
import { MarcaProductoService } from '../../../services/marca-producto.service';
import { TipoProductoService } from '../../../services/tipo-producto.service';
import { TipoProducto } from 'src/app/models/tipo-producto';
import { MarcaProducto } from '../../../models/marca-producto';

@Component({
  selector: 'app-create-product',
  templateUrl: './create-product.component.html',
  providers: [ProductoService, MarcaProductoService, TipoProductoService]
})
export class CreateProductComponent implements OnInit {

  public title: string;
  public producto: Producto;

  public tipos: TipoProducto[];
  public marcas: MarcaProducto[];

  constructor(
    private serviceMarca: MarcaProductoService,
    private serviceTipo: TipoProductoService,
    private serviceProducto: ProductoService
  ) {
    this.title = 'Registro de Productos';
    this.producto = new Producto();
  }

  ngOnInit(): void {
  }

  create(): void{
  }

  calcularPorcentajeGanancia(): void{
    const pcompra = ((document.getElementById('precio-compra') as HTMLInputElement).value);
    const pventa = (document.getElementById('precio-venta') as HTMLInputElement).value;

    // tslint:disable-next-line: radix
    const porcentaje = ((Number.parseFloat(pventa) - Number.parseFloat(pcompra)) / Number.parseFloat(pcompra)) * 100;

    (document.getElementById('porcentaje-ganancia') as HTMLInputElement).value = porcentaje.toString();
  }

}

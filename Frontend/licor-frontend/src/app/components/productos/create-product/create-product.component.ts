import { Component, ElementRef, OnInit } from '@angular/core';
import { Producto } from 'src/app/models/producto';
import { ProductoService } from '../../../services/producto.service';
import { MarcaProductoService } from '../../../services/marca-producto.service';
import { TipoProductoService } from '../../../services/tipo-producto.service';
import { TipoProducto } from 'src/app/models/tipo-producto';
import { MarcaProducto } from '../../../models/marca-producto';

import swal from 'sweetalert2';
import { Router, ActivatedRoute } from '@angular/router';

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
    private serviceProducto: ProductoService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {
    this.title = 'Registro de Productos';
    this.producto = new Producto();
  }

  ngOnInit(): void {
    this.cargarProducto();
  }

  cargarProducto(): void{
    // tslint:disable-next-line: deprecation
    this.activatedRoute.params.subscribe(params => {
      // tslint:disable-next-line: no-string-literal
      const id = params['id'];

      if (id){
        // tslint:disable-next-line: deprecation
        this.serviceProducto.getProducto(id).subscribe(
          producto => this.producto = producto
        );
      }
    });
  }

  create(): void{
    // tslint:disable-next-line: deprecation
    this.serviceProducto.create(this.producto).subscribe(
      response => {
        this.router.navigate(['/productos']);
        swal.fire('Producto Guardado', `${response.mensaje}: ${response.producto.nombre}`, 'success');
      }
    );
  }

  update(): void{
    // tslint:disable-next-line: deprecation
    this.serviceProducto.update(this.producto).subscribe(
      response => {
        this.router.navigate(['/productos']);
        swal.fire('Producto Actualizado', `${response.mensaje}: ${response.producto.nombre}`, 'success');
      }
    );
  }

  calcularPorcentajeGanancia(): void{
    const pcompra = ((document.getElementById('precio-compra') as HTMLInputElement).value);
    const pventa = (document.getElementById('precio-venta') as HTMLInputElement).value;
    let porcentaje = 0;

    if (!pcompra || !pventa){
      console.log('valores incorrectos');
    } else {
      porcentaje = ((Number.parseFloat(pventa) - Number.parseFloat(pcompra)) / Number.parseFloat(pcompra)) * 100;
    }

    (document.getElementById('porcentaje-ganancia') as HTMLInputElement).value = porcentaje.toString();
  }

}

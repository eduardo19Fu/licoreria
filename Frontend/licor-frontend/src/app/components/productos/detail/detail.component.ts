import { Component, Input, OnInit } from '@angular/core';
import { Producto } from 'src/app/models/producto';
import { ProductoService } from '../../../services/producto.service';
import { HttpEventType } from '@angular/common/http';
import { ModalService } from '../../../services/productos/modal.service';
import { AuthService } from '../../../services/auth.service';

import swal from 'sweetalert2';


@Component({
  // tslint:disable-next-line: component-selector
  selector: 'producto-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css']
})
export class DetailComponent implements OnInit {

  title: string;

  @Input() producto: Producto;

  imagenSeleccionada: File;
  progreso: number;

  constructor(
    public modalService: ModalService,
    private serviceProducto: ProductoService,
    public auth: AuthService
  ) {
    this.title = 'Detalle del Producto';
    this.progreso = 0;
  }

  ngOnInit(): void {
    // this.getProducto();
  }

  /*getProducto(): void {
    // tslint:disable-next-line: deprecation
    this.activatedRoute.paramMap.subscribe(params => {
      let id: number = +params.get('id');

      if (id) {
        // tslint:disable-next-line: deprecation
        this.serviceProducto.getProducto(id).subscribe(
          producto => this.producto = producto
        );
      }
    });
  }*/

  seleccionarImagen(event): void {
    this.imagenSeleccionada = event.target.files[0];
    this.progreso = 0;
    console.log(this.imagenSeleccionada);

    if (this.imagenSeleccionada.type.indexOf('image') < 0) {
      swal.fire('Error: seleccionar imagen', 'El archivo debe de ser de tipo imagen', 'error');
      this.imagenSeleccionada = null;
    }
  }

  subirImagen(): void {

    if (!this.imagenSeleccionada) {
      swal.fire('Error: debe seleccionar una foto.', 'Debe seleccionar una foto', 'error');
    } else {
      // tslint:disable-next-line: deprecation
      this.serviceProducto.uploadImage(this.imagenSeleccionada, this.producto.idProducto).subscribe(
        event => {
          if (event.type === HttpEventType.UploadProgress) {
            this.progreso = Math.round((event.loaded / event.total) * 100);
          } else if (event.type === HttpEventType.Response){
            // tslint:disable-next-line: prefer-const
            let response: any = event.body;

            this.producto = response.producto as Producto;

            this.modalService.notificarUpload.emit(this.producto);
            swal.fire('Imagen ha sido subida con éxito', response.mensaje, 'success');
          }
        }
      );
    }
  }

  cerrarModal(): void{
    this.modalService.cerrarModal();
    this.imagenSeleccionada = null;
    this.progreso = 0;
  }

}

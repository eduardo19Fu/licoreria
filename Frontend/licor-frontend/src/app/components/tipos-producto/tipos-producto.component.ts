import { Component, OnInit } from '@angular/core';
import { TipoProducto } from '../../models/tipo-producto';
import { TipoProductoService } from '../../services/tipo-producto.service';
import swal from 'sweetalert2';

declare var $: any;

@Component({
  selector: 'app-tipos-producto',
  templateUrl: './tipos-producto.component.html',
  providers: [TipoProductoService]
})
export class TiposProductoComponent implements OnInit {

  public title: string;
  public tipos: TipoProducto[];

  swalWithBootstrapButtons = swal.mixin({
    customClass: {
      confirmButton: 'btn btn-success',
      cancelButton: 'btn btn-danger'
    },
    buttonsStyling: true
  });

  constructor(
    private tipoService: TipoProductoService
  ) {
    this.title = 'Listado de Tipos';
  }

  ngOnInit(): void {
    this.getTipos();
    this.cargarDatatable();
  }

  getTipos(): void {
    // tslint:disable-next-line: deprecation
    this.tipoService.getTiposProducto().subscribe(
      tiposProducto => this.tipos = tiposProducto,
      error => {
        if (error) {
          alert(error);
        }
      }
    );
  }

  delete(tipoProducto: TipoProducto): void {
    this.swalWithBootstrapButtons.fire({
      title: '¿Está seguro?',
      text: `¿Seguro que desea eliminar ${tipoProducto.tipoProducto}?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: '¡Si, eliminar!',
      cancelButtonText: '¡No, cancelar!',
      reverseButtons: true
    }).then((result) => {
      if (result.isConfirmed) {

        // tslint:disable-next-line: deprecation
        this.tipoService.delete(tipoProducto.idTipoProducto).subscribe(
          response => {
            this.tipos = this.tipos.filter(cli => cli !== tipoProducto);
            this.swalWithBootstrapButtons.fire(
              '¡Tipo Producto Eliminado!',
              'El registro ha sido eliminado con éxito!',
              'success'
            );
          }
        );
      } else if (
        /* Read more about handling dismissals below */
        result.dismiss === swal.DismissReason.cancel
      ) {
        this.swalWithBootstrapButtons.fire(
          'Proceso Cancelado',
          'El registro no fué eliminado de la base de datos.',
          'error'
        );
      }
    });
  }

  cargarDatatable(): void {
    $(() => {
      $('#tipos-table').DataTable({
        paging: true,
        lengthChange: false,
        searching: true,
        ordering: true,
        info: true,
        autoWidth: false,
      });
    });
  }
}

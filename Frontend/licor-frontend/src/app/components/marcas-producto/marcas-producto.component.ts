import { Component, OnInit, AfterViewInit } from '@angular/core';
import { MarcaProducto } from '../../models/marca-producto';
import { MarcaProductoService } from '../../services/marca-producto.service';
import swal from 'sweetalert2';

declare var $: any;

@Component({
  selector: 'app-marcas-producto',
  templateUrl: './marcas-producto.component.html',
  providers: [MarcaProductoService]
})
export class MarcasProductoComponent implements OnInit {

  public title: string;
  public marcas: MarcaProducto[];

  swalWithBootstrapButtons = swal.mixin({
    customClass: {
      confirmButton: 'btn btn-success',
      cancelButton: 'btn btn-danger'
    },
    buttonsStyling: true
  });

  constructor(
    private marcaService: MarcaProductoService
  ) {
    this.title = 'Listado de Marcas de Productos';
  }
  /*ngAfterViewInit(): void {
    $(document).ready(() => {
      $(() => {
        $('#marcas').DataTable({
          paging: true,
          lengthChange: false,
          searching: true,
          ordering: true,
          info: false,
          autoWidth: false,
        });
      });
    });
  }*/

  ngOnInit(): void {
    this.getMarcas();
  }

  getMarcas(): void{
    // tslint:disable-next-line: deprecation
    this.marcaService.getMarcas().subscribe(
      marcas => this.marcas = marcas
    );
  }

  delete(marcaProducto: MarcaProducto): void{
    this.swalWithBootstrapButtons.fire({
      title: '¿Está seguro?',
      text: `¿Seguro que desea eliminar ${marcaProducto.marca}?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: '¡Si, eliminar!',
      cancelButtonText: '¡No, cancelar!',
      reverseButtons: true
    }).then((result) => {
      if (result.isConfirmed) {

        // tslint:disable-next-line: deprecation
        this.marcaService.delete(marcaProducto.idMarcaProducto).subscribe(
          response => {
            this.marcas = this.marcas.filter(cli => cli !== marcaProducto);
            this.swalWithBootstrapButtons.fire(
              '¡Marca Eliminada!',
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
  }
}

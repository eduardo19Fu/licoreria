import { Component, OnInit } from '@angular/core';
import { TipoProducto } from '../../models/tipo-producto';
import { TipoProductoService } from '../../services/tipo-producto.service';
import { ActivatedRoute } from '@angular/router';
import swal from 'sweetalert2';

@Component({
  selector: 'app-tipos-producto',
  templateUrl: './tipos-producto.component.html',
  providers: [TipoProductoService]
})
export class TiposProductoComponent implements OnInit {

  public title: string;
  public tipos: TipoProducto[];

  paginador: any;

  swalWithBootstrapButtons = swal.mixin({
    customClass: {
      confirmButton: 'btn btn-success',
      cancelButton: 'btn btn-danger'
    },
    buttonsStyling: true
  });

  constructor(
    private tipoService: TipoProductoService,
    private activatedRoute: ActivatedRoute
  ) {
    this.title = 'Listado de Tipos';
  }

  ngOnInit(): void {
    // tslint:disable-next-line: deprecation
    this.activatedRoute.paramMap.subscribe(params => {
      let page: number = +params.get('page');

      if (!page){
        page = 0;
      }

      this.getTiposPage(page);
    });
  }

  // listado de tipos normal
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

  // listado de tipos paginados
  getTiposPage(page: number): void{
    // tslint:disable-next-line: deprecation
    this.tipoService.getTiposPaginados(page).subscribe((response: any) => {
      this.tipos = response.content as TipoProducto[];
      this.paginador = response;
    });
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
}

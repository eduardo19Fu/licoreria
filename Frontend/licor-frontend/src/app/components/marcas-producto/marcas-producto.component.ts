import { Component, OnInit, OnDestroy } from '@angular/core';
import { MarcaProducto } from '../../models/marca-producto';
import { MarcaProductoService } from '../../services/marca-producto.service';
import swal from 'sweetalert2';
import { Subject } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-marcas-producto',
  templateUrl: './marcas-producto.component.html',
  providers: [MarcaProductoService]
})
export class MarcasProductoComponent implements OnInit, OnDestroy {

  public title: string;
  public marcas: MarcaProducto[];

  public paginador: any;

  // Configuracion datatable
  dtOptions: DataTables.Settings = {};
  dtTrigger = new Subject<any>();

  swalWithBootstrapButtons = swal.mixin({
    customClass: {
      confirmButton: 'btn btn-success',
      cancelButton: 'btn btn-danger'
    },
    buttonsStyling: true
  });

  constructor(
    private marcaService: MarcaProductoService,
    private activatedRoute: ActivatedRoute,
    public auth: AuthService
  ) {
    this.title = 'Listado de Marcas de Productos';
  }

  ngOnDestroy(): void {
    // throw new Error('Method not implemented.');
  }

  ngOnInit(): void {
    // tslint:disable-next-line: deprecation
    this.activatedRoute.paramMap.subscribe(params => {
      let page: number = +params.get('page');

      if (!page){
        page = 0;
      }

      this.getMarcas(page);
    });
  }

  getMarcas(page: number): void{
    // tslint:disable-next-line: deprecation
    this.marcaService.getMarcasPage(page).subscribe(
      (response: any) => {
        this.marcas = response.content as MarcaProducto[];
        this.paginador = response;
      });
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

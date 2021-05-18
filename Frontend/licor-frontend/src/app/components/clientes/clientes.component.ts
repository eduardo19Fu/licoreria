import { Component, OnInit } from '@angular/core';
import { Cliente } from 'src/app/models/cliente';
import { ClienteService } from '../../services/cliente.service';
import swal from 'sweetalert2';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
  providers: [ClienteService]
})
export class ClientesComponent implements OnInit {

  public title: string;
  public clientes: Cliente[];

  paginador: any;

  swalWithBootstrapButtons = swal.mixin({
    customClass: {
      confirmButton: 'btn btn-success',
      cancelButton: 'btn btn-danger'
    },
    buttonsStyling: true
  });

  constructor(
    private clienteService: ClienteService,
    private activatedRoute: ActivatedRoute,
    public auth: AuthService
  ) {
    this.title = 'Listado de clientes';
  }

  ngOnInit(): void {
    // tslint:disable-next-line: deprecation
    this.activatedRoute.paramMap.subscribe(params => {
      let page: number = +params.get('page');

      if (!page){
        page = 0;
      }

      this.getClientesPaginados(page);
    });
  }

  getClientes(): void {
    // tslint:disable-next-line: deprecation
    this.clienteService.getClientes().subscribe(
      clientes => this.clientes = clientes,
      error => { }
    );
  }

  getClientesPaginados(page: number): void{
    // tslint:disable-next-line: deprecation
    this.clienteService.getClientesPaginados(page).subscribe((response: any) => {
      this.clientes = response.content as Cliente[];
      this.paginador = response;
    });
  }

  delete(cliente: Cliente): void {
    this.swalWithBootstrapButtons.fire({
      title: '¿Está seguro?',
      text: `¿Seguro que desea eliminar al cliente ${cliente.nombre}?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: '¡Si, eliminar!',
      cancelButtonText: '¡No, cancelar!',
      reverseButtons: true
    }).then((result) => {
      if (result.isConfirmed) {

        // tslint:disable-next-line: deprecation
        this.clienteService.delete(cliente.idCliente).subscribe(
          response => {
            this.clientes = this.clientes.filter(cli => cli !== cliente);
            this.swalWithBootstrapButtons.fire(
              '¡Cliente Eliminado!',
              'El cliente ha sido eliminado con éxito!',
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
          'El cliente no fúe eliminado de la base de datos.',
          'error'
        );
      }
    });
  }

}

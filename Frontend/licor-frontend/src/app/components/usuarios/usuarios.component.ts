import { Component, OnInit } from '@angular/core';
import { UsuarioService } from '../../services/usuario.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Usuario } from '../../models/usuario';

import swal from 'sweetalert2';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styles: [
  ]
})
export class UsuariosComponent implements OnInit {

  title: string;
  usuarios: Usuario[];

  paginador: any;

  swalWithBootstrapButtons = swal.mixin({
    customClass: {
      confirmButton: 'btn btn-success',
      cancelButton: 'btn btn-danger'
    },
    buttonsStyling: true
  });

  constructor(
    private usuarioService: UsuarioService,
    private activatedRoute: ActivatedRoute,
    private authService: AuthService
  ) {
    this.title = 'Listado de Usuarios';
  }

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe(params => {
      let page: number = +params.get('page');

      if (!page) {
        page = 0;
      }

      this.getUsuariosPaginados(page);
    });
  }

  getUsuarios(): void {
    this.usuarioService.getUsuarios().subscribe(usuarios => {
      this.usuarios = usuarios;
    });
  }

  getUsuariosPaginados(page: number): void {
    this.usuarioService.getUsuarioPage(page).subscribe(response => {
      this.usuarios = response.content as Usuario[];
      this.paginador = response;
    });
  }

  delete(usuario: Usuario): void {
    this.swalWithBootstrapButtons.fire({
      title: '¿Está seguro?',
      text: `¿Seguro que desea eliminar el usuario ${usuario.usuario}?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: '¡Si, eliminar!',
      cancelButtonText: '¡No, cancelar!',
      reverseButtons: true
    }).then((result) => {
      if (result.isConfirmed) {

        // tslint:disable-next-line: deprecation
        this.usuarioService.delete(usuario.idUsuario).subscribe(
          response => {
            if (this.authService.usuario.idUsuario === usuario.idUsuario) {
              this.authService.logout();
            } else {
              this.usuarios = this.usuarios.filter(us => us !== usuario);
              this.swalWithBootstrapButtons.fire(
                '¡Usuario eliminado con éxito!',
                'El registro ha sido eliminado con éxito!',
                'success'
              );
            }
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

import { Component, OnInit } from '@angular/core';
import { Usuario } from 'src/app/models/usuario';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

import swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  title: string;
  usuario: Usuario;

  constructor(
    private router: Router,
    private authService: AuthService
  ) {
    this.title = 'Iniciar Sesión';
    this.usuario = new Usuario();
  }

  ngOnInit(): void {
    this.authService.logout();
  }

  login(): void {

    if (this.usuario.usuario == null || this.usuario.password == null) {
      swal.fire('Error en login', 'Usuario y/o contraseña estan vacíos', 'error');
      return;
    }

    this.authService.login(this.usuario).subscribe(
      response => {
        const payload = JSON.parse(atob(response.access_token.split('.')[1]));

        this.authService.guardarUsuario(response.access_token);
        this.authService.guardarToken(response.access_token);

        this.router.navigate(['/home']);
      },
      error => {
        if (error.status === 400) {
          swal.fire('Error de Autenticación', 'Usuario y/o contraseña incorrectos', 'error');
        }
      }
    );
  }

}

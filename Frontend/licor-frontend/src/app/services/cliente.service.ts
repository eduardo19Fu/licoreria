import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { global } from './global';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Cliente } from '../models/cliente';
import swal from 'sweetalert2';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {

  private url: string;
  private headers = new HttpHeaders().set('Content-Type', 'application/json');

  constructor(
    private http: HttpClient,
    private router: Router
  ) {
    this.url = global.url;
  }

  getClientes(): Observable<Cliente[]> {
    return this.http.get<Cliente[]>(`${this.url}/clientes`);
  }

  getCliente(id: number): Observable<Cliente>{
     // método pipe para poder tratar excepciones y errores
    return this.http.get<Cliente>(`${this.url}/clientes/${id}`, { headers: this.headers }).pipe(
        catchError(e => {
          this.router.navigate(['/clientes']);
          swal.fire('Error al editar', e.error.mensaje, 'error');
          return throwError(e);
        })
      );
  }

  create(cliente: Cliente): Observable<any>{
    const params = JSON.stringify(cliente);
    return this.http.post<any>(`${this.url}/clientes`, params, { headers: this.headers }).pipe(
      catchError(e => {
        console.log(e.error.mensaje);
        swal.fire(e.error.mensaje, e.error.error, 'error');
        return throwError(e);
      })
    );
  }

  update(cliente: Cliente): Observable<any>{
    const params = JSON.stringify(cliente);
    return this.http.put<any>(`${this.url}/clientes`, params, { headers: this.headers }).pipe(
      catchError(e => {
        console.log(e.error.mensaje);
        swal.fire(e.error.mensaje, e.error.error, 'error');
        return throwError(e);
      })
    );
  }

  delete(id: number): Observable<Cliente>{
    return this.http.delete<Cliente>(`${this.url}/clientes/${id}`, { headers: this.headers }).pipe(
      catchError(e => {
        console.log(e.error.mensaje);
        swal.fire(e.error.mensaje, e.error.error, 'error');
        return throwError(e);
      })
    );
  }
}

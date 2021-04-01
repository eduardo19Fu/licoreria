import { Injectable } from '@angular/core';
import { global } from '../services/global';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { TipoProducto } from '../models/tipo-producto';
import { catchError } from 'rxjs/operators';
import swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class TipoProductoService {

  private url: string;
  private headers = new HttpHeaders().set('Content-Type', 'application/json');

  constructor(
    private http: HttpClient
  ) {
    this.url = global.url;
  }

  getTiposProducto(): Observable<TipoProducto[]> {
    return this.http.get<TipoProducto[]>(this.url + '/tipos-producto');
  }

  getTipoProducto(id: number): Observable<TipoProducto>{
    return this.http.get<TipoProducto>(`${this.url}/tipos-producto/${id}`, {headers: this.headers}).pipe(
      catchError(e => {
        swal.fire('Error al consultar el tipo deseado', e.error.mensaje, 'error');
        return throwError(e);
      })
    );
  }

  create(tipoProducto: TipoProducto): Observable<any>{
    const params = JSON.stringify(tipoProducto);
    return this.http.post<any>(`${this.url}/tipos-producto`, params, { headers: this.headers }).pipe(
      catchError(e => {
        swal.fire(e.error.mensaje, e.error.error, 'error');
        return throwError(e);
      })
    );
  }

  update(tipoProducto: TipoProducto): Observable<any>{
    const params = JSON.stringify(tipoProducto);
    return this.http.put<any>(`${this.url}/tipos-producto`, params, {headers: this.headers}).pipe(
      catchError(e => {
        swal.fire(e.error.mensaje, e.error.error, 'error');
        return throwError(e);
      })
    );
  }

  delete(id: number): Observable<TipoProducto>{
    return this.http.delete<TipoProducto>(`${this.url}/tipos-producto/${id}`, {headers: this.headers}).pipe(
      catchError(e => {
        swal.fire(e.error.mensaje, e.error.error, 'error');
        return throwError(e);
      })
    );
  }
}

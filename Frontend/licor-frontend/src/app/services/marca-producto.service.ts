import { Injectable } from '@angular/core';
import { DatePipe, formatDate } from '@angular/common';
import { MarcaProducto } from '../models/marca-producto';
import { MARCAS } from '../components/marcas-producto/marcas-producto.json';
import { Observable, of, throwError } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { global } from './global';
import { catchError, map } from 'rxjs/operators';
import swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class MarcaProductoService {

  private url: string;
  private headers = new HttpHeaders().set('Content-Type', 'application/json');

  constructor(
    private http: HttpClient
  ) {
    this.url = global.url;
  }

  getMarcas(): Observable<MarcaProducto[]>{
    // return of(MARCAS);
    return this.http.get<MarcaProducto[]>(this.url + '/marcas').pipe(
      map(response => {
        const marcas = response as MarcaProducto[];
        return marcas.map(marca => {
          const datePipe = new DatePipe('en-US');
          // marca.fechaRegistro = datePipe.transform(marca.fechaRegistro, 'dd-MM-yyyy');
          // formatDate(marca.fechaRegistro, 'dd-MM-yyyy', 'en-US');
          return marca;
        });
      })
    );
  }

  getMarca(id: number): Observable<MarcaProducto>{
    return this.http.get<MarcaProducto>(`${this.url}/marcas/${id}`, { headers: this.headers }).pipe(
      catchError(e => {
        swal.fire('Error al consultar la marca', e.error.mensaje, 'error');
        return throwError(e);
      })
    );
  }

  create(marcaProducto: MarcaProducto): Observable<any>{
    const params = JSON.stringify(marcaProducto);
    return this.http.post<any>(this.url + '/marcas', params, { headers: this.headers }).pipe(
      catchError(e => {
        swal.fire(e.error.mensaje, e.error.error, 'error');
        return throwError(e);
      })
    );
  }

  update(marcaProducto: MarcaProducto): Observable<any>{
    const params = JSON.stringify(marcaProducto);
    return this.http.put<any>(`${this.url}/marcas`, params, {headers: this.headers}).pipe(
      catchError(e => {
        swal.fire(e.error.mensaje, e.error.error, 'error');
        return throwError(e);
      })
    );
  }

  delete(id: number): Observable<MarcaProducto>{
    return this.http.delete<MarcaProducto>(`${this.url}/marcas/${id}`, {headers: this.headers}).pipe(
      catchError(e => {
        swal.fire(e.error.mensaje, e.error.error, 'error');
        return throwError(e);
      })
    );
  }
}

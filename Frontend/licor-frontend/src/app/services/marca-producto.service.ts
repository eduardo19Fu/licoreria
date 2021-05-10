import { Injectable } from '@angular/core';
import { DatePipe, formatDate } from '@angular/common';
import { MarcaProducto } from '../models/marca-producto';
import { MARCAS } from '../components/marcas-producto/marcas-producto.json';
import { Observable, of, throwError } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { global } from './global';
import { catchError, map, tap } from 'rxjs/operators';
import swal from 'sweetalert2';
import { Router } from '@angular/router';
import { AppUnauthorizated } from '../app.unauthorizated';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class MarcaProductoService {

  private url: string;

  constructor(
    private http: HttpClient,
    private router: Router,
    private authService: AuthService
  ) {
    this.url = global.url;
  }

  getMarcas(): Observable<MarcaProducto[]> {
    // return of(MARCAS);
    return this.http.get<MarcaProducto[]>(`${this.url}/marcas`).pipe(
      map(response => {
        const marcas = response as MarcaProducto[];
        return marcas.map(marca => {
          // const datePipe = new DatePipe('en-US');
          // marca.fechaRegistro = datePipe.transform(marca.fechaRegistro, 'dd-MM-yyyy');
          // formatDate(marca.fechaRegistro, 'dd-MM-yyyy', 'en-US');
          return marca;
        });
      })
    );
  }

  getMarcasPage(page: number): Observable<any> {
    return this.http.get(`${this.url}/marcas/page/${page}`).pipe(
      map((response: any) => {
        (response.content as MarcaProducto[]).map(marca => {
          return marca;
        });
        return response;
      })
    );
  }

  getMarca(id: number): Observable<MarcaProducto> {
    return this.http.get<MarcaProducto>(`${this.url}/marcas/${id}`).pipe(
      catchError(e => {
        swal.fire('Error al consultar la marca', e.error.mensaje, 'error');
        return throwError(e);
      })
    );
  }

  create(marcaProducto: MarcaProducto): Observable<any> {
    return this.http.post<any>(`${this.url}/marcas`, marcaProducto).pipe(
      catchError(e => {
        swal.fire(e.error.mensaje, e.error.error, 'error');
        return throwError(e);
      })
    );
  }

  update(marcaProducto: MarcaProducto): Observable<any> {
    return this.http.put<any>(`${this.url}/marcas`, marcaProducto).pipe(
      catchError(e => {
        swal.fire(e.error.mensaje, e.error.error, 'error');
        return throwError(e);
      })
    );
  }

  delete(id: number): Observable<MarcaProducto> {
    return this.http.delete<MarcaProducto>(`${this.url}/marcas/${id}`).pipe(
      catchError(e => {
        swal.fire(e.error.mensaje, e.error.error, 'error');
        return throwError(e);
      })
    );
  }
}

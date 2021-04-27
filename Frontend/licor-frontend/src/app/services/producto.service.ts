import { Injectable } from '@angular/core';
import { HttpClient, HttpEvent, HttpHeaders, HttpRequest } from '@angular/common/http';
import { global } from './global';
import { Observable, throwError } from 'rxjs';
import { Producto } from '../models/producto';
import { catchError, map } from 'rxjs/operators';
import swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class ProductoService {

  private url: string;
  private headers = new HttpHeaders().set('Content-Type', 'application/json');

  constructor(
    private http: HttpClient
  ) {
    this.url = global.url;
  }

  getProductos(): Observable<Producto[]>{
    return this.http.get<Producto[]>(this.url + '/productos', { headers: this.headers });
  }

  getProductosPaginados(page: number): Observable<any>{
    return this.http.get(`${this.url}/productos/page/${page}`, {headers: this.headers}).pipe(
      map((response: any) => {
        (response.content as Producto[]).map(producto => {
          return producto;
        });
        return response;
      })
    );
  }

  getProducto(id: number): Observable<Producto>{
    return this.http.get<Producto>(`${this.url}/productos/${id}`, {headers: this.headers}).pipe(
      catchError(e => {
        swal.fire('Error al consultar el producto', e.error.mensaje, 'error');
        return throwError(e);
      })
    );
  }

  create(producto: Producto): Observable<any>{
    const params = JSON.stringify(producto);
    return this.http.post<any>(`${this.url}/productos`, params, {headers: this.headers}).pipe(
      catchError(e => {
        swal.fire(e.error.mensaje, e.error.error, 'error');
        return throwError(e);
      })
    );
  }

  update(producto: Producto): Observable<any>{
    const params = JSON.stringify(producto);
    return this.http.put<any>(`${this.url}/productos`, params, {headers: this.headers}).pipe(
      catchError(e => {
        swal.fire(e.error.mensaje, e.error.error, 'error');
        return throwError(e);
      })
    );
  }

  // Código original de subida de imagenes para productos
  /*uploadImage(archivo: File, id): Observable<Producto>{
    let formData = new FormData();

    formData.append('file', archivo); // primer parametro es el identificador del request en el backend
    formData.append('id', id);

    return this.http.post(`${this.url}/productos/upload`, formData).pipe(
      map((response: any) => response.producto as Producto),
      catchError(e => {
        swal.fire(e.error.mensaje, e.error.error, 'error');
        return throwError(e);
      })
    );
  }*/

  // Código modificado para agregar barra de progreso
  uploadImage(archivo: File, id): Observable<HttpEvent<{}>> {
    let formData = new FormData();

    formData.append('file', archivo); // primer parametro es el identificador del request en el backend
    formData.append('id', id);

    const req = new HttpRequest('POST', `${this.url}/productos/upload`, formData, {
      reportProgress: true
    });

    return this.http.request(req);
  }
}

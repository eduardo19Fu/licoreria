import { Injectable } from '@angular/core';
import { MarcaProducto } from '../models/marca-producto';
import { MARCAS } from '../components/marcas-producto/marcas-producto.json';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { global } from './global';

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
    return this.http.get<MarcaProducto[]>(this.url + '/marcas');
  }

  create(marcaProducto: MarcaProducto): Observable<MarcaProducto>{
    const params = JSON.stringify(marcaProducto);
    return this.http.post<MarcaProducto>(this.url + '/marcas', params, { headers: this.headers });
  }

  getMarca(id: number): Observable<MarcaProducto>{
    return this.http.get<MarcaProducto>(`${this.url}/marcas/${id}`, { headers: this.headers });
  }

  update(marcaProducto: MarcaProducto): Observable<MarcaProducto>{
    const params = JSON.stringify(marcaProducto);
    return this.http.put<MarcaProducto>(`${this.url}/marcas`, params, {headers: this.headers});
  }

  delete(id: number): Observable<MarcaProducto>{
    return this.http.delete<MarcaProducto>(`${this.url}/marcas/${id}`, {headers: this.headers});
  }
}

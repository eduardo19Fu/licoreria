import { Injectable } from '@angular/core';
import { global } from '../services/global';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TipoProducto } from '../models/tipo-producto';

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

  create(tipoProducto: TipoProducto): Observable<TipoProducto>{
    const params = JSON.stringify(tipoProducto);
    return this.http.post<TipoProducto>(`${this.url}/tipos-producto`, params, { headers: this.headers });
  }

  getTipoProducto(id: number): Observable<TipoProducto>{
    return this.http.get<TipoProducto>(`${this.url}/tipos-producto/${id}`, {headers: this.headers});
  }

  update(tipoProducto: TipoProducto): Observable<TipoProducto>{
    const params = JSON.stringify(tipoProducto);
    return this.http.put<TipoProducto>(`${this.url}/tipos-producto`, params, {headers: this.headers});
  }

  delete(id: number): Observable<TipoProducto>{
    return this.http.delete<TipoProducto>(`${this.url}/tipos-producto/${id}`, {headers: this.headers});
  }
}

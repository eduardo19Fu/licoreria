import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { global } from './global';
import { Observable } from 'rxjs';
import { Producto } from '../models/producto';

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

  create(producto: Producto): Observable<Producto>{
    let params = JSON.stringify(producto);
    return this.http.post<Producto>(this.url + '/productos', params, { headers: this.headers });
  }
}

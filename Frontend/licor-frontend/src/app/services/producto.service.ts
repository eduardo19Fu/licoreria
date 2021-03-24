import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { global } from './global';
import { Observable } from 'rxjs';
import { Producto } from '../models/producto';

@Injectable({
  providedIn: 'root'
})
export class ProductoService {

  private url: string;

  constructor(
    private http: HttpClient
  ) {
    this.url = global.url;
  }

  getProductos(): Observable<Producto[]>{
    return this.http.get<Producto[]>(this.url + '/productos');
  }
}

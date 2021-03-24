import { Injectable } from '@angular/core';
import { global } from '../services/global';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TipoProducto } from '../models/tipo-producto';

@Injectable({
  providedIn: 'root'
})
export class TipoProductoService {

  private url: string;

  constructor(
    private http: HttpClient
  ) {
    this.url = global.url;
  }

  getTiposProducto(): Observable<TipoProducto[]> {
    return this.http.get<TipoProducto[]>(this.url + '/tipos-producto');
  }
}

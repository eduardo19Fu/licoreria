import { Injectable } from '@angular/core';
import { MarcaProducto } from '../models/marca-producto';
import { MARCAS } from '../components/marcas-producto/marcas-producto.json';
import { Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { global } from './global';

@Injectable({
  providedIn: 'root'
})
export class MarcaProductoService {

  private url: string;

  constructor(
    private http: HttpClient
  ) {
    this.url = global.url;
  }

  getMarcas(): Observable<MarcaProducto[]>{
    // return of(MARCAS);
    return this.http.get<MarcaProducto[]>(this.url + '/marcas');
  }
}

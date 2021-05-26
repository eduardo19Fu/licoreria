import { Producto } from './producto';

export class DetalleFactura {

    cantidad = 1;
    subTotal: number;

    producto: Producto;

    public calcularImport(): number{
        return this.producto.precioVenta * this.cantidad;
    }
}

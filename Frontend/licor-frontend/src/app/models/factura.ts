import { Cliente } from './cliente';
import { Estado } from './estado';
import { Usuario } from './usuario';
import { DetalleFactura } from './detalle-factura';

export class Factura {
    idFactura: number;
    noFactura: number;
    total: number;
    fecha: Date;

    estado: Estado;
    usuario: Usuario;
    cliente: Cliente;
    itemsFactura: DetalleFactura[] = [];
}

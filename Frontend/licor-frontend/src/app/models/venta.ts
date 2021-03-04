import { Estado } from './estado';

export class Venta {
    private idVenta: number;
    private noFactura: string;
    private total: number;
    private fecha: Date;
    private idUsuario: number;

    private estado: Estado;

    constructor(){}

    public getIdVenta(): number{
        return this.idVenta;
    }

    // tslint:disable-next-line: typedef
    public setIdVenta(idVenta: number){
        this.idVenta = idVenta;
    }

    public getNoFactura(): string{
        return this.noFactura;
    }

    // tslint:disable-next-line: typedef
    public setNoFactura(noFactura: string){
        this.noFactura = noFactura;
    }

    public getTotal(): number{
        return this.total;
    }

    // tslint:disable-next-line: typedef
    public setTotal(total: number){
        this.total = total;
    }

    public getFecha(): Date{
        return this.fecha;
    }

    // tslint:disable-next-line: typedef
    public setFecha(fecha: Date){
        this.fecha = fecha;
    }

    public getIdUsuario(): number{
        return this.idUsuario;
    }

    // tslint:disable-next-line: typedef
    public setIdUsuario(idUsuario: number){
        this.idUsuario = idUsuario;
    }

    public getEstado(): Estado{
        return this.estado;
    }

    // tslint:disable-next-line: typedef
    public setEstado(estado: Estado){
        this.estado = estado;
    }
}

import { Estado } from './estado';
import { MarcaProducto } from './marca-producto';
import { TipoProducto } from './tipo-producto';

export class Producto {
    idProducto: number;
    codProducto: string;
    nombre: string;
    precioCompra: number;
    precioVenta: number;
    porcentajeGanancia: number;
    fechaVencimiento: Date;
    fechaIngreso: Date;
    fechaRegistro: Date;
    stock: number;
    imagen: string;

    tipoProducto: TipoProducto;
    marcaProducto: MarcaProducto;
    estado: Estado;

    constructor(){}
/*
    public getIdProducto(): number{
        return this.idProducto;
    }
    // tslint:disable-next-line: typedef
    public setIdProducto(idProducto: number){
        this.idProducto = idProducto;
    }

    public getCodProducto(): string{
        return this.codProducto;
    }
    // tslint:disable-next-line: typedef
    public setCodProducto(codProducto: string){
        this.codProducto = codProducto;
    }

    public getNombre(): string{
        return this.nombre;
    }
    // tslint:disable-next-line: typedef
    public setNombre(nombre: string){
        this.nombre = nombre;
    }

    public getPrecioCompra(): number{
        return this.precioCompra;
    }
    // tslint:disable-next-line: typedef
    public setPrecioCompra(precioCompra: number){
        this.precioCompra = precioCompra;
    }

    public getPrecioVenta(): number{
        return this.precioVenta;
    }
    // tslint:disable-next-line: typedef
    public setPrecioVenta(precioVenta: number){
        this.precioVenta = precioVenta;
    }

    public getPorcentajeGanancia(): number{
        return this.porcentajeGanancia;
    }
    // tslint:disable-next-line: typedef
    public setPorcentajeGanancia(porcentajeGanancia: number){
        this.porcentajeGanancia = porcentajeGanancia;
    }

    public getFechaVenicimiento(): Date{
        return this.fechaVencimiento;
    }
    // tslint:disable-next-line: typedef
    public setFechaVencimiento(fechaVencimiento: Date){
        this.fechaVencimiento = fechaVencimiento;
    }

    public getStock(): number{
        return this.stock;
    }
    // tslint:disable-next-line: typedef
    public setStock(stock: number){
        this.stock = stock;
    }

    public getTipoProducto(): TipoProducto{
        return this.tipoProducto;
    }
    // tslint:disable-next-line: typedef
    public setTipoProducto(tipoProducto: TipoProducto){
        this.tipoProducto = tipoProducto;
    }

    public getMarcaProducto(): MarcaProducto{
        return this.marcaProducto;
    }
    // tslint:disable-next-line: typedef
    public setMarcaProducto(marcaProducto: MarcaProducto){
        this.marcaProducto = marcaProducto;
    }

    public getEstado(): Estado{
        return this.estado;
    }
    // tslint:disable-next-line: typedef
    public setEstado(estado: Estado){
        this.estado = estado;
    }
*/
}

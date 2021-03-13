export class Cliente {

    private idCliente: number;
    private nombre: string;
    private nit: string;
    private direccion: string;

    constructor() { }

    public getIdCliente(): number {
        return this.idCliente;
    }

    public setIdCliente(idCliente: number) {
        this.idCliente = idCliente;
    }

    public getNombre(): string {
        return this.nombre;
    }

    public setNombre(nombre: string) {
        this.nombre = nombre;
    }

    public getNit(): string {
        return this.nit;
    }

    public setNit(nit: string) {
        this.nit = nit;
    }

    public getDireccion(): string {
        return this.direccion;
    }

    public setDireccion(direccion: string) {
        this.direccion = direccion;
    }
}

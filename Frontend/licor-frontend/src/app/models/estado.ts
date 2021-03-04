export class Estado {
    private idEstado: number;
    private estado: string;

    constructor(){}

    public getIdEstado(): number{
        return this.idEstado;
    }
    // tslint:disable-next-line: typedef
    public setIdEstado(idEstado: number){
        this.idEstado = idEstado;
    }

    public getEstado(): string{
        return this.estado;
    }
    // tslint:disable-next-line: typedef
    public setEstado(estado: string){
        this.estado = estado;
    }
}

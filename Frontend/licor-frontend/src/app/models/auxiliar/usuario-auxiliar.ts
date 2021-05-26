import { Role } from '../role';

export class UsuarioAuxiliar {

    idUsuario: number;
    usuario: string;
    password: string;
    primerNombre: string;
    segundoNombre: string;
    apellido: string;
    enabled: boolean;
    fechaRegistro: Date;

    roles: Role[] = [];
}

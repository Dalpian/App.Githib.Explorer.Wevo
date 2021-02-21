export class User {
    id: string;
    nome: string;
    cpf: string;
    email: string;
    telefone: string;
    sexo: string;
    dataNascimento: Date;
    userGithub: string;

    constructor() {
this.id = '';
this.nome = '';
this.cpf = '';
this.email = '';
this.telefone = '';
this.sexo = '';
this.dataNascimento = null;
this.userGithub = '';
     }
}
import ContatoModel from "@/types/Contato.model";

export default interface PessoaModel {
    id: number;
    nome: string;
    cpf: string;
    dataNascimento: string;
    contatos: ContatoModel[];
}
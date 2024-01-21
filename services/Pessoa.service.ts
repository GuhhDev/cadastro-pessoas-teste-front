import Service from "@/core/service";
import PessoaModel from "@/types/Pessoa.model";

export class PessoaService extends Service {

    static getPessoaById(id: string |string[]) {
        return this.http.get<PessoaModel[]>(`/pessoas/${id}`);
    }

    static listarPessoas() {
        return this.http.get<PessoaModel[]>('/pessoas/listar');
    }

    static cadastrarPessoa(pessoa: PessoaModel) {
        return this.http.post<PessoaModel>('/pessoas/criar', pessoa);
    }

    static atualizarPessoa(pessoa: PessoaModel) {
        return this.http.put<PessoaModel>('/pessoas/atualizar', pessoa);
    }

    static excluirPessoa(id: number) {
        return this.http.delete(`/pessoas/deletar/${id}`);
    }
}
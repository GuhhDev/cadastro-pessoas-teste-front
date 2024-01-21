import {useEffect, useState} from "react";
import ContatoModel from "@/types/Contato.model";
import PessoaModel from "@/types/Pessoa.model";
import {PessoaService} from "@/services/Pessoa.service";
import ReactPaginate from 'react-paginate';

export default function Listagem() {
    const [pessoas, setPessoas] = useState<PessoaModel[]>([]);
    const [contatoPopup, setContatoPopup] = useState<ContatoModel[]>([]);

    const itemsPerPage = 5;
    const [currentPage, setCurrentPage] = useState(0);

    const handlePageClick = (data: any) => {
        setCurrentPage(data.selected);
    };

    const startIndex = currentPage * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const pessoasPaginadas = pessoas.slice(startIndex, endIndex);

    const mostrarPopup = (contatos: any) => {
        if (contatoPopup.length > 0) {
            fecharPopup();
        } else {
            setContatoPopup(contatos);
        }
    };

    const fecharPopup = () => {
        setContatoPopup([]);
    };

    const excluirPessoa = (pessoa: PessoaModel) => {
        PessoaService.excluirPessoa(pessoa.id).then(() => {
            PessoaService.listarPessoas().then((res) => {
                setPessoas(res.data);
            }).catch(() => {
                setPessoas([]);
            })
        });
    };

    useEffect(() => {
        PessoaService.listarPessoas().then((res) => {
            setPessoas(res.data);
        }).catch(() => {
            setPessoas([]);
        })
    }, []);

    return (
        <div className="text-black table-container px-10">
            <h2 className="text-3xl font-bold mb-4 p-[2%]">Pessoas Cadastradas:</h2>
            <table className="table table-auto text-lg border border-black rounded-xl">
                <thead className="bg-gray-100 text-black">
                <tr className="text-lg divide-x">
                    <th className="text-left border-black border-y">Nome</th>
                    <th className="text-left border-black border-y">CPF</th>
                    <th className="text-left border-black border-y">Data de Nascimento</th>
                    <th className="text-left border-black border-y">Ações</th>
                </tr>
                </thead>
                <tbody>
                {pessoasPaginadas.map((pessoa) => (
                    <tr key={pessoa.id}>
                        <td className="text-left truncate">{pessoa.nome}</td>
                        <td className="text-left truncate">{pessoa.cpf}</td>
                        <td className="text-left truncate">{pessoa.dataNascimento}</td>

                        <td className="text-left">
                            <div className="flex flex-col space-y-2">
                                <button className="btn btn-info  text-white"
                                        onClick={() => mostrarPopup(pessoa.contatos)}>
                                    Ver Detalhes
                                </button>

                                <button className="btn btn-error  text-white"
                                        onClick={() => excluirPessoa(pessoa)}>
                                    Excluir
                                </button>
                            </div>
                        </td>
                    </tr>
                ))}
                {pessoas.length === 0 && (
                    <tr className="text-lg font-semibold text-gray-700">
                        <td colSpan={4} className="text-center py-2 px-4">Nenhuma pessoa cadastrada.</td>
                    </tr>
                )}
                </tbody>
            </table>

            <div>
                <ReactPaginate
                    className="flex justify-center space-x-4 text-xl pt-2"
                    previousLabel={'Anterior'}
                    nextLabel={'Próximo'}
                    breakLabel={'...'}
                    pageCount={Math.ceil(pessoas.length / itemsPerPage)}
                    marginPagesDisplayed={2}
                    pageRangeDisplayed={5}
                    onPageChange={handlePageClick}
                    containerClassName={'pagination'}
                    activeClassName={'active'}
                />
            </div>


            <div className="pt-2">
                {contatoPopup.length > 0 && (
                    <label className="top-0 left-0 w-full h-full cursor-default" onClick={fecharPopup}/>
                )}
                {contatoPopup.length > 0 && (
                    <div className="p-2 bg-white border border-black/25">
                        {contatoPopup.map((contato, index) => (
                            <div key={index}>
                                <h3 className="text-lg font-bold py-2">{contato.nome}</h3>
                                <p className="p-1">Telefone: {contato.telefone}</p>
                                <p className="p-1">Email: {contato.email}</p>
                                <hr className="my-3.5"/>
                            </div>
                        ))}
                        <div className="py-3.5 text-right pr-9">
                            <button className="btn bg-gray-500 text-white border-none" onClick={fecharPopup}>
                                Fechar
                            </button>
                        </div>
                    </div>
                )}
            </div>


            <div className="pt-10 text-right">
                <a href={"/cadastro-pessoa"} className="btn text-white btn-success">
                    Cadastrar
                </a>
            </div>
        </div>
    );
}
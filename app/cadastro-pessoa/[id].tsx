// pages/cadastro-pessoa/[id].js
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import PessoaModel from "@/types/Pessoa.model";

const EditarPessoa = () => {
    const router = useRouter();
    const { id } = router.query;
    const [pessoa, setPessoa] = useState<PessoaModel>();

    const buscarDetalhesDaPessoa = async () => {
        try {
            const response = await fetch(`/api/pessoas/${id}`);
            const data = await response.json();
            setPessoa(data);
        } catch (error) {
            console.error('Erro ao buscar detalhes da pessoa:', error);
        }
    };

    useEffect(() => {
        if (id) {
            buscarDetalhesDaPessoa();
        }
    }, [id]);

    const handleAtualizar = async () => {
        // Lógica para enviar os dados atualizados para a API
        try {
            const response = await fetch(`/api/pessoas/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(pessoa),
            });

            if (response.ok) {
                console.log('Pessoa atualizada com sucesso!');
                // Redirecione para a página inicial ou outra página após a atualização
                router.push('/');
            } else {
                console.error('Erro ao atualizar pessoa:', response.statusText);
            }
        } catch (error) {
            console.error('Erro ao atualizar pessoa:', error);
        }
    };

    return (
        <div>
            <h2>Editar Pessoa</h2>
            <label>Nome:</label>
            <input
                type="text"
                value={pessoa?.nome || ''}
                onChange={(e) => setPessoa({ ...pessoa, nome: e.target.value })}
            />
            {/* Outros campos do formulário */}
            <button onClick={handleAtualizar}>Atualizar</button>
        </div>
    );
};

export default EditarPessoa;

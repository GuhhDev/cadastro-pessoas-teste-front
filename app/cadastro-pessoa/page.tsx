'use client';
import React, {useState} from 'react';
import {Field, FieldArray, Form, Formik} from 'formik';
import {Box, Button, TextField,} from '@mui/material';
import {PessoaService} from "@/services/Pessoa.service";
import * as Yup from 'yup';
import ModalPopup from "@/components/sections/ModalPopup";

const InputSchema = Yup.object({
    nome: Yup.string()
        .min(2, 'Muito curto!')
        .max(50, 'Muito longo!')
        .matches(/^[^\d]+$/, 'O nome não pode conter números'),

    cpf: Yup.string()
        .matches(/^\d{3}\.\d{3}\.\d{3}-\d{2}$/, 'Formato inválido. Use o formato 999.999.999-99'),

    dataNascimento: Yup.string().max(new Date(), 'Você não pode colocar uma data futura!').matches(
        /^\d{4}-\d{2}-\d{2}$/,
        'Formato de data inválido. Exemplo: YYYY-MM-DD.')

});


// @ts-ignore
const ContatoForm = ({index, arrayHelpers}) => (
    <div className="pb-3">
        <Box key={index} className="space-y-3 border p-5 bg-blue-400">

            <div className="pt-2">
                <label className="pt-2" htmlFor={`contatos[${index}].nome`}>Nome do Contato:</label>
                <Field required className="px-4 rounded-md bg-white text-black" type="text"
                       name={`contatos[${index}].nome`}
                       as={TextField} fullWidth/>
            </div>

            <div className="pt-2">
                <label className="pt-10" htmlFor={`contatos[${index}].telefone`}>Telefone:</label>
                <Field required className="rounded-md bg-white text-black" type="tel"
                       name={`contatos[${index}].telefone`}
                       as={TextField} fullWidth/>
            </div>

            <div className="pt-2">
                <label htmlFor={`contatos[${index}].email`}>Email:</label>
                <Field required className="rounded-md bg-white text-black" type="email"
                       name={`contatos[${index}].email`}
                       as={TextField} fullWidth/>
            </div>

            <div className="text-right">
                <Button type="button" onClick={() => arrayHelpers.remove(index)} variant="contained" color="error">
                    Remover Contato
                </Button>
            </div>
        </Box>
    </div>
);

export default function CadastroPessoa() {

    const [isSuccessModalOpen, setSuccessModalOpen] = useState(false);
    const [isErrorModalContatoLength, setErrorModalContatoLength] = useState(false);
    const [isErrorModalOpen, setErrorModalOpen] = useState(false);


    const enviarDados = async (values: any) => {

        try {
            await PessoaService.cadastrarPessoa(values);

            setSuccessModalOpen(true);

        } catch (error) {
            if (values.contatos.length === 0) {
                setErrorModalContatoLength(true);
            } else {
                setErrorModalOpen(true);
            }
        }
    };

    const handleCloseSuccessModal = () => setSuccessModalOpen(false);
    const handleCloseErrorModal = () => setErrorModalOpen(false);
    const handleCloseErrorModalContato = () => setErrorModalContatoLength(false);

    return (
        <>
            <Formik initialValues={{nome: '', cpf: '', dataNascimento: '', contatos: []}}
                    validationSchema={InputSchema}
                    onSubmit={(values) => {
                        enviarDados(values);
                    }}>
                {(formikProps) => (
                    <div
                        className="min-h-screen flex items-center justify-center bg-gradient-to-tr from-blue-500 via-blue-200 to-blue-400">
                        <div className="w-full max-w-xl p-10 my-16 shadow-2xl rounded-md bg-blue-500/75">
                            <h3 className="text-3xl font-bold text-center mb-8">Cadastro de Pessoa</h3>
                            <Form>
                                <div className="mb-4">
                                    <label className="pt-2">Nome:</label>
                                    <Field type="text"
                                           name="nome"
                                           required
                                           className="w-full px-4 py-2 rounded-md bg-white text-black"/>
                                    {formikProps.errors.nome ? (
                                        <div>{formikProps.errors.nome}</div>
                                    ) : null}
                                </div>

                                <div className="mb-4">
                                    <label className="pt-2">CPF:</label>

                                    <Field
                                        type="text"
                                        name="cpf"
                                        required
                                        className="w-full px-4 py-2 rounded-md bg-white text-black"/>
                                    {formikProps.errors.cpf ? (
                                        <div>{formikProps.errors.cpf}</div>
                                    ) : null}
                                </div>


                                <div className="mb-4">
                                    <label className="pt-2">Data de nascimento:</label>
                                    <Field
                                        type="text"
                                        name="dataNascimento"
                                        placeholder="aaaa-mm-dd"
                                        required
                                        className="w-full px-4 py-2 rounded-md bg-white text-black"
                                    />
                                    {formikProps.errors.dataNascimento ? (
                                        <div>{formikProps.errors.dataNascimento}</div>
                                    ) : null}
                                </div>

                                <FieldArray name="contatos">
                                    {(arrayHelpers) => (
                                        <div>
                                            {formikProps.values.contatos.map((contato, index) => (
                                                <ContatoForm key={index} index={index} arrayHelpers={arrayHelpers}/>
                                            ))}
                                            <div className="flex justify-between">
                                                <a href={'/'}
                                                   className="btn btn-success text-white font-semibold text-md">
                                                    Voltar
                                                </a>
                                                <button
                                                    type="button"
                                                    onClick={() => arrayHelpers.push({
                                                        nome: '',
                                                        telefone: '',
                                                        email: ''
                                                    })}
                                                    className="btn btn-info text-white font-semibold text-md">
                                                    Novo Contato
                                                </button>
                                                <button type="submit"
                                                        className="btn btn-success text-white font-semibold text-md">
                                                    Enviar
                                                </button>
                                            </div>
                                        </div>
                                    )}
                                </FieldArray>

                                <div className="flex">

                                </div>
                            </Form>
                        </div>
                    </div>
                )}
            </Formik>

            <ModalPopup
                isOpen={isSuccessModalOpen}
                onClose={handleCloseSuccessModal}
                message="Cadastro realizado com sucesso!"
            />
            <ModalPopup
                isOpen={isErrorModalContatoLength}
                onClose={handleCloseErrorModalContato}
                message="É necessário pelo menos um contato vinculado para cadastrar."
            />

            <ModalPopup
                isOpen={isErrorModalOpen && !isErrorModalContatoLength}
                onClose={handleCloseErrorModal}
                message="Erro ao cadastrar pessoa. Por favor, tente novamente."
            />
        </>

    );
};
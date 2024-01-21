import React from 'react';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faTimes} from "@fortawesome/free-solid-svg-icons";

const Contato = ({contato, onRemove, onChange}: any) => {

    return (
        <div className="mb-4 border p-5 rounded-xl bg-blue-300/25">
            <div className="text-end">
                <button type="button" onClick={onRemove} className="ml-2 text-red-600 focus:outline-none">

                    <FontAwesomeIcon icon={faTimes}/>
                </button>
            </div>
            <label htmlFor={`nomeContato${contato.index}`} className="block text-sm pb-1">
                Nome do Contato:
            </label>
            <div className="mb-4">
                <input
                    type="text"
                    placeholder="Nome:"
                    id={`nomeContato${contato.index}`}
                    name="nomeContato"
                    defaultValue={contato.nome}
                    onChange={onChange}
                    required
                    className="w-full px-4 py-2 rounded-md bg-white text-black input"
                />
            </div>

            <label htmlFor={`telefoneContato${contato.index}`} className="text-sm pt-2 pb-2">Telefone
                do Contato:</label>
            <div className="mb-4">
                <input
                    type="tel"
                    placeholder="Telefone:"
                    id="telefoneContato"
                    name="telefoneContato"
                    value={contato.telefone}
                    onChange={contato.onChange}
                    required
                    className="w-full px-4 py-2 rounded-md bg-white text-black input"
                />
            </div>

            <label htmlFor={`emailContato${contato.index}`} className="text-sm pt-2 pb-2">Email
                do Contato:</label>
            <div className="flex items-center mt-2">
                <input
                    type="email"
                    id={`emailContato${contato.index}`}
                    name="email"
                    value={contato.email}
                    onChange={contato.onChange}
                    required
                    className="w-full px-4 py-2 rounded-md bg-white text-black input"
                />
            </div>
        </div>
    );
};

export default Contato;

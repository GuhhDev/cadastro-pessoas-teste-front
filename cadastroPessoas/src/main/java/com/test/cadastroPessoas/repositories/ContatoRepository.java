package com.test.cadastroPessoas.repositories;

import com.test.cadastroPessoas.entities.Pessoa;
import org.springframework.data.repository.CrudRepository;

public interface PessoaRepository extends CrudRepository<Pessoa, Long> {
}

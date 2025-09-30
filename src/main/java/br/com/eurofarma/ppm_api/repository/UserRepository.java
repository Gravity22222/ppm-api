package br.com.eurofarma.ppm_api.repository;

import br.com.eurofarma.ppm_api.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Integer> {
    // Método para buscar um usuário pelo seu nome de usuário
    Optional<User> findByUsername(String username);
}
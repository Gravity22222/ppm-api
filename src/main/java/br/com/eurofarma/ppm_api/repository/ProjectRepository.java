package br.com.eurofarma.ppm_api.repository;

import br.com.eurofarma.ppm_api.model.Project;
import org.springframework.data.jpa.repository.JpaRepository;

// Passamos o Modelo (Project) e o tipo da Chave Primária (Long)
public interface ProjectRepository extends JpaRepository<Project, Long> {
    // A mágica acontece aqui! Spring vai implementar todos os métodos CRUD pra nós.
}

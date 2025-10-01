package br.com.eurofarma.ppm_api.repository;

import br.com.eurofarma.ppm_api.model.Project;
import org.springframework.data.jpa.repository.JpaRepository;


public interface ProjectRepository extends JpaRepository<Project, Long> {
    
}

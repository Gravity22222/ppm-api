package br.com.eurofarma.ppm_api.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import br.com.eurofarma.ppm_api.model.Project;
import br.com.eurofarma.ppm_api.repository.ProjectRepository;

import java.util.List;
    @RestController
@RequestMapping("/api/projects")
@CrossOrigin(origins = "http://localhost:3000") // IMPORTANTE! Permite que nosso frontend (que rodará na porta 3000) acesse esta API.
public class ProjectController {

    @Autowired
    private ProjectRepository projectRepository;

    // Endpoint para listar todos os projetos
    @GetMapping
    public List<Project> listAll() {
        return projectRepository.findAll();
    }

        @PostMapping
    public Project create(@RequestBody Project project) {
        // A anotação @RequestBody pega o JSON enviado no corpo da requisição
        // e o transforma em um objeto Project automaticamente.
        return projectRepository.save(project);
    }
        // GET by ID - Para buscar um projeto específico
    @GetMapping("/{id}")
    public ResponseEntity<Project> getById(@PathVariable Long id) {
        return projectRepository.findById(id)
                .map(ResponseEntity::ok) // Se encontrar, retorna 200 OK com o projeto
                .orElse(ResponseEntity.notFound().build()); // Se não, retorna 404 Not Found
    }

    // PUT - Para atualizar um projeto existente
    @PutMapping("/{id}")
    public ResponseEntity<Project> update(@PathVariable Long id, @RequestBody Project projectDetails) {
        return projectRepository.findById(id)
                .map(project -> {
                    project.setName(projectDetails.getName());
                    project.setDescription(projectDetails.getDescription());
                    project.setResponsible(projectDetails.getResponsible());
                    project.setStatus(projectDetails.getStatus());
                    project.setStartDate(projectDetails.getStartDate());
                    project.setEndDate(projectDetails.getEndDate());
                    Project updatedProject = projectRepository.save(project);
                    return ResponseEntity.ok(updatedProject);
                })
                .orElse(ResponseEntity.notFound().build());
    }

    // DELETE - Para excluir um projeto
    @DeleteMapping("/{id}")
    public ResponseEntity<?> delete(@PathVariable Long id) {
        // Primeiro, verificamos se o projeto com este ID realmente existe.
        // O método existsById é mais eficiente que findById se você não precisa do objeto.
        if (!projectRepository.existsById(id)) {
            // Se não existe, retornamos 404 Not Found.
            return ResponseEntity.notFound().build();
        }

        // Se existe, nós deletamos.
        projectRepository.deleteById(id);

        // E retornamos 204 No Content, que é o padrão para um delete bem-sucedido.
        return ResponseEntity.noContent().build();
    }
    
}




    
    


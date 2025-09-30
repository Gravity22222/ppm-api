package br.com.eurofarma.ppm_api.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.Data;
import java.time.LocalDate;

@Data // Anotação do Lombok que cria getters, setters, toString, etc.
@Entity // Anotação do JPA que marca esta classe como uma tabela no banco.
public class Project {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;
    private String description;
    private String responsible; // Quem é o responsável?
    private String status; // Ex: "Em Andamento", "Concluído", "Pausado"
    private LocalDate startDate;
    private LocalDate endDate;
}
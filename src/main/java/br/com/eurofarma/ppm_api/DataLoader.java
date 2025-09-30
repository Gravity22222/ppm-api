package br.com.eurofarma.ppm_api;

import br.com.eurofarma.ppm_api.model.Project;
import br.com.eurofarma.ppm_api.model.User;
import br.com.eurofarma.ppm_api.repository.ProjectRepository;
import br.com.eurofarma.ppm_api.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import java.time.LocalDate;
import java.util.Arrays;

@Component
public class DataLoader implements CommandLineRunner {

    @Autowired
    private ProjectRepository projectRepository;

    @Autowired
    private UserRepository userRepository; // Injetamos o repositório de usuário

    @Autowired
    private PasswordEncoder passwordEncoder; // Injetamos o codificador de senha

    @Override
    public void run(String... args) throws Exception {
        // Limpa os bancos para garantir um estado limpo
        projectRepository.deleteAll();
        userRepository.deleteAll();

        // --- Criação de Usuário de Teste ---
        if (userRepository.count() == 0) {
            User adminUser = User.builder()
                    .username("admin")
                    // IMPORTANTE: Salvamos a senha criptografada!
                    .password(passwordEncoder.encode("admin123")) 
                    .build();
            userRepository.save(adminUser);
            System.out.println(">>> Usuário 'admin' criado com senha 'admin123'. <<<");
        }

        Project p1 = new Project();
    p1.setName("Plataforma EURON de Inovação Aberta");
    p1.setDescription("Desenvolvimento do portal para submissão e gestão de ideias inovadoras de parceiros externos, alinhado à estratégia EURON.");
    p1.setResponsible("Juliana Costa");
    p1.setStatus("Em Andamento");
    p1.setStartDate(LocalDate.of(2025, 2, 10));
    p1.setEndDate(LocalDate.of(2026, 6, 20));

    Project p2 = new Project();
    p2.setName("Otimização da Cadeia Logística com IA");
    p2.setDescription("Projeto piloto para utilizar Machine Learning na previsão de demanda e otimização de rotas de distribuição na América Latina.");
    p2.setResponsible("Carlos Pereira");
    p2.setStatus("Em Andamento");
    p2.setStartDate(LocalDate.of(2025, 4, 15));
    p2.setEndDate(LocalDate.of(2026, 1, 30));

    Project p3 = new Project();
    p3.setName("Validação de Novo Fármaco (Cardio-02b)");
    p3.setDescription("Fase II de testes clínicos para o novo composto cardiovascular. Acompanhamento de resultados e documentação regulatória.");
    p3.setResponsible("Dr. Ana Silva");
    p3.setStatus("Concluído");
    p3.setStartDate(LocalDate.of(2024, 5, 20));
    p3.setEndDate(LocalDate.of(2025, 8, 29)); // Concluído recentemente

    Project p4 = new Project();
    p4.setName("Digitalização do Processo de Qualidade");
    p4.setDescription("Implementação de um sistema LIMS para automatizar e registrar os testes de controle de qualidade na planta de Itapevi.");
    p4.setResponsible("Fernando Martins");
    p4.setStatus("Concluído");
    p4.setStartDate(LocalDate.of(2024, 1, 22));
    p4.setEndDate(LocalDate.of(2025, 7, 15));

    Project p5 = new Project();
    p5.setName("Estudo de Viabilidade - Terapia Gênica");
    p5.setDescription("Pesquisa inicial e análise de mercado para a entrada da Eurofarma no segmento de terapias gênicas. Parceria com instituto de pesquisa.");
    p5.setResponsible("Sofia Lorenzi");
    p5.setStatus("Planejamento");
    p5.setStartDate(LocalDate.of(2025, 10, 1)); // Inicia em breve
    p5.setEndDate(LocalDate.of(2026, 3, 31));

    Project p6 = new Project();
    p6.setName("Desenvolvimento de App de Adesão ao Tratamento");
    p6.setDescription("Criação de um aplicativo móvel para auxiliar pacientes no acompanhamento de tratamentos crônicos, melhorando a adesão.");
    p6.setResponsible("Beatriz Lima");
    p6.setStatus("Em Andamento");
    p6.setStartDate(LocalDate.of(2025, 6, 1));
    p6.setEndDate(LocalDate.of(2026, 2, 28));

    Project p7 = new Project();
    p7.setName("Upgrade do ERP SAP S/4HANA");
    p7.setDescription("Atualização da infraestrutura do sistema ERP corporativo. Fase de levantamento de requisitos com as áreas de negócio.");
    p7.setResponsible("Ricardo Alves");
    p7.setStatus("Pausado");
    p7.setStartDate(LocalDate.of(2025, 3, 1));
    p7.setEndDate(LocalDate.of(2026, 12, 10));

    Project p8 = new Project();
    p8.setName("Programa de Capacitação em Data Science");
    p8.setDescription("Treinamento interno para formação de cientistas de dados, com foco em aplicações para a indústria farmacêutica.");
    p8.setResponsible("Juliana Costa");
    p8.setStatus("Planejamento");
    p8.setStartDate(LocalDate.of(2026, 1, 15));
    p8.setEndDate(LocalDate.of(2026, 6, 30));
    
    Project p9 = new Project();
    p9.setName("Expansão da Planta de Montes Claros");
    p9.setDescription("Estudos de engenharia e licenciamento ambiental para a nova ala de produção de antibióticos.");
    p9.setResponsible("Fernando Martins");
    p9.setStatus("Em Andamento");
    p9.setStartDate(LocalDate.of(2025, 8, 5));
    p9.setEndDate(LocalDate.of(2027, 5, 20));

    projectRepository.saveAll(Arrays.asList(p1, p2, p3, p4, p5, p6, p7, p8, p9));
    System.out.println(">>> Base de dados populada com 9 projetos de teste. <<<");
    }
}

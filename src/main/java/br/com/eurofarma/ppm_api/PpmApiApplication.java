package br.com.eurofarma.ppm_api;


import io.swagger.v3.oas.annotations.OpenAPIDefinition;
import io.swagger.v3.oas.annotations.enums.SecuritySchemeIn;
import io.swagger.v3.oas.annotations.enums.SecuritySchemeType;
import io.swagger.v3.oas.annotations.info.Info;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import io.swagger.v3.oas.annotations.security.SecurityScheme;


import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;


@OpenAPIDefinition(
    
    info = @Info(
        title = "PPM Eurofarma API",
        version = "1.0",
        description = "API para Gestão de Portfólio de Projetos"

    ),
    
    security = {
        @SecurityRequirement(name = "bearerAuth")
    }
)
@SecurityScheme(
    name = "bearerAuth", 
    description = "Autenticação via Token JWT. Insira seu token.",
    scheme = "bearer",
    type = SecuritySchemeType.HTTP, 
    bearerFormat = "JWT", 
    in = SecuritySchemeIn.HEADER 
)

@SpringBootApplication
public class PpmApiApplication {

    public static void main(String[] args) {
        SpringApplication.run(PpmApiApplication.class, args);
    }

}
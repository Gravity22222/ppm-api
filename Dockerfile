# --- Estágio de Build ---
# Usamos uma imagem que já tem o Maven e o JDK 17 instalados.
FROM maven:3.9-eclipse-temurin-17 AS build

# Define o diretório de trabalho dentro do contêiner.
WORKDIR /app

# Copia apenas o pom.xml para aproveitar o cache de camadas do Docker.
# As dependências só serão baixadas novamente se o pom.xml mudar.
COPY pom.xml .

# Baixa todas as dependências do projeto.
RUN mvn dependency:go-offline

# Copia o restante do código-fonte da aplicação.
COPY src ./src

# Compila a aplicação, gera o pacote .jar e pula os testes.
RUN mvn clean package -DskipTests

# --- Estágio de Execução ---
# Usamos uma imagem "slim" apenas com o Java Runtime (JRE), que é menor e mais segura.
FROM eclipse-temurin:17-jre-focal

# Define o diretório de trabalho.
WORKDIR /app

# Copia APENAS o arquivo .jar gerado no estágio de build para a imagem final.
COPY --from=build /app/target/*.jar app.jar

# Expõe a porta 8080, informando que a aplicação dentro do contêiner a utiliza.
EXPOSE 8080

# Comando que será executado quando o contêiner iniciar.
ENTRYPOINT ["java", "-jar", "app.jar"]
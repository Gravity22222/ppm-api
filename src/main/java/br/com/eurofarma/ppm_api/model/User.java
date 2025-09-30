package br.com.eurofarma.ppm_api.model;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.Collection;
import java.util.Collections;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "_user") // Usamos "_user" porque "user" pode ser uma palavra reservada em alguns bancos
public class User implements UserDetails {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(unique = true, nullable = false)
    private String username;

    @Column(nullable = false)
    private String password;

    // --- Métodos da interface UserDetails ---
    // Vamos manter a lógica de perfis/autorizações simples por enquanto

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        // No futuro, aqui retornaremos os perfis (ex: "ROLE_ADMIN", "ROLE_USER")
        return Collections.emptyList();
    }

    @Override
    public String getPassword() {
        return password;
    }

    @Override
    public String getUsername() {
        return username;
    }

    // Para simplificar, vamos retornar 'true' para todos os controles de conta
    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return true;
    }
}

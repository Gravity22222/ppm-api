package br.com.eurofarma.ppm_api.controller;

import br.com.eurofarma.ppm_api.dto.AuthRequest;
import br.com.eurofarma.ppm_api.dto.AuthResponse;
import br.com.eurofarma.ppm_api.service.JwtService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "http://localhost:3000")
public class AuthController {

    private final AuthenticationManager authenticationManager;
    private final UserDetailsService userDetailsService;
    private final JwtService jwtService;

    public AuthController(AuthenticationManager authenticationManager, UserDetailsService userDetailsService, JwtService jwtService) {
        this.authenticationManager = authenticationManager;
        this.userDetailsService = userDetailsService;
        this.jwtService = jwtService;
    }

    @PostMapping("/login")
    public ResponseEntity<AuthResponse> login(@RequestBody AuthRequest authRequest) {
        // 1. Tenta autenticar o usuário com as credenciais fornecidas
        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(authRequest.getUsername(), authRequest.getPassword())
        );

        // 2. Se a autenticação for bem-sucedida, busca os detalhes do usuário
        final UserDetails userDetails = userDetailsService.loadUserByUsername(authRequest.getUsername());

        // 3. Gera um token JWT para o usuário
        final String jwt = jwtService.generateToken(userDetails);

        // 4. Retorna o token na resposta
        return ResponseEntity.ok(new AuthResponse(jwt));
    }
}

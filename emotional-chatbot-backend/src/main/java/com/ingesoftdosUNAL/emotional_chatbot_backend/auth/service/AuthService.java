package com.ingesoftdosUNAL.emotional_chatbot_backend.auth.service;

import com.ingesoftdosUNAL.emotional_chatbot_backend.auth.dto.AuthResponse;
import com.ingesoftdosUNAL.emotional_chatbot_backend.auth.dto.LoginRequest;
import com.ingesoftdosUNAL.emotional_chatbot_backend.auth.dto.RegisterRequest;
import com.ingesoftdosUNAL.emotional_chatbot_backend.common.dto.MessageResponse;
import com.ingesoftdosUNAL.emotional_chatbot_backend.security.JwtService;
import com.ingesoftdosUNAL.emotional_chatbot_backend.user.entity.User;
import com.ingesoftdosUNAL.emotional_chatbot_backend.user.repository.UserRepository;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class AuthService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;

    public AuthService(UserRepository userRepository, PasswordEncoder passwordEncoder, JwtService jwtService) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.jwtService = jwtService;
    }

    public MessageResponse register(RegisterRequest request) {
        String correoNormalizado = request.getCorreo().trim().toLowerCase();
        if (userRepository.existsByCorreo(correoNormalizado)) {
            throw new IllegalArgumentException("Ya existe una cuenta registrada con ese correo");
        }

        User user = User.builder()
                .nombre(request.getNombre().trim())
                .correo(correoNormalizado)
                .password(passwordEncoder.encode(request.getPassword()))
                .build();

        userRepository.save(user);
        return new MessageResponse("Usuario registrado correctamente");
    }

    public AuthResponse login(LoginRequest request) {
        String correoNormalizado = request.getCorreo().trim().toLowerCase();
        User user = userRepository.findUserByCorreo(correoNormalizado)
                .orElseThrow(() -> new BadCredentialsException("Credenciales inválidas"));

        if (!passwordEncoder.matches(request.getPassword(), user.getPassword())) {
            throw new BadCredentialsException("Credenciales inválidas");
        }

        String token = jwtService.generateToken(user.getId(), user.getCorreo());
        return new AuthResponse(token);
    }
}

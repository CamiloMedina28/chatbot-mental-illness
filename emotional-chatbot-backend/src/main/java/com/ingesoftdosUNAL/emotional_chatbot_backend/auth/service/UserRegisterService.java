package com.ingesoftdosUNAL.emotional_chatbot_backend.auth.service;

import com.ingesoftdosUNAL.emotional_chatbot_backend.auth.dto.MessageResponse;
import com.ingesoftdosUNAL.emotional_chatbot_backend.auth.dto.RegisterRequest;
import com.ingesoftdosUNAL.emotional_chatbot_backend.user.entity.User;
import com.ingesoftdosUNAL.emotional_chatbot_backend.user.repository.UserRepository;
import lombok.AllArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@AllArgsConstructor
public class UserRegisterService {
    private final UserRepository userRepository;

    private final PasswordEncoder passwordEncoder;

    public MessageResponse register(RegisterRequest req){
        if (userRepository.existsByCorreo(req.getCorreo())){
            throw new RuntimeException("El correo electrónico ya se encuentra registrado en la base de datos");
        }

        String passwordHash = passwordEncoder.encode(req.getPassword());

        User usuario = new User();

        usuario.setCorreo(req.getCorreo());
        usuario.setNombre(req.getNombre());
        usuario.setPassword(passwordHash);

        userRepository.save(usuario);

        return new MessageResponse("Usuario creado con éxito");

    }
}

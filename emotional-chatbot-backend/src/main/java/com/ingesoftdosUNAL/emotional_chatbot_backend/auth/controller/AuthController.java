package com.ingesoftdosUNAL.emotional_chatbot_backend.auth.controller;

import com.ingesoftdosUNAL.emotional_chatbot_backend.auth.dto.AuthResponse;
import com.ingesoftdosUNAL.emotional_chatbot_backend.auth.dto.LoginRequest;
import com.ingesoftdosUNAL.emotional_chatbot_backend.auth.dto.RegisterRequest;
import com.ingesoftdosUNAL.emotional_chatbot_backend.auth.service.AuthService;
import com.ingesoftdosUNAL.emotional_chatbot_backend.common.dto.MessageResponse;
import jakarta.validation.Valid;
import lombok.Builder;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/auth")
@Builder
public class AuthController {

    private final AuthService authService;

    @PostMapping("/register")
    @ResponseStatus(HttpStatus.CREATED)
    public MessageResponse register(@Valid @RequestBody RegisterRequest request) {
        return authService.register(request);
    }

    @PostMapping("/login")
    public ResponseEntity<AuthResponse> login(@Valid @RequestBody LoginRequest request) {
        return ResponseEntity.ok(authService.login(request));
    }
}

package com.ingesoftdosUNAL.emotional_chatbot_backend.auth.controller;

import com.ingesoftdosUNAL.emotional_chatbot_backend.auth.dto.MessageResponse;
import com.ingesoftdosUNAL.emotional_chatbot_backend.auth.dto.RegisterRequest;
import com.ingesoftdosUNAL.emotional_chatbot_backend.auth.service.UserRegisterService;
import jakarta.validation.Valid;
import lombok.Builder;
import lombok.NoArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/auth")
@Builder
public class userController {
    private UserRegisterService userreg;

    @PostMapping("/register")
    public ResponseEntity<MessageResponse> register(@Valid @RequestBody RegisterRequest request){
        MessageResponse response = userreg.register(request);
        System.out.println("response.getMessage() = " + response.getMessage());

        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }
}

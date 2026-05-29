package com.ingesoftdosUNAL.emotional_chatbot_backend.auth.dto;

import lombok.*;

@Getter
@Builder
public class AuthResponse {
    private String token;

    @Builder.Default
    private String type = "Bearer";


}

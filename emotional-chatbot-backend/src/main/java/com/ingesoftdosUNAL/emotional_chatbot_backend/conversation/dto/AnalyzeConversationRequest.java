package com.ingesoftdosUNAL.emotional_chatbot_backend.conversation.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class AnalyzeConversationRequest {

    @NotBlank(message = "El mensaje no puede estar vacío")
    @Size(max = 3000, message = "El mensaje excede el tamaño permitido")
    private String userMessage;
}

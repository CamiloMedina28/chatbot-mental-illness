package com.ingesoftdosUNAL.emotional_chatbot_backend.chat.entity;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.index.Indexed;

import java.time.LocalDateTime;
import java.util.List;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;
import lombok.Builder;

@Document(collection = "messages")
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Message {
    @Id
    private String id;

    @Indexed
    private String conversationId;

    @Indexed
    private String userId;

    private String mensajeUsuario;

    private String respuestaChatbot;

    private List<Emotion> emociones;

    private LocalDateTime fecha;

    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    public static class Emotion {
        private String nombre;
        private Integer porcentaje;
    }
}

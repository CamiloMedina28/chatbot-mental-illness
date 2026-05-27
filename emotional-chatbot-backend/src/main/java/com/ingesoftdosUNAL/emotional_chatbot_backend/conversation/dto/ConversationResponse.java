package com.ingesoftdosUNAL.emotional_chatbot_backend.conversation.dto;

import java.time.LocalDateTime;
import lombok.AllArgsConstructor;
import lombok.Getter;

@AllArgsConstructor
@Getter
public class ConversationResponse {
    private Long conversationId;
    private String userMessage;
    private EmotionAnalysisResponse analysis;
    private String botResponse;
    private String disclaimer;
    private LocalDateTime createdAt;
}

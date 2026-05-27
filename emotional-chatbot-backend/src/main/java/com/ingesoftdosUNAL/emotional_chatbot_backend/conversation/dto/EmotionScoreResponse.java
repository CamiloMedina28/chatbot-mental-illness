package com.ingesoftdosUNAL.emotional_chatbot_backend.conversation.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;

@AllArgsConstructor
@Getter
public class EmotionScoreResponse {
    private String name;
    private int percentage;
}

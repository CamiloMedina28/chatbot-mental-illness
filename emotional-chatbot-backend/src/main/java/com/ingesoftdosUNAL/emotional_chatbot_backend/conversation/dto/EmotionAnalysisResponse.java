package com.ingesoftdosUNAL.emotional_chatbot_backend.conversation.dto;

import java.util.List;
import lombok.AllArgsConstructor;
import lombok.Getter;

@AllArgsConstructor
@Getter
public class EmotionAnalysisResponse {
    private String dominantEmotion;
    private List<EmotionScoreResponse> emotions;
}

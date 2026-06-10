package com.ingesoftdosUNAL.emotional_chatbot_backend.conversation.client;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonProperty;
import java.util.Map;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@JsonIgnoreProperties(ignoreUnknown = true)
@Getter
@NoArgsConstructor
@AllArgsConstructor
public class IAChatResponse {

    private String message;

    @JsonProperty("dominant_emotion")
    private String dominantEmotion;

    private Map<String, Double> emotions;

    private String recommendation;

    private String warning;
}

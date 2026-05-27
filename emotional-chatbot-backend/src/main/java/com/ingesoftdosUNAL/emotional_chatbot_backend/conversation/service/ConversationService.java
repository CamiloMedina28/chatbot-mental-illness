package com.ingesoftdosUNAL.emotional_chatbot_backend.conversation.service;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.ingesoftdosUNAL.emotional_chatbot_backend.conversation.dto.ConversationResponse;
import com.ingesoftdosUNAL.emotional_chatbot_backend.conversation.dto.EmotionAnalysisResponse;
import com.ingesoftdosUNAL.emotional_chatbot_backend.conversation.dto.EmotionScoreResponse;
import com.ingesoftdosUNAL.emotional_chatbot_backend.conversation.entity.Conversation;
import com.ingesoftdosUNAL.emotional_chatbot_backend.conversation.repository.ConversationRepository;
import com.ingesoftdosUNAL.emotional_chatbot_backend.user.entity.User;
import com.ingesoftdosUNAL.emotional_chatbot_backend.user.repository.UserRepository;
import java.util.ArrayList;
import java.util.Comparator;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class ConversationService {

    private final UserRepository userRepository;
    private final ConversationRepository conversationRepository;
    private final EmotionAnalysisService emotionAnalysisService;
    private final ObjectMapper objectMapper;

    public ConversationService(
            UserRepository userRepository,
            ConversationRepository conversationRepository,
            EmotionAnalysisService emotionAnalysisService,
            ObjectMapper objectMapper
    ) {
        this.userRepository = userRepository;
        this.conversationRepository = conversationRepository;
        this.emotionAnalysisService = emotionAnalysisService;
        this.objectMapper = objectMapper;
    }

    @Transactional
    public ConversationResponse analyzeAndSave(Long userId, String userMessage) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new IllegalArgumentException("Usuario autenticado no encontrado"));

        EmotionAnalysisService.EmotionAnalysisResult result = emotionAnalysisService.analyze(userMessage);

        List<String> emotionNames = result.emotions().stream()
                .map(EmotionScoreResponse::getName)
                .toList();

        Map<String, Integer> percentages = new LinkedHashMap<>();
        for (EmotionScoreResponse emotion : result.emotions()) {
            percentages.put(emotion.getName(), emotion.getPercentage());
        }

        Conversation conversation = Conversation.builder()
                .user(user)
                .userMessage(userMessage.trim())
                .botResponse(result.botResponse())
                .dominantEmotion(result.dominantEmotion())
                .emotions(writeJson(emotionNames))
                .percentages(writeJson(percentages))
                .build();

        Conversation saved = conversationRepository.save(conversation);
        return toResponse(saved);
    }

    @Transactional(readOnly = true)
    public List<ConversationResponse> getHistory(Long userId) {
        List<Conversation> records = conversationRepository.findByUser_IdOrderByCreatedAtAsc(userId);
        List<ConversationResponse> history = new ArrayList<>();
        for (Conversation record : records) {
            history.add(toResponse(record));
        }
        return history;
    }

    private ConversationResponse toResponse(Conversation conversation) {
        List<String> emotionNames = readEmotionNames(conversation.getEmotions());
        Map<String, Integer> percentages = readPercentages(conversation.getPercentages());

        List<EmotionScoreResponse> scoreResponses = new ArrayList<>();
        for (String name : emotionNames) {
            Integer value = percentages.get(name);
            if (value != null) {
                scoreResponses.add(new EmotionScoreResponse(name, value));
            }
        }

        if (scoreResponses.isEmpty()) {
            for (Map.Entry<String, Integer> entry : percentages.entrySet()) {
                scoreResponses.add(new EmotionScoreResponse(entry.getKey(), entry.getValue()));
            }
        }

        scoreResponses.sort(Comparator.comparingInt(EmotionScoreResponse::getPercentage).reversed());

        return new ConversationResponse(
                conversation.getId(),
                conversation.getUserMessage(),
                new EmotionAnalysisResponse(conversation.getDominantEmotion(), scoreResponses),
                conversation.getBotResponse(),
                emotionAnalysisService.getDisclaimer(),
                conversation.getCreatedAt()
        );
    }

    private String writeJson(Object value) {
        try {
            return objectMapper.writeValueAsString(value);
        } catch (Exception ex) {
            throw new IllegalArgumentException("No se pudo serializar el análisis emocional");
        }
    }

    private List<String> readEmotionNames(String json) {
        try {
            return objectMapper.readValue(json, new TypeReference<List<String>>() {
            });
        } catch (Exception ex) {
            return List.of();
        }
    }

    private Map<String, Integer> readPercentages(String json) {
        try {
            return objectMapper.readValue(json, new TypeReference<Map<String, Integer>>() {
            });
        } catch (Exception ex) {
            return Map.of();
        }
    }
}

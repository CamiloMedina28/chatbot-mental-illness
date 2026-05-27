package com.ingesoftdosUNAL.emotional_chatbot_backend.conversation.service;

import com.ingesoftdosUNAL.emotional_chatbot_backend.conversation.dto.EmotionScoreResponse;
import java.text.Normalizer;
import java.util.ArrayList;
import java.util.Comparator;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Locale;
import java.util.Map;
import java.util.Set;
import java.util.regex.Pattern;
import org.springframework.stereotype.Service;

@Service
public class EmotionAnalysisService {

    private static final String DISCLAIMER = "Este sistema no realiza diagnósticos clínicos ni reemplaza la atención profesional.";
    private static final Pattern NON_LETTER_PATTERN = Pattern.compile("[^a-záéíóúñü]+", Pattern.CASE_INSENSITIVE);

    private static final Map<String, Set<String>> EMOTION_KEYWORDS = Map.of(
            "alegria", Set.of("feliz", "alegre", "contento", "contenta", "bien", "motivado", "motivation", "optimista", "gracias"),
            "tristeza", Set.of("triste", "deprimido", "deprimida", "llorar", "solo", "sola", "vacio", "vacío", "desanimo", "desánimo"),
            "ansiedad", Set.of("ansioso", "ansiosa", "ansiedad", "nervioso", "nerviosa", "preocupado", "preocupada", "inquieto", "inquieta"),
            "enojo", Set.of("enojado", "enojada", "rabia", "ira", "molesto", "molesta", "frustrado", "frustrada"),
            "miedo", Set.of("miedo", "asustado", "asustada", "temor", "panic", "panico", "pánico", "inseguro", "insegura"),
            "calma", Set.of("calma", "tranquilo", "tranquila", "sereno", "serena", "relajado", "relajada", "estable"),
            "estres", Set.of("estres", "estrés", "cansado", "cansada", "agotado", "agotada", "saturado", "saturada", "presion", "presión")
    );

    public EmotionAnalysisResult analyze(String message) {
        Map<String, Integer> counts = new LinkedHashMap<>();
        EMOTION_KEYWORDS.keySet().forEach(key -> counts.put(key, 0));

        String normalizedText = normalize(message);
        String[] tokens = NON_LETTER_PATTERN.split(normalizedText);

        for (String token : tokens) {
            if (token.isBlank()) {
                continue;
            }
            for (Map.Entry<String, Set<String>> entry : EMOTION_KEYWORDS.entrySet()) {
                if (entry.getValue().contains(token)) {
                    counts.computeIfPresent(entry.getKey(), (key, value) -> value + 1);
                }
            }
        }

        List<EmotionScoreResponse> scores = toPercentages(counts);
        String dominantEmotion = scores.getFirst().getName();

        return new EmotionAnalysisResult(
                dominantEmotion,
                scores,
                buildGuidanceMessage(dominantEmotion)
        );
    }

    public String getDisclaimer() {
        return DISCLAIMER;
    }

    private List<EmotionScoreResponse> toPercentages(Map<String, Integer> counts) {
        int total = counts.values().stream().mapToInt(Integer::intValue).sum();

        if (total == 0) {
            return List.of(new EmotionScoreResponse("calma", 100));
        }

        List<Map.Entry<String, Integer>> detected = counts.entrySet().stream()
                .filter(entry -> entry.getValue() > 0)
                .sorted(Map.Entry.<String, Integer>comparingByValue().reversed())
                .toList();

        Map<String, Integer> percentages = new LinkedHashMap<>();
        int assigned = 0;

        for (Map.Entry<String, Integer> entry : detected) {
            int value = (entry.getValue() * 100) / total;
            percentages.put(entry.getKey(), value);
            assigned += value;
        }

        int remaining = 100 - assigned;
        for (Map.Entry<String, Integer> entry : detected) {
            if (remaining <= 0) {
                break;
            }
            percentages.computeIfPresent(entry.getKey(), (key, value) -> value + 1);
            remaining--;
        }

        List<EmotionScoreResponse> responses = new ArrayList<>();
        for (Map.Entry<String, Integer> entry : percentages.entrySet()) {
            responses.add(new EmotionScoreResponse(entry.getKey(), entry.getValue()));
        }
        responses.sort(Comparator.comparingInt(EmotionScoreResponse::getPercentage).reversed());
        return responses;
    }

    private String buildGuidanceMessage(String dominantEmotion) {
        return switch (dominantEmotion) {
            case "ansiedad" -> "Parece que podrías estar experimentando ansiedad. Esta orientación no es un diagnóstico. Intenta respirar de forma pausada y buscar apoyo cercano si lo necesitas.";
            case "estres" -> "Parece que podrías estar experimentando estrés. Esta orientación no es un diagnóstico. Puede ayudarte hacer una pausa breve, hidratarte y ordenar una tarea a la vez.";
            case "tristeza" -> "Parece que podrías estar experimentando tristeza. Esta orientación no es un diagnóstico. Hablar con alguien de confianza puede ser un primer paso útil.";
            case "enojo" -> "Parece que podrías estar experimentando enojo. Esta orientación no es un diagnóstico. Tomar distancia unos minutos antes de responder puede ayudarte.";
            case "miedo" -> "Parece que podrías estar experimentando miedo. Esta orientación no es un diagnóstico. Buscar un entorno seguro y apoyo puede ayudarte a regularte.";
            case "alegria" -> "Se perciben señales de bienestar o alegría. Esta orientación no es un diagnóstico. Mantén hábitos que te estén haciendo bien.";
            default -> "Se perciben señales de calma. Esta orientación no es un diagnóstico. Mantener rutinas de descanso y autocuidado puede ayudarte.";
        };
    }

    private String normalize(String input) {
        String lower = input.toLowerCase(Locale.ROOT).trim();
        String normalized = Normalizer.normalize(lower, Normalizer.Form.NFD);
        return normalized.replaceAll("\\p{M}", "");
    }

    public record EmotionAnalysisResult(
            String dominantEmotion,
            List<EmotionScoreResponse> emotions,
            String botResponse
    ) {
    }
}

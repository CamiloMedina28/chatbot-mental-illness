package com.ingesoftdosUNAL.emotional_chatbot_backend.conversation.client;

import com.fasterxml.jackson.databind.ObjectMapper;
import java.io.IOException;
import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import java.util.Map;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

@Component
public class IAChatClient {

    private final HttpClient httpClient;
    private final ObjectMapper objectMapper;
    private final String chatEndpoint;

    public IAChatClient(
            ObjectMapper objectMapper,
            @Value("${app.ia.base-url:http://localhost:8000}") String baseUrl
    ) {
        this.httpClient = HttpClient.newHttpClient();
        this.objectMapper = objectMapper;
        this.chatEndpoint = baseUrl.endsWith("/") ? baseUrl + "chat/message" : baseUrl + "/chat/message";
    }

    public IAChatResponse analyze(String message) {
        try {
            String payload = objectMapper.writeValueAsString(Map.of("message", message));
            HttpRequest request = HttpRequest.newBuilder()
                    .uri(URI.create(chatEndpoint))
                    .version(HttpClient.Version.HTTP_1_1)
                    .header("Content-Type", "application/json")
                    .POST(HttpRequest.BodyPublishers.ofString(payload))
                    .build();

            HttpResponse<String> response = httpClient.send(request, HttpResponse.BodyHandlers.ofString());

            if (response.statusCode() < 200 || response.statusCode() >= 300 || response.body() == null) {
                throw new IAServiceException(
                        "No se obtuvo una respuesta válida del servicio IA. Status: "
                                + response.statusCode()
                                + ". Body: "
                                + response.body()
                );
            }

            return objectMapper.readValue(response.body(), IAChatResponse.class);
        } catch (InterruptedException ex) {
            Thread.currentThread().interrupt();
            throw new IAServiceException("Error al conectar con el servicio IA.", ex);
        } catch (IOException ex) {
            throw new IAServiceException("Error al conectar con el servicio IA.", ex);
        }
    }
}

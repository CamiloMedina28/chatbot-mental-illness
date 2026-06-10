package com.ingesoftdosUNAL.emotional_chatbot_backend.conversation.client;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Component;
import org.springframework.web.client.RestClientException;
import org.springframework.web.client.RestTemplate;

@Component
public class IAChatClient {

    private final RestTemplate restTemplate;
    private final String chatEndpoint;

    public IAChatClient(
            RestTemplate restTemplate,
            @Value("${app.ia.base-url:http://localhost:8000}") String baseUrl
    ) {
        this.restTemplate = restTemplate;
        this.chatEndpoint = baseUrl.endsWith("/") ? baseUrl + "chat/message" : baseUrl + "/chat/message";
    }

    public IAChatResponse analyze(String message) {
        try {
            IAChatRequest request = new IAChatRequest(message);
            ResponseEntity<IAChatResponse> response = restTemplate.postForEntity(chatEndpoint, request, IAChatResponse.class);
            IAChatResponse body = response.getBody();
            if (body == null || !response.getStatusCode().is2xxSuccessful()) {
                throw new IAServiceException("No se obtuvo una respuesta válida del servicio IA.");
            }
            return body;
        } catch (RestClientException ex) {
            throw new IAServiceException("Error al conectar con el servicio IA.", ex);
        }
    }
}

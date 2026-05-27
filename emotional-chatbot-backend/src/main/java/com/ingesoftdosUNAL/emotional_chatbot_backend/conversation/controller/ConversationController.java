package com.ingesoftdosUNAL.emotional_chatbot_backend.conversation.controller;

import com.ingesoftdosUNAL.emotional_chatbot_backend.conversation.dto.AnalyzeConversationRequest;
import com.ingesoftdosUNAL.emotional_chatbot_backend.conversation.dto.ConversationResponse;
import com.ingesoftdosUNAL.emotional_chatbot_backend.conversation.service.ConversationService;
import com.ingesoftdosUNAL.emotional_chatbot_backend.security.AuthenticatedUser;
import jakarta.validation.Valid;
import java.util.List;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/conversations")
public class ConversationController {

    private final ConversationService conversationService;

    public ConversationController(ConversationService conversationService) {
        this.conversationService = conversationService;
    }

    @PostMapping("/analyze")
    public ResponseEntity<ConversationResponse> analyze(
            @AuthenticationPrincipal AuthenticatedUser user,
            @Valid @RequestBody AnalyzeConversationRequest request
    ) {
        if (user == null) {
            throw new IllegalArgumentException("Usuario no autenticado");
        }
        ConversationResponse response = conversationService.analyzeAndSave(user.getUserId(), request.getUserMessage());
        return ResponseEntity.ok(response);
    }

    @GetMapping("/history")
    public ResponseEntity<List<ConversationResponse>> history(@AuthenticationPrincipal AuthenticatedUser user) {
        if (user == null) {
            throw new IllegalArgumentException("Usuario no autenticado");
        }
        return ResponseEntity.ok(conversationService.getHistory(user.getUserId()));
    }
}

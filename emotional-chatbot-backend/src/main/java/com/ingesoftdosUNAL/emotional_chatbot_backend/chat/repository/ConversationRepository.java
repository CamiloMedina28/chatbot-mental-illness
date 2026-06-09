package com.ingesoftdosUNAL.emotional_chatbot_backend.chat.repository;

import com.ingesoftdosUNAL.emotional_chatbot_backend.chat.entity.Conversation;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;

public interface ConversationRepository extends MongoRepository<Conversation, String> {
    List<Conversation> findByUserIdOrderByCreatedAtDesc(String userId);
}

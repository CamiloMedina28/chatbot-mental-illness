package com.ingesoftdosUNAL.emotional_chatbot_backend.chat.repository;

import com.ingesoftdosUNAL.emotional_chatbot_backend.chat.entity.Message;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;

public interface MessageRepository extends MongoRepository<Message, String> {
    List<Message> findByConversationIdOrderByFechaAsc(String conversationId);
    List<Message> findByUserIdOrderByFechaDesc(String userId);
}

package com.ingesoftdosUNAL.emotional_chatbot_backend.conversation.repository;

import com.ingesoftdosUNAL.emotional_chatbot_backend.conversation.entity.Conversation;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ConversationRepository extends JpaRepository<Conversation, Long> {
    List<Conversation> findByUser_IdOrderByCreatedAtAsc(Long userId);
}

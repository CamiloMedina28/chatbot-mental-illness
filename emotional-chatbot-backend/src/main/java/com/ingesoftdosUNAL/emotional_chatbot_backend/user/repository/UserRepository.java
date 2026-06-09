package com.ingesoftdosUNAL.emotional_chatbot_backend.user.repository;

import com.ingesoftdosUNAL.emotional_chatbot_backend.user.entity.User;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.Optional;

public interface UserRepository extends MongoRepository<User, String> {
    boolean existsByCorreo(String correo);

    Optional<User> findByCorreo(String correo);

}

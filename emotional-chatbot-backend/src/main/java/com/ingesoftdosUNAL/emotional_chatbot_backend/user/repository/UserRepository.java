package com.ingesoftdosUNAL.emotional_chatbot_backend.user.repository;

import com.ingesoftdosUNAL.emotional_chatbot_backend.user.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Long> {
    boolean existsByCorreo(String correo);

    Optional<User> findUserByCorreo(String correo);
}

package com.ingesoftdosUNAL.emotional_chatbot_backend.conversation.client;

public class IAServiceException extends RuntimeException {

    public IAServiceException(String message) {
        super(message);
    }

    public IAServiceException(String message, Throwable cause) {
        super(message, cause);
    }
}

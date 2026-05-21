package com.ingesoftdosUNAL.emotional_chatbot_backend.auth.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@NoArgsConstructor
@AllArgsConstructor
@Setter
@Getter
public class LoginRequest {
    @Email(message = "Formato de correo incorrecto.")
    @NotBlank(message = "El campo de correo es obligatorio.")
    private String correo;

    @NotBlank(message = "El campo de contraseña es obligatorio.")
    private String password;
}

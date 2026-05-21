package com.ingesoftdosUNAL.emotional_chatbot_backend.auth.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.Getter;

@AllArgsConstructor
@NoArgsConstructor
@Setter
@Getter
public class RegisterRequest {
    @NotBlank(message = "El nombre completo es requerido")
    @Size(min = 3, max = 50)
    private String nombre;

    @NotBlank(message = "El correo electrónico es obligatorio")
    @Email(message = "El correo electrónico es obligatorio")
    private String correo;

    @NotBlank(message = "La contraseña es requerida")
    @Size(min = 6, max = 255)
    private String password;
}

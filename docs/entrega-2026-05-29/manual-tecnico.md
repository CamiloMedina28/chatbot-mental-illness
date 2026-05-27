# Manual técnico — Entrega 29 de mayo de 2026

## 1) Descripción del sistema
Backend de chatbot para orientación emocional inicial. Recibe texto de usuario autenticado, calcula emociones probables con reglas determinísticas, responde con orientación básica no clínica y registra la conversación.

## 2) Arquitectura
Arquitectura API REST por capas en Spring Boot:
- `auth`: registro/login y emisión de JWT.
- `security`: filtro JWT y reglas de acceso.
- `user`: entidad y repositorio de usuarios.
- `conversation`: análisis emocional, persistencia e historial.
- `common`: respuestas comunes y manejo global de excepciones.

## 3) Stack usado
- Java 21
- Spring Boot 3.5.14
- Spring Web
- Spring Security
- Spring Data JPA
- PostgreSQL
- Maven Wrapper
- Lombok
- JJWT (firma/validación de tokens)

## 4) Modelo de datos

### Tabla `usuarios`
- `id` (PK)
- `nombre`
- `correo` (único)
- `password` (hash bcrypt)
- `created_at`

### Tabla `conversaciones`
- `id` (PK)
- `user_id` (FK a `usuarios.id`)
- `user_message`
- `bot_response`
- `emotions` (JSON serializado)
- `percentages` (JSON serializado)
- `dominant_emotion`
- `created_at`

## 5) Endpoints disponibles

### Auth
- `POST /auth/register`
- `POST /auth/login`

### Conversaciones (requiere `Authorization: Bearer <token>`)
- `POST /conversations/analyze`
- `GET /conversations/history`

## 6) Variables de entorno
Ejemplo seguro:

```env
SERVER_PORT=8080
DB_HOST=localhost
DB_PORT=5432
DB_NAME=emotional_chatbot
DB_USER=postgres
DB_PASSWORD=postgres
JWT_SECRET=CAMBIAR_ESTE_SECRETO_EN_PRODUCCION
JWT_EXPIRATION_MS=86400000
```

## 7) Cómo correr localmente
Desde `emotional-chatbot-backend/`:

1. Asegurar PostgreSQL activo y crear la base:
```sql
CREATE DATABASE emotional_chatbot;
```

2. Configurar variables de entorno (sección 6).

3. Ejecutar backend:
```bash
sh mvnw spring-boot:run
```

4. (Opcional) ejecutar pruebas:
```bash
sh mvnw test
```

## 8) Cómo probar con Postman
Ver `docs/entrega-2026-05-29/postman-examples.md`.

Flujo recomendado:
1. Registrar usuario.
2. Iniciar sesión para obtener token.
3. Enviar mensaje emocional a `/conversations/analyze`.
4. Consultar `/conversations/history`.

## 9) Casos de prueba manuales
1. Registro válido crea usuario nuevo.
2. Registro duplicado por correo responde error de negocio.
3. Login válido entrega JWT.
4. Login inválido responde 401.
5. `analyze` sin token responde no autorizado.
6. `analyze` con token guarda conversación y retorna emociones + porcentaje + disclaimer.
7. `history` devuelve solo conversaciones del usuario autenticado en orden cronológico.

## 10) Decisiones técnicas
- Se priorizó REST para entrega del 29 de mayo por velocidad de implementación y demostración controlada.
- WebSocket se deja como pendiente prioritario para el 19 de junio.
- El análisis emocional actual es determinístico por palabras clave para cumplir MVP académico sin inferencias clínicas.

## 11) Limitaciones actuales
- Sin OAuth 2.0.
- Sin WebSocket implementado.
- Sin frontend en este repositorio.
- Sin migraciones formales (Flyway/Liquibase).
- Sin suite robusta de pruebas automatizadas.

## 12) Pendientes para el 19 de junio
- Incorporar WebSocket para flujo en tiempo real.
- Mejorar NLP de clasificación emocional.
- Integrar frontend completo.
- Robustecer pruebas y observabilidad.
- Evaluar OAuth opcional.

## 13) Advertencia ética
El sistema no realiza diagnósticos clínicos ni reemplaza atención psicológica, médica o profesional.

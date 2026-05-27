# Resumen de cambios

## Cambios realizados

### Archivos de guía/documentación
- `AGENTS.md`
- `README.md`
- `docs/entrega-2026-05-29/auditoria-estado-actual.md`
- `docs/entrega-2026-05-29/manual-tecnico.md`
- `docs/entrega-2026-05-29/postman-examples.md`

### Backend y configuración
- `emotional-chatbot-backend/pom.xml`
- `emotional-chatbot-backend/.gitignore`
- `emotional-chatbot-backend/src/main/resources/application.yml`
- `emotional-chatbot-backend/src/main/java/com/ingesoftdosUNAL/emotional_chatbot_backend/auth/dto/AuthResponse.java`
- `emotional-chatbot-backend/src/main/java/com/ingesoftdosUNAL/emotional_chatbot_backend/user/entity/User.java`

### Nuevos módulos (MVP 29 mayo)
- `auth/controller/AuthController.java`
- `auth/service/AuthService.java`
- `security/AuthenticatedUser.java`
- `security/JwtService.java`
- `security/JwtAuthenticationFilter.java`
- `security/SecurityConfig.java`
- `common/dto/MessageResponse.java`
- `common/exception/ApiExceptionHandler.java`
- `conversation/entity/Conversation.java`
- `conversation/repository/ConversationRepository.java`
- `conversation/dto/*`
- `conversation/service/EmotionAnalysisService.java`
- `conversation/service/ConversationService.java`
- `conversation/controller/ConversationController.java`

## Cómo probar
Desde la raíz del repo:

1. Entrar al backend:
```bash
cd emotional-chatbot-backend
```

2. Configurar variables de entorno:
```bash
export DB_HOST=localhost
export DB_PORT=5432
export DB_NAME=emotional_chatbot
export DB_USER=postgres
export DB_PASSWORD=postgres
export JWT_SECRET='CAMBIAR_ESTE_SECRETO_EN_PRODUCCION'
export JWT_EXPIRATION_MS=86400000
```

3. Ejecutar backend:
```bash
sh mvnw spring-boot:run
```

4. (Opcional) validar compilación/tests:
```bash
MAVEN_USER_HOME=.m2 sh mvnw -Dmaven.repo.local=.m2/repository test
```

## Flujo de demo sugerido para el profesor
1. Levantar PostgreSQL y crear base `emotional_chatbot`.
2. Levantar backend (`sh mvnw spring-boot:run`).
3. Registrar usuario (`POST /auth/register`).
4. Iniciar sesión (`POST /auth/login`).
5. Enviar mensaje emocional (`POST /conversations/analyze` con token JWT).
6. Ver respuesta con emoción predominante + porcentajes + disclaimer no clínico.
7. Consultar historial (`GET /conversations/history`) para evidenciar persistencia.

## Pendientes para el 19 de junio
1. Implementar WebSocket para flujo en tiempo real (RF-05 y parte de RF-08 por eventos).
2. Incorporar OAuth 2.0 opcional (RF-02, RF-04).
3. Mejorar NLP (más allá de reglas por palabras clave).
4. Integrar frontend completo y UX final.
5. Agregar pruebas automatizadas más robustas y, de ser posible, migraciones versionadas.

## Riesgos
- Dependencia de configuración correcta de PostgreSQL local para demo.
- Falta de WebSocket (se cubrió con REST para cumplir MVP del 29).
- Clasificación emocional actual es básica (determinística) y requiere evolución.
- Se debe asegurar `JWT_SECRET` fuerte en entorno real.

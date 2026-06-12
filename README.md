# Emotional Chatbot

Chatbot web de apoyo emocional inicial desarrollado para Ingenieria de Software II. El sistema recibe mensajes escritos por una persona usuaria, identifica emociones probables, genera una respuesta orientativa y conserva historial de conversaciones por usuario autenticado.

> Este proyecto no realiza diagnosticos clinicos ni reemplaza atencion psicologica, medica o profesional. Las respuestas son de orientacion general.

## Estado actual

El repositorio contiene tres componentes principales:

| Componente | Carpeta | Tecnologia | Estado |
| --- | --- | --- | --- |
| Backend API | `emotional-chatbot-backend/` | Java 21, Spring Boot 3.5.14, Spring Security, JPA | Registro, login, JWT, analisis, historial y persistencia |
| Frontend web | `emotional-chatbot-frontend/` | Astro, React, TypeScript, Tailwind CSS | Interfaz de autenticacion, conversacion, historial e insights |
| Servicio IA | `ia-service/` | FastAPI, Transformers, PyTorch | Clasificacion emocional con modelo de Hugging Face |

Tambien hay documentacion de entrega en `docs/entrega-2026-05-29/` y un PDF tecnico en la raiz del repositorio.

## Funcionalidades implementadas

- Registro e inicio de sesion con contrasenas cifradas usando BCrypt.
- Emision y validacion de tokens JWT.
- Endpoints protegidos para analizar mensajes y consultar historial.
- Persistencia JPA de usuarios y conversaciones.
- Integracion del backend con un microservicio IA por HTTP.
- Fallback local deterministico si el servicio IA no esta disponible.
- Frontend modular con separacion por dominio, aplicacion, infraestructura y presentacion.
- Mensajes con advertencia etica de no diagnostico.

## Arquitectura

```text
emotional-chatbot-frontend
        |
        | HTTP / JSON
        v
emotional-chatbot-backend
        |
        | HTTP / JSON
        v
ia-service
```

El backend es el punto central del sistema: autentica usuarios, protege rutas, llama al servicio IA cuando esta disponible, aplica fallback local si falla la integracion y guarda las conversaciones.

## Requisitos

- Java 21.
- Maven Wrapper incluido en `emotional-chatbot-backend/`.
- Node.js 22.12 o superior.
- pnpm 11 o superior.
- Python 3.10 o superior.
- PostgreSQL si se quiere persistencia en base externa.

Para una demo rapida, el backend puede iniciar con H2 en memoria porque `application.yml` trae una URL por defecto. Para una demo con persistencia real, configurar PostgreSQL.

## Variables de entorno

### Backend

El backend lee estas variables:

```env
SERVER_PORT=8080
DB_URL=jdbc:postgresql://localhost:5432/emotional_chatbot
DB_USER=postgres
DB_PASSWORD=postgres
JWT_SECRET=CAMBIAR_ESTE_SECRETO_EN_PRODUCCION
JWT_EXPIRATION_MS=86400000
IA_SERVICE_BASE_URL=http://localhost:8000
CORS_ALLOWED_ORIGINS=http://localhost:4321,http://localhost:3000,http://localhost:5173
```

Si `DB_URL` no se define, se usa H2 en memoria:

```text
jdbc:h2:mem:emotional_chatbot;DB_CLOSE_DELAY=-1;MODE=PostgreSQL
```

Nota: la configuracion actual usa `spring.jpa.hibernate.ddl-auto=create`, por lo que la base puede recrearse al iniciar. Para un entorno estable conviene migrar a Flyway o Liquibase y cambiar esa estrategia.

### Frontend

Crear `emotional-chatbot-frontend/.env`:

```env
PUBLIC_API_BASE_URL=http://localhost:8080
```

## Ejecucion local

Se recomienda abrir tres terminales desde la raiz del repositorio.

### 1. Servicio IA

```bash
cd ia-service
python -m pip install -r requirements.txt
python -m uvicorn app.main:app --reload --host 127.0.0.1 --port 8000
```

URLs utiles:

- `http://localhost:8000/`
- `http://localhost:8000/docs`

El backend tambien puede funcionar sin este servicio usando el analisis local de respaldo.

### 2. Backend

```bash
cd emotional-chatbot-backend
sh mvnw spring-boot:run
```

Para compilar:

```bash
cd emotional-chatbot-backend
sh mvnw clean package
```

Para ejecutar pruebas, cuando existan pruebas automatizadas:

```bash
cd emotional-chatbot-backend
sh mvnw test
```

### 3. Frontend

```bash
cd emotional-chatbot-frontend
pnpm install
pnpm dev
```

URL por defecto de Astro:

```text
http://localhost:4321
```

Build de produccion:

```bash
cd emotional-chatbot-frontend
pnpm build
pnpm preview
```

## Endpoints principales

Base URL del backend:

```text
http://localhost:8080
```

### Registro

```http
POST /api/auth/register
Content-Type: application/json
```

```json
{
  "nombre": "Ana Perez",
  "correo": "ana@example.com",
  "password": "ClaveSegura123"
}
```

Respuesta esperada:

```json
{
  "message": "Usuario registrado correctamente"
}
```

### Login

```http
POST /api/auth/login
Content-Type: application/json
```

```json
{
  "correo": "ana@example.com",
  "password": "ClaveSegura123"
}
```

Respuesta esperada:

```json
{
  "token": "<JWT>",
  "type": "Bearer"
}
```

### Analizar mensaje

```http
POST /conversations/analyze
Authorization: Bearer <JWT>
Content-Type: application/json
```

```json
{
  "userMessage": "me siento muy cansada y ansiosa ultimamente"
}
```

Respuesta esperada:

```json
{
  "conversationId": 1,
  "userMessage": "me siento muy cansada y ansiosa ultimamente",
  "analysis": {
    "dominantEmotion": "ansiedad",
    "emotions": [
      {
        "name": "ansiedad",
        "percentage": 50
      },
      {
        "name": "estres",
        "percentage": 50
      }
    ]
  },
  "botResponse": "Parece que podrias estar experimentando ansiedad. Esta orientacion no es un diagnostico. Intenta respirar de forma pausada y buscar apoyo cercano si lo necesitas.",
  "disclaimer": "Este sistema no realiza diagnosticos clinicos ni reemplaza la atencion profesional.",
  "createdAt": "2026-06-12T10:30:00"
}
```

### Historial

```http
GET /conversations/history
Authorization: Bearer <JWT>
```

Devuelve las conversaciones del usuario autenticado en orden cronologico.

## Servicio IA

El microservicio de IA expone:

- `POST /chat/message`: endpoint usado por el backend.
- `POST /ia/analyze`: analisis emocional directo.
- `GET /`: verificacion basica del servicio.

Modelo configurado:

```text
j-hartmann/emotion-english-distilroberta-base
```s

El servicio traduce/procesa el texto y devuelve emocion dominante, porcentajes, recomendacion y advertencia de no diagnostico.

## Persistencia

Tablas principales del flujo actual:

- `usuarios`: datos de cuenta, correo unico, password cifrado y fecha de creacion.
- `conversaciones`: mensaje del usuario, respuesta del bot, emocion dominante, emociones serializadas, porcentajes serializados y fecha de creacion.

Aunque quedan clases antiguas relacionadas con MongoDB en el paquete `chat`, la configuracion activa deshabilita Mongo y el flujo principal usa JPA.

## Estructura del repositorio

```text
.
|-- emotional-chatbot-backend/
|   |-- src/main/java/.../auth
|   |-- src/main/java/.../conversation
|   |-- src/main/java/.../security
|   |-- src/main/java/.../user
|   `-- src/main/resources/application.yml
|-- emotional-chatbot-frontend/
|   |-- src/domain
|   |-- src/application
|   |-- src/infrastructure
|   `-- src/presentation
|-- ia-service/
|   `-- app/
|-- docs/
|   `-- entrega-2026-05-29/
`-- Documentacion_Tecnica_Emotional_Chatbot.pdf
```
# Ejemplos Postman — Entrega 29 de mayo de 2026

Base URL sugerida:
```text
http://localhost:8080
```

## 1) Registro de usuario

### Request
`POST /auth/register`

```json
{
  "nombre": "Ana Perez",
  "correo": "ana@example.com",
  "password": "ClaveSegura123"
}
```

### Response esperada (201)
```json
{
  "message": "Usuario registrado correctamente"
}
```

## 2) Login

### Request
`POST /auth/login`

```json
{
  "correo": "ana@example.com",
  "password": "ClaveSegura123"
}
```

### Response esperada (200)
```json
{
  "token": "<JWT>",
  "type": "Bearer"
}
```

Guardar token para siguientes requests.

## 3) Analizar mensaje emocional

### Request
`POST /conversations/analyze`

Headers:
```text
Authorization: Bearer <JWT>
Content-Type: application/json
```

Body:
```json
{
  "userMessage": "me siento muy cansado y ansioso"
}
```

### Response esperada (200)
```json
{
  "conversationId": 1,
  "userMessage": "me siento muy cansado y ansioso",
  "analysis": {
    "dominantEmotion": "ansiedad",
    "emotions": [
      { "name": "ansiedad", "percentage": 50 },
      { "name": "estres", "percentage": 50 }
    ]
  },
  "botResponse": "Parece que podrías estar experimentando ansiedad. Esta orientación no es un diagnóstico. Intenta respirar de forma pausada y buscar apoyo cercano si lo necesitas.",
  "disclaimer": "Este sistema no realiza diagnósticos clínicos ni reemplaza la atención profesional.",
  "createdAt": "2026-05-25T10:30:00"
}
```

## 4) Consultar historial

### Request
`GET /conversations/history`

Headers:
```text
Authorization: Bearer <JWT>
```

### Response esperada (200)
```json
[
  {
    "conversationId": 1,
    "userMessage": "me siento muy cansado y ansioso",
    "analysis": {
      "dominantEmotion": "ansiedad",
      "emotions": [
        { "name": "ansiedad", "percentage": 50 },
        { "name": "estres", "percentage": 50 }
      ]
    },
    "botResponse": "Parece que podrías estar experimentando ansiedad. Esta orientación no es un diagnóstico. Intenta respirar de forma pausada y buscar apoyo cercano si lo necesitas.",
    "disclaimer": "Este sistema no realiza diagnósticos clínicos ni reemplaza la atención profesional.",
    "createdAt": "2026-05-25T10:30:00"
  }
]
```

## 5) Ejemplos de error

### Sin token en endpoint protegido
`POST /conversations/analyze`

Respuesta esperada (401):
```json
{
  "error": "No autorizado",
  "message": "Token ausente o inválido"
}
```

### Credenciales inválidas
`POST /auth/login`

Respuesta esperada (401):
```json
{
  "timestamp": "2026-05-25T10:45:00",
  "status": 401,
  "message": "Credenciales inválidas"
}
```

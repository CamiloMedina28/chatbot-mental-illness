# IA Service

Microservicio encargado del análisis emocional de mensajes para el proyecto de clasificación de enfermedades mentales.

## Tecnologías

* FastAPI
* Hugging Face Transformers
* PyTorch
* Deep Translator

Modelo utilizado:

```text
j-hartmann/emotion-english-distilroberta-base
```

---

## Ejecución

```bash
pip install -r requirements.txt
```

```bash
python -m uvicorn app.main:app --reload
```

Documentación Swagger:

```text
http://localhost:8000/docs
```

---

## Endpoint Principal

### POST /chat/message

Analiza un mensaje y retorna la emoción predominante, las probabilidades asociadas y una recomendación orientativa.

### Request

```json
{
  "message": "Me siento triste y solo últimamente"
}
```

### Response

```json
{
  "message": "Me siento triste y solo últimamente",
  "dominant_emotion": "sadness",
  "emotions": {
    "sadness": 82.3,
    "fear": 10.2,
    "anger": 4.1,
    "joy": 3.4
  },
  "recommendation": "Parece que predominan emociones relacionadas con tristeza...",
  "warning": "Esta herramienta proporciona orientación emocional general y no constituye un diagnóstico clínico."
}
```

## Integración

El backend principal debe consumir el endpoint:

```http
POST /chat/message
```

y utilizar la respuesta para persistencia, historial y comunicación con el frontend.

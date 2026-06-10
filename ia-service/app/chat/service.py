from app.ia.service import ia_service


class ChatService:

    RESPONSES = {
        "sadness": (
            "Parece que predominan emociones relacionadas con tristeza. "
            "Considera hablar con alguien de confianza y realizar actividades que te resulten agradables."
        ),
        "fear": (
            "Detecto emociones relacionadas con miedo o preocupación. "
            "Puede ayudar enfocarte en aquello que puedes controlar en este momento."
        ),
        "anger": (
            "Se observan emociones asociadas con enojo o frustración. "
            "Tomar una pausa y reflexionar sobre la situación puede ser útil."
        ),
        "joy": (
            "Tu mensaje refleja emociones positivas. "
            "Es valioso reconocer aquello que está contribuyendo a tu bienestar."
        ),
        "surprise": (
            "Parece haber elementos inesperados en la situación que describes."
        ),
        "disgust": (
            "Tu mensaje refleja una reacción negativa hacia una situación específica."
        ),
        "neutral": (
            "No fue posible identificar una emoción predominante con claridad."
        )
    }

    def process_message(self, message: str):

        analysis = ia_service.analyze_emotions(message)

        dominant = analysis["dominant_emotion"]

        recommendation = self.RESPONSES.get(
            dominant,
            self.RESPONSES["neutral"]
        )

        return {
            "message": message,
            "dominant_emotion": dominant,
            "emotions": analysis["emotions"],
            "recommendation": recommendation,
            "warning": "Esta herramienta proporciona orientación emocional general y no constituye un diagnóstico clínico."
        }


chat_service = ChatService()
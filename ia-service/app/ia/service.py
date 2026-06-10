from transformers import pipeline
from deep_translator import GoogleTranslator


class IAService:
    def __init__(self):
        self.classifier = pipeline(
            "text-classification",
            model="j-hartmann/emotion-english-distilroberta-base",
            top_k=None
        )

    def analyze_emotions(self, text: str):

        translated_text = GoogleTranslator(
            source="auto",
            target="en"
        ).translate(text)

        result = self.classifier(translated_text)[0]

        emotions = {
            item["label"]: round(item["score"] * 100, 2)
            for item in result
        }

        dominant_emotion = max(
            emotions,
            key=emotions.get
        )

        return {
            "original_text": text,
            "translated_text": translated_text,
            "dominant_emotion": dominant_emotion,
            "emotions": emotions
        }


ia_service = IAService()
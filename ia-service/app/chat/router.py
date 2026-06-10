from fastapi import APIRouter
from pydantic import BaseModel

from app.chat.service import chat_service

router = APIRouter(
    prefix="/chat",
    tags=["Chat"]
)


class ChatRequest(BaseModel):
    message: str


@router.post("/message")
def chat(request: ChatRequest):
    return chat_service.process_message(
        request.message
    )
from fastapi import APIRouter
from pydantic import BaseModel

from app.ia.service import ia_service

router = APIRouter(
    prefix="/ia",
    tags=["IA"]
)


class AnalyzeRequest(BaseModel):
    message: str


@router.post("/analyze")
def analyze(request: AnalyzeRequest):
    return ia_service.analyze_emotions(
        request.message
    )
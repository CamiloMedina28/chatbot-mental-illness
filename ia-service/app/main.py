from fastapi import FastAPI

from app.chat.router import router as chat_router
from app.ia.router import router as ia_router

app = FastAPI(
    title="Mental Health IA Service",
    version="1.0.0"
)

app.include_router(chat_router)
app.include_router(ia_router)


@app.get("/")
def root():
    return {"message": "IA Service Running"}
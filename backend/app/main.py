from fastapi import FastAPI
from routes import auth, games, news, events  # <-- 1. Importamos events

app = FastAPI(title="Game-Hub & Services Ecosystem API", version="1.0")

# Registramos todos tus módulos
app.include_router(auth.router)
app.include_router(games.router)
app.include_router(news.router)
app.include_router(events.router)       # <-- 2. Añadimos el router del calendario

@app.get("/")
def read_root():
    return {"status": "Online", "message": "Servidor Backend de Miguel 100% completado"}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)
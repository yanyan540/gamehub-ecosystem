from fastapi import FastAPI
from routes import auth, games, news, events
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI(title="Game-Hub & Services Ecosystem API", version="1.0")

# Middleware para permitir que el Frontend (React/Vue/etc.) se conecte sin bloqueos CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Permite que el puerto 5173 (y cualquiera) se conecte
    allow_credentials=True,
    allow_methods=["*"],  # Permite GET, POST, PUT, DELETE
    allow_headers=["*"],
)

# Registramos todos tus módulos
app.include_router(auth.router)
app.include_router(games.router)
app.include_router(news.router)
app.include_router(events.router)

@app.get("/")
def read_root():
    return {"status": "Online", "message": "Servidor Backend de Miguel 100% completado"}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)
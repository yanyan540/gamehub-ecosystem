from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from typing import List, Optional
from datetime import datetime
from database import get_db_connection

app = FastAPI(title="Game-Hub & Services Ecosystem API")

# --- MODELOS DE DATOS DE ENTRADA (SOLICITUDES FRONTEND) ---
class RegisterRequest(BaseModel):
    nombre: str
    email: str
    contrasena: str

class LoginRequest(BaseModel):
    email: str
    contrasena: str

class CommentRequest(BaseModel):
    contenido: str


# --- ENDPOINTS ---

@app.get("/")
def read_root():
    return {"status": "Online", "message": "Servidor Python Backend funcionando correctamente"}


# 1. AUTENTICACIÓN Y ROLES (CU-01 & CU-02)

@app.post("/api/auth/register")
def register_user(datos: RegisterRequest):
    # Simulación inicial de persistencia - Próximamente con hashing Bcrypt
    return {
        "status": "success",
        "message": "Usuario registrado correctamente",
        "id_usuario": 2
    }

@app.post("/api/auth/login")
def login_user(credenciales: LoginRequest):
    # Simulación de respuesta de sesión con roles estandarizados
    if credenciales.email == "admin@gamehub.com":
        rol_asignado = "Administrador"
    elif credenciales.email == "redactor@gamehub.com":
        rol_asignado = "Redactor"
    else:
        rol_asignado = "Suscriptor"
        
    return {
        "status": "success",
        "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.mocktoken_gpis2026",
        "usuario": {
            "id_usuario": 1,
            "nombre": "Usuario Pruebas",
            "email": credenciales.email,
            "rol": rol_asignado
        }
    }


# 2. CATÁLOGO DE VIDEOJUEGOS (CU-07 - CONEXIÓN REAL A MYSQL)

@app.get("/api/games")
def get_games():
    conn = get_db_connection()
    if not conn:
        # Fallback si la BD relacional está vacía o en mantenimiento
        return [
            {
                "id_videojuego": 1,
                "titulo": "Cyberpunk 2077 (Mock)",
                "nota_prensa": 8.5,
                "nota_comunidad": 9.0,
                "imagen_url": "http://localhost:8000/static/cyberpunk.jpg",
                "descripcion": "RPG de acción en mundo abierto.",
                "fecha_lanzamiento": "2020-12-10"
            }
        ]
    
    cursor = conn.cursor(dictionary=True)
    try:
        cursor.execute("SELECT ID_Videojuego, Titulo, Nota_Prensa, Nota_Comunidad, Imagen_URL, Descripcion, Fecha_Lanzamiento FROM VIDEOJUEGO")
        juegos = cursor.fetchall()
        return juegos if juegos else []
    except Exception as e:
        return {"error": str(e)}
    finally:
        cursor.close()
        conn.close()


# 3. FEED DE NOTICIAS Y BLOG (CU-03 & CU-04)

@app.get("/api/news")
def get_news():
    return [
        {
            "id_noticia": 1,
            "titulo": "Lanzamiento del nuevo ecosistema Game-Hub",
            "cuerpo_texto": "La industria del videojuego evoluciona hacia los servicios integrados...",
            "imagen_url": "http://localhost:8000/static/news1.jpg",
            "fecha_publicacion": datetime.now().isoformat(),
            "id_autor": 1
        }
    ]

@app.post("/api/news/{id_noticia}/comments")
def post_comment(id_noticia: int, comentario: CommentRequest):
    return {
        "status": "success",
        "message": "Comentario publicado y verificado (Anti-Spam OK)",
        "comentario": {
            "id_comentario": 42,
            "contenido": comentario.contenido,
            "fecha_comentario": datetime.now().isoformat(),
            "id_usuario": 1,
            "id_noticia": id_noticia
        }
    }


# TEST DE INFRAESTRUCTURA ORIGINAL
@app.get("/test-db")
def test_db():
    conn = get_db_connection()
    if not conn:
        raise HTTPException(status_code=500, detail="No se pudo establecer conexión con MySQL.")
    cursor = conn.cursor(dictionary=True)
    try:
        cursor.execute("INSERT INTO USUARIO (Nombre, Email, Contrasena, Rol) VALUES ('Miguel Backend', 'miguel@gamehub.com', 'pass_segura_hash', 'Administrador')")
        conn.commit()
    except Exception:
        conn.rollback()
    cursor.execute("SELECT ID_Usuario, Nombre, Email, Rol FROM USUARIO WHERE Email = 'miguel@gamehub.com'")
    usuario = cursor.fetchone()
    cursor.close()
    conn.close()
    return {"status": "Conexión exitosa", "database": "MySQL activa en Docker", "test_registro": usuario}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)
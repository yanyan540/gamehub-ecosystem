from fastapi import APIRouter, HTTPException, status
from pydantic import BaseModel
import hashlib

# Importamos tu conexión a la base de datos
from database import get_db_connection

# Creamos el router (etiquetado para que en Swagger Docs quede agrupado y bonito)
router = APIRouter(
    prefix="/api/auth",
    tags=["Autenticación y Roles"]
)

# Modelos de datos
class UsuarioRegistro(BaseModel):
    nombre: str
    email: str
    contrasena: str

class UsuarioLogin(BaseModel):
    email: str
    contrasena: str

# RUTAS (Fíjate que ahora usamos @router en vez de @app y quitamos el /api/auth de la URL porque ya está en el prefix)

@router.post("/register", status_code=status.HTTP_201_CREATED)
def registrar_usuario(usuario: UsuarioRegistro):
    conn = get_db_connection()
    if not conn:
        raise HTTPException(status_code=500, detail="Error de conexión con la base de datos.")
    
    cursor = conn.cursor(dictionary=True)
    try:
        cursor.execute("SELECT ID_Usuario FROM USUARIO WHERE Email = %s", (usuario.email,))
        if cursor.fetchone():
            raise HTTPException(status_code=400, detail="El correo electrónico ya está registrado.")
        
        password_hash = hashlib.sha256(usuario.contrasena.encode('utf-8')).hexdigest()
        
        query = "INSERT INTO USUARIO (Nombre, Email, Contrasena, Rol) VALUES (%s, %s, %s, 'Suscriptor')"
        cursor.execute(query, (usuario.nombre, usuario.email, password_hash))
        conn.commit()
        
        return {
            "status": "success",
            "message": "Usuario registrado correctamente en GameHub",
            "id_usuario": cursor.lastrowid
        }
    except HTTPException as http_err:
        raise http_err
    except Exception as e:
        conn.rollback()
        raise HTTPException(status_code=500, detail=f"Error interno: {str(e)}")
    finally:
        cursor.close()
        conn.close()

@router.post("/login")
def login_usuario(credenciales: UsuarioLogin):
    conn = get_db_connection()
    if not conn:
        raise HTTPException(status_code=500, detail="Error de conexión con la base de datos.")
    
    cursor = conn.cursor(dictionary=True)
    try:
        cursor.execute("SELECT ID_Usuario, Nombre, Email, Contrasena, Rol FROM USUARIO WHERE Email = %s", (credenciales.email,))
        usuario = cursor.fetchone()
        
        if not usuario:
            raise HTTPException(status_code=401, detail="Credenciales incorrectas.")
        
        password_hash_recibido = hashlib.sha256(credenciales.contrasena.encode('utf-8')).hexdigest()
        
        if password_hash_recibido != usuario["Contrasena"]:
            raise HTTPException(status_code=401, detail="Credenciales incorrectas.")
            
        return {
            "status": "success",
            "message": "Sesión iniciada correctamente",
            "usuario": {
                "id_usuario": usuario["ID_Usuario"],
                "nombre": usuario["Nombre"],
                "email": usuario["Email"],
                "rol": usuario["Rol"]
            }
        }
    except HTTPException as http_err:
        raise http_err
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error interno: {str(e)}")
    finally:
        cursor.close()
        conn.close()
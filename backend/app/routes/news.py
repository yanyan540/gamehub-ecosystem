from fastapi import APIRouter, HTTPException, status
from pydantic import BaseModel
from database import get_db_connection

router = APIRouter(
    prefix="/api/news",
    tags=["Noticias y Comentarios"]
)

# Modelo para recibir los datos del comentario desde el frontend
class ComentarioCrear(BaseModel):
    id_usuario: int
    contenido: str

# --- OBTENER TODAS LAS NOTICIAS (FEED) ---
@router.get("/")
def obtener_noticias():
    conn = get_db_connection()
    if not conn:
        raise HTTPException(status_code=500, detail="Error de conexión con la base de datos.")
    
    cursor = conn.cursor(dictionary=True)
    try:
        cursor.execute("SELECT ID_Noticia, Titulo, Cuerpo_Texto, Imagen_URL, Fecha_Publicacion, ID_Autor FROM NOTICIA")
        noticias = cursor.fetchall()
        return noticias if noticias else []
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error al consultar las noticias: {str(e)}")
    finally:
        cursor.close()
        conn.close()


# --- PUBLICAR UN COMENTARIO EN UNA NOTICIA (CU-04) ---
@router.post("/{id_noticia}/comments", status_code=status.HTTP_201_CREATED)
def publicar_comentario(id_noticia: int, comentario: ComentarioCrear):
    conn = get_db_connection()
    if not conn:
        raise HTTPException(status_code=500, detail="Error de conexión con la base de datos.")
    
    cursor = conn.cursor(dictionary=True)
    try:
        # 1. Comprobamos si la noticia existe antes de dejar comentar
        cursor.execute("SELECT ID_Noticia FROM NOTICIA WHERE ID_Noticia = %s", (id_noticia,))
        if not cursor.fetchone():
            raise HTTPException(status_code=404, detail="La noticia especificada no existe.")
            
        # 2. Insertamos el comentario relacionándolo con el Usuario y la Noticia
        query = """
            INSERT INTO COMENTARIO (Contenido, ID_Usuario, ID_Noticia) 
            VALUES (%s, %s, %s)
        """
        cursor.execute(query, (comentario.contenido, comentario.id_usuario, id_noticia))
        conn.commit()
        
        return {
            "status": "success",
            "message": "Comentario publicado correctamente",
            "id_comentario": cursor.lastrowid
        }
        
    except HTTPException as http_err:
        raise http_err
    except Exception as e:
        conn.rollback()
        raise HTTPException(status_code=500, detail=f"Error al publicar el comentario: {str(e)}")
    finally:
        cursor.close()
        conn.close()
from fastapi import APIRouter, HTTPException, status
from database import get_db_connection

router = APIRouter(
    prefix="/api/games",
    tags=["Catálogo de Videojuegos"]
)

# --- OBTENER TODOS LOS VIDEOJUEGOS (Listados y Valoraciones) ---
@router.get("/")
def obtener_catalogo():
    conn = get_db_connection()
    if not conn:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Error de conexión con la base de datos."
        )
    
    cursor = conn.cursor(dictionary=True)
    try:
        # Seleccionamos las columnas de la tabla mapeando las notas de prensa y comunidad
        query = """
            SELECT ID_Videojuego, Titulo, Nota_Prensa, Nota_Comunidad, Imagen_URL, Descripcion 
            FROM VIDEOJUEGO
        """
        cursor.execute(query)
        juegos = cursor.fetchall()
        
        # Si la tabla está vacía, devolvemos una lista vacía para que el frontend de Ian no rompa
        return juegos if juegos else []
        
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Error al consultar el catálogo: {str(e)}"
        )
    finally:
        cursor.close()
        conn.close()


# --- OBTENER DETALLE DE UN JUEGO (6.3.3 Integración multimedia externo) ---
@router.get("/{id_videojuego}")
def obtener_detalle_juego(id_videojuego: int):
    conn = get_db_connection()
    if not conn:
        raise HTTPException(status_code=500, detail="Error de conexión con la base de datos.")
    
    cursor = conn.cursor(dictionary=True)
    try:
        # Aquí incluimos de forma explícita los recursos multimedia externos (Trailers/Streams)
        query = """
            SELECT ID_Videojuego, Titulo, Nota_Prensa, Nota_Comunidad, Imagen_URL, Descripcion, 
                   Fecha_Lanzamiento, Trailer_URL, Stream_URL 
            FROM VIDEOJUEGO 
            WHERE ID_Videojuego = %s
        """
        cursor.execute(query, (id_videojuego,))
        juego = cursor.fetchone()
        
        if not juego:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail=f"Videojuego con ID {id_videojuego} no encontrado."
            )
            
        return juego
        
    except HTTPException as http_err:
        raise http_err
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Error al consultar el videojuego: {str(e)}"
        )
    finally:
        cursor.close()
        conn.close()
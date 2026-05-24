from fastapi import APIRouter, HTTPException, status
from database import get_db_connection

router = APIRouter(
    prefix="/api/events",
    tags=["Calendario de Eventos"]
)

# --- OBTENER TODOS LOS EVENTOS DEL CALENDARIO ---
@router.get("/")
def obtener_eventos():
    conn = get_db_connection()
    if not conn:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Error de conexión con la base de datos."
        )
    
    cursor = conn.cursor(dictionary=True)
    try:
        # Asumimos la estructura básica de eventos en tu base de datos relacional.
        # Ordenamos por fecha ascendente (los más próximos primero)
        query = """
            SELECT ID_Evento, Titulo, Descripcion, Fecha_Inicio, Fecha_Fin, Tipo 
            FROM EVENTO 
            ORDER BY Fecha_Inicio ASC
        """
        cursor.execute(query)
        eventos = cursor.fetchall()
        
        return eventos if eventos else []
        
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Error al consultar el calendario: {str(e)}"
        )
    finally:
        cursor.close()
        conn.close()
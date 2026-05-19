from fastapi import FastAPI, HTTPException
# Importamos la función que creaste en database.py
from database import get_db_connection

app = FastAPI(title="Game-Hub & Services Ecosystem API")

@app.get("/")
def read_root():
    return {"status": "Online", "message": "Servidor Python Backend funcionando correctamente"}

# Añadimos la ruta de prueba que te faltaba
@app.get("/test-db")
def test_db():
    conn = get_db_connection()
    if not conn:
        raise HTTPException(status_code=500, detail="No se pudo establecer conexión con MySQL.")
    
    cursor = conn.cursor(dictionary=True)
    try:
        # Insertamos un usuario inicial de prueba cumpliendo con el CU-01
        cursor.execute("""
            INSERT INTO USUARIO (Nombre, Email, Contrasena, Rol) 
            VALUES ('Miguel Backend', 'miguel@gamehub.com', 'pass_segura_hash', 'Administrador')
        """)
        conn.commit()
        
        # Consultamos el registro insertado para verificar la persistencia
        cursor.execute("SELECT ID_Usuario, Nombre, Email, Rol FROM USUARIO WHERE Email = 'miguel@gamehub.com'")
        usuario = cursor.fetchone()
        
        return {
            "status": "Conexión exitosa",
            "database": "MySQL activa en Docker",
            "test_registro": usuario
        }
    except Exception as e:
        conn.rollback()
        return {"status": "Error en la operación", "detalle": str(e)}
    finally:
        cursor.close()
        conn.close()

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)
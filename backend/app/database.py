import mysql.connector
from mysql.connector import Error

def get_db_connection():
    try:
        # 'db' es el nombre del servicio de la base de datos dentro de docker-compose
        connection = mysql.connector.connect(
            host="db",
            user="root",
            password="root_password",
            database="gamehub"
        )
        if connection.is_connected():
            return connection
    except Error as e:
        print(f"Error al conectar a MySQL: {e}")
        return None
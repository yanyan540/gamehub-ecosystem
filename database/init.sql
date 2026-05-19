CREATE DATABASE IF NOT EXISTS gamehub;
USE gamehub;

-- Tabla USUARIO
CREATE TABLE USUARIO (
    ID_Usuario INT AUTO_INCREMENT PRIMARY KEY,
    Nombre VARCHAR(100) NOT NULL,
    Email VARCHAR(150) UNIQUE NOT NULL,
    Contrasena VARCHAR(255) NOT NULL,
    Rol VARCHAR(20) NOT NULL CHECK (Rol IN ('Administrador', 'Redactor', 'Colaborador', 'Suscriptor')),
    Fecha_Registro DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Tabla VIDEOJUEGO (Actualizada con campos multimedia para el pto 6.3.3)
CREATE TABLE VIDEOJUEGO (
    ID_Videojuego INT AUTO_INCREMENT PRIMARY KEY,
    Titulo VARCHAR(150) NOT NULL,
    Nota_Prensa FLOAT CHECK (Nota_Prensa >= 0 AND Nota_Prensa <= 10),
    Nota_Comunidad FLOAT CHECK (Nota_Comunidad >= 0 AND Nota_Comunidad <= 10),
    Imagen_URL VARCHAR(255),
    Descripcion TEXT,
    Fecha_Lanzamiento DATE,
    Trailer_URL VARCHAR(255),  -- Añadido para events.py
    Stream_URL VARCHAR(255)    -- Añadido para events.py
);

-- Tabla NOTICIA
CREATE TABLE NOTICIA (
    ID_Noticia INT AUTO_INCREMENT PRIMARY KEY,
    Titulo VARCHAR(200) NOT NULL,
    Cuerpo_Texto TEXT NOT NULL,
    Imagen_URL VARCHAR(255),
    Fecha_Publicacion DATETIME DEFAULT CURRENT_TIMESTAMP,
    ID_Autor INT,
    FOREIGN KEY (ID_Autor) REFERENCES USUARIO(ID_Usuario) ON DELETE SET NULL
);

-- Tabla COMENTARIO
CREATE TABLE COMENTARIO (
    ID_Comentario INT AUTO_INCREMENT PRIMARY KEY,
    Contenido TEXT NOT NULL,
    Fecha_Comentario DATETIME DEFAULT CURRENT_TIMESTAMP,
    ID_Usuario INT,
    ID_Noticia INT,
    FOREIGN KEY (ID_Usuario) REFERENCES USUARIO(ID_Usuario) ON DELETE CASCADE,
    FOREIGN KEY (ID_Noticia) REFERENCES NOTICIA(ID_Noticia) ON DELETE CASCADE
);

-- Tabla EVENTO (Nueva tabla para el Calendario Lúdico)
CREATE TABLE EVENTO (
    ID_Evento INT AUTO_INCREMENT PRIMARY KEY,
    Titulo VARCHAR(150) NOT NULL,
    Descripcion TEXT,
    Fecha_Inicio DATETIME NOT NULL,
    Fecha_Fin DATETIME,
    Tipo VARCHAR(50) -- Ej: 'Torneo', 'Lanzamiento', 'Directo Twitch'
);
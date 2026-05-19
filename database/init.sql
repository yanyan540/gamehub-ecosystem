CREATE DATABASE IF NOT EXISTS gamehub;
USE gamehub;

-- Tabla USUARIO
CREATE TABLE USUARIO (
    ID_Usuario INT AUTO_INCREMENT PRIMARY KEY,
    Nombre VARCHAR(100) NOT NULL,
    Email VARCHAR(150) UNIQUE NOT NULL, -- Restricción UNIQUE [cite: 663]
    Contrasena VARCHAR(255) NOT NULL, -- Obligatorio [cite: 660]
    Rol VARCHAR(20) NOT NULL CHECK (Rol IN ('Administrador', 'Redactor', 'Colaborador', 'Suscriptor')), -- Restricción de Dominio [cite: 666]
    Fecha_Registro DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Tabla VIDEOJUEGO
CREATE TABLE VIDEOJUEGO (
    ID_Videojuego INT AUTO_INCREMENT PRIMARY KEY,
    Titulo VARCHAR(150) NOT NULL, -- Obligatorio [cite: 661]
    Nota_Prensa FLOAT CHECK (Nota_Prensa >= 0 AND Nota_Prensa <= 10), -- Valores entre 0 y 10 [cite: 665]
    Nota_Comunidad FLOAT CHECK (Nota_Comunidad >= 0 AND Nota_Comunidad <= 10), -- Valores entre 0 y 10 [cite: 665]
    Imagen_URL VARCHAR(255),
    Descripcion TEXT,
    Fecha_Lanzamiento DATE
);

-- Tabla NOTICIA
CREATE TABLE NOTICIA (
    ID_Noticia INT AUTO_INCREMENT PRIMARY KEY,
    Titulo VARCHAR(200) NOT NULL, -- Obligatorio [cite: 661]
    Cuerpo_Texto TEXT NOT NULL, -- Obligatorio [cite: 661]
    Imagen_URL VARCHAR(255),
    Fecha_Publicacion DATETIME DEFAULT CURRENT_TIMESTAMP,
    ID_Autor INT,
    FOREIGN KEY (ID_Autor) REFERENCES USUARIO(ID_Usuario) ON DELETE SET NULL -- Política de borrado [cite: 669]
);

-- Tabla COMENTARIO
CREATE TABLE COMENTARIO (
    ID_Comentario INT AUTO_INCREMENT PRIMARY KEY,
    Contenido TEXT NOT NULL, -- Obligatorio [cite: 662]
    Fecha_Comentario DATETIME DEFAULT CURRENT_TIMESTAMP,
    ID_Usuario INT,
    ID_Noticia INT,
    FOREIGN KEY (ID_Usuario) REFERENCES USUARIO(ID_Usuario) ON DELETE CASCADE, -- Política de borrado [cite: 668]
    FOREIGN KEY (ID_Noticia) REFERENCES NOTICIA(ID_Noticia) ON DELETE CASCADE -- Política de borrado [cite: 668]
);
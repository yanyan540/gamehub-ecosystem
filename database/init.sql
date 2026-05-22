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

-- ==========================================
-- SEMILLAS DE DATOS (SEEDS) PARA PRUEBAS
-- ==========================================

-- 1. Usuarios (Contraseña para todos: password123 -> Hash SHA-256 irreversible)
INSERT INTO USUARIO (Nombre, Email, Contrasena, Rol) VALUES
('Admin Master', 'admin@gamehub.com', 'ef92b778bafe771e89245b89ecbc09a44a4e166c06659911881f383d4473e94f', 'Administrador'),
('Paco Redactor', 'redactor@gamehub.com', 'ef92b778bafe771e89245b89ecbc09a44a4e166c06659911881f383d4473e94f', 'Redactor'),
('Jugador Pro', 'suscriptor@gamehub.com', 'ef92b778bafe771e89245b89ecbc09a44a4e166c06659911881f383d4473e94f', 'Suscriptor');

-- 2. Videojuegos (Catálogo e Integración Multimedia)
INSERT INTO VIDEOJUEGO (Titulo, Nota_Prensa, Nota_Comunidad, Imagen_URL, Descripcion, Fecha_Lanzamiento, Trailer_URL, Stream_URL) VALUES
('Cyberpunk 2077', 8.5, 9.0, 'http://localhost:8000/static/cyberpunk.jpg', 'RPG de acción en mundo abierto de CD Projekt Red.', '2020-12-10', 'https://www.youtube.com/watch?v=8X2kIfS6fb8', 'https://www.twitch.tv/cdprojektred'),
('The Witcher 3: Wild Hunt', 9.5, 9.7, 'http://localhost:8000/static/witcher3.jpg', 'Clásico RPG de fantasía y caza de monstruos.', '2015-05-19', 'https://www.youtube.com/watch?v=XHrskkTw9Y4', 'https://www.twitch.tv/twitchgaming'),
('Elden Ring', 9.8, 9.5, 'http://localhost:8000/static/eldenring.jpg', 'Juego de rol de acción desarrollado por FromSoftware.', '2022-02-25', 'https://www.youtube.com/watch?v=E3Huy2cdih0', 'https://www.twitch.tv/esl_es');

-- 3. Noticias (Feed) - Autor ID 2 (Corresponde al Redactor)
INSERT INTO NOTICIA (Titulo, Cuerpo_Texto, Imagen_URL, ID_Autor) VALUES
('Lanzamiento del nuevo ecosistema integrado Game-Hub', 'La industria del videojuego evoluciona con fuerza hacia los entornos integrados de servicios compartidos. Hoy se estrena la fase piloto...', 'http://localhost:8000/static/news1.jpg', 2);

-- 4. Eventos (Calendario)
INSERT INTO EVENTO (Titulo, Descripcion, Fecha_Inicio, Fecha_Fin, Tipo) VALUES
('Torneo de Apertura de Comunidad - GameHub Cup 2026', 'Competición abierta de eSports para inaugurar los sistemas de puntuación compartida.', '2026-06-01 18:00:00', '2026-06-01 22:00:00', 'Torneo');
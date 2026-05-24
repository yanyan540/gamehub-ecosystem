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

-- 2. Videojuegos (Catálogo e Integración Multimedia con portadas reales de Steam)
INSERT INTO VIDEOJUEGO (Titulo, Nota_Prensa, Nota_Comunidad, Imagen_URL, Descripcion, Fecha_Lanzamiento, Trailer_URL, Stream_URL) VALUES
('Cyberpunk 2077', 8.5, 9.0, 'https://cdn.akamai.steamstatic.com/steam/apps/1091500/header.jpg', 'RPG de acción en mundo abierto de CD Projekt Red.', '2020-12-10', 'https://www.youtube.com/watch?v=8X2kIfS6fb8', 'https://www.twitch.tv/cdprojektred'),
('The Witcher 3: Wild Hunt', 9.5, 9.7, 'https://cdn.akamai.steamstatic.com/steam/apps/292030/header.jpg', 'Clásico RPG de fantasía y caza de monstruos.', '2015-05-19', 'https://www.youtube.com/watch?v=XHrskkTw9Y4', 'https://www.twitch.tv/twitchgaming'),
('Elden Ring', 9.8, 9.5, 'https://cdn.akamai.steamstatic.com/steam/apps/1245620/header.jpg', 'Juego de rol de acción desarrollado por FromSoftware.', '2022-02-25', 'https://www.youtube.com/watch?v=E3Huy2cdih0', 'https://www.twitch.tv/esl_es'),
('Baldur''s Gate 3', 9.6, 9.8, 'https://cdn.akamai.steamstatic.com/steam/apps/1086940/header.jpg', 'Un RPG de nueva generación ambientado en los Reinos Olvidados con libertad sin precedentes.', '2023-08-03', 'https://www.youtube.com/watch?v=1T22ksOjsUQ', 'https://www.twitch.tv/larianstudios'),
('Hades', 9.3, 9.5, 'https://cdn.akamai.steamstatic.com/steam/apps/1145360/header.jpg', 'Rogue-like de acción de los creadores de Bastion. Desafía al dios de los muertos.', '2020-09-17', 'https://www.youtube.com/watch?v=mD8x5xAMRQU', 'https://www.twitch.tv/supergiantgames');

-- 3. Noticias (Feed) con imágenes reales
INSERT INTO NOTICIA (Titulo, Cuerpo_Texto, Imagen_URL, ID_Autor) VALUES
('Lanzamiento del nuevo ecosistema integrado Game-Hub', 'La industria del videojuego evoluciona con fuerza hacia los entornos integrados de servicios compartidos. Hoy se estrena la fase piloto de nuestra nueva plataforma diseñada por Miguel e Ian.', 'https://images.unsplash.com/photo-1552820728-8b83bb6b773f?auto=format&fit=crop&w=800&q=80', 2),
('Resumen del State of Play: Novedades de la temporada', 'Ayer vivimos uno de los eventos más esperados del año. Te contamos todo lo que necesitas saber sobre los próximos lanzamientos que llegarán a GameHub.', 'https://images.unsplash.com/photo-1605901309584-818e25960b8f?auto=format&fit=crop&w=800&q=80', 2);

-- 4. Eventos (Calendario completo)
INSERT INTO EVENTO (Titulo, Descripcion, Fecha_Inicio, Fecha_Fin, Tipo) VALUES
('Torneo de Apertura de Comunidad - GameHub Cup 2026', 'Competición abierta de eSports para inaugurar los sistemas de puntuación compartida.', '2026-06-01 18:00:00', '2026-06-01 22:00:00', 'Torneo'),
('Presentación E3 2026 - Co-stream oficial', 'Sigue la conferencia más grande del año en directo con nuestros comentaristas y la comunidad.', '2026-06-15 19:00:00', '2026-06-15 21:00:00', 'Directo Twitch'),
('Speedrun Charity Marathon', 'Maratón benéfica de fin de semana recaudando fondos a contrarreloj para causas sociales.', '2026-07-03 10:00:00', '2026-07-05 23:59:59', 'Evento Benéfico');
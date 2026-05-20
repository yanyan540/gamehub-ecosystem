-- 1. CREACIÓN DE LA TABLA USUARIO
CREATE TABLE USUARIO (
    ID_Usuario INT AUTO_INCREMENT PRIMARY KEY,
    Nombre VARCHAR(100) NOT NULL,
    Email VARCHAR(150) NOT NULL UNIQUE,
    Contrasena VARCHAR(255) NOT NULL,
    Rol ENUM('Administrador', 'Redactor', 'Colaborador', 'Suscriptor') NOT NULL,
    Fecha_Registro DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- 2. CREACIÓN DE LA TABLA VIDEOJUEGO
CREATE TABLE VIDEOJUEGO (
    ID_Videojuego INT AUTO_INCREMENT PRIMARY KEY,
    Titulo VARCHAR(150) NOT NULL,
    Nota_Prensa DECIMAL(4,2) CHECK (Nota_Prensa >= 0 AND Nota_Prensa <= 10),
    Nota_Comunidad DECIMAL(4,2) CHECK (Nota_Comunidad >= 0 AND Nota_Comunidad <= 10),
    Imagen_URL VARCHAR(255),
    Descripcion TEXT,
    Fecha_Lanzamiento DATE
);

-- 3. CREACIÓN DE LA TABLA NOTICIA
CREATE TABLE NOTICIA (
    ID_Noticia INT AUTO_INCREMENT PRIMARY KEY,
    Titulo VARCHAR(200) NOT NULL,
    Cuerpo_Texto TEXT NOT NULL,
    Imagen_URL VARCHAR(255),
    Fecha_Publicacion DATETIME DEFAULT CURRENT_TIMESTAMP,
    ID_Autor INT,
    FOREIGN KEY (ID_Autor) REFERENCES USUARIO(ID_Usuario) ON DELETE SET NULL
);

-- 4. CREACIÓN DE LA TABLA COMENTARIO
CREATE TABLE COMENTARIO (
    ID_Comentario INT AUTO_INCREMENT PRIMARY KEY,
    Contenido TEXT NOT NULL,
    Fecha_Comentario DATETIME DEFAULT CURRENT_TIMESTAMP,
    ID_Usuario INT NOT NULL,
    ID_Noticia INT NOT NULL,
    FOREIGN KEY (ID_Usuario) REFERENCES USUARIO(ID_Usuario) ON DELETE CASCADE,
    FOREIGN KEY (ID_Noticia) REFERENCES NOTICIA(ID_Noticia) ON DELETE CASCADE
);

-- 5. CREACIÓN DE LA TABLA EVENTO
CREATE TABLE EVENTO (
    ID_Evento INT AUTO_INCREMENT PRIMARY KEY,
    Titulo VARCHAR(150) NOT NULL,
    Descripcion TEXT,
    Fecha_Evento DATETIME NOT NULL,
    Tipo VARCHAR(50)
);

-- 6. CREACIÓN DE LA TABLA MENSAJE_CONTACTO
CREATE TABLE MENSAJE_CONTACTO (
    ID_Mensaje INT AUTO_INCREMENT PRIMARY KEY,
    Nombre_Remitente VARCHAR(100) NOT NULL,
    Email_Remitente VARCHAR(150) NOT NULL,
    Asunto VARCHAR(150) NOT NULL,
    Cuerpo_Mensaje TEXT NOT NULL,
    Fecha_Envio DATETIME DEFAULT CURRENT_TIMESTAMP
);


-- =========================================================================
-- DATOS DE PRUEBA (MOCK DATA) BASADOS EN EL DISEÑO DE INTERFAZ (FIGMA)
-- =========================================================================

-- 1. Insertar Usuarios de Prueba (Roles variados)
INSERT INTO USUARIO (Nombre, Email, Contrasena, Rol) VALUES 
('Admin Principal', 'admin@gamehub.com', '$2b$12$hashfalso123', 'Administrador'),
('Ian Garcia', 'ian@gamehub.com', '$2b$12$hashfalso456', 'Redactor'),
('Miguel Pina', 'miguel@gamehub.com', '$2b$12$hashfalso789', 'Colaborador'),
('Ruben Albarran', 'ruben@gamehub.com', '$2b$12$hashfalso000', 'Suscriptor'),
('GamerPro99', 'gamer99@hotmail.com', '$2b$12$hashfalso111', 'Suscriptor');

-- 2. Insertar Videojuegos
-- Nota: Las notas de la comunidad (4.X en Figma) se han escalado sobre 10 para cumplir el CHECK
INSERT INTO VIDEOJUEGO (Titulo, Nota_Prensa, Nota_Comunidad, Descripcion, Fecha_Lanzamiento) VALUES 
('Cyberpunk 2077', 8.5, 9.0, 'RPG de acción en mundo abierto ambientado en la megalópolis de Night City, donde juegas como un mercenario cyberpunk envuelto en una lucha de supervivencia.', '2020-12-10'),
('Elden Ring', 9.6, 9.6, 'Juego de rol y acción de ambientación fantástica oscura desarrollado por FromSoftware y creado en colaboración con George R. R. Martin. Acción sin límites.', '2022-02-25'),
('Call of Duty: Warzone', 8.0, 8.6, 'Shooter Battle Royale masivo y gratuito de la aclamada franquicia Call of Duty. Desplégate, ármate, saquea recompensas y sobrevive para ser el último escuadrón en pie.', '2020-03-10'),
('League of Legends', 8.5, 9.2, 'El MOBA más popular del mundo. Dos equipos de cinco poderosos campeones se enfrentan para destruir la base del otro en un juego de pura estrategia y habilidad.', '2009-10-27'),
('Fortnite', 8.2, 8.8, 'El Battle Royale donde la construcción marca la diferencia. Lucha, construye y crea tus propias experiencias junto a tus amigos o compite para ser el último en pie.', '2017-07-21'),
('Valorant', 8.6, 9.4, 'Shooter táctico 5v5 de Riot Games basado en personajes. Combina un gunplay preciso y letal con habilidades únicas de agentes para crear momentos espectaculares.', '2020-06-02'),
('Red Dead Redemption 2', 9.7, 9.6, 'Una historia épica sobre la vida en Estados Unidos en el umbral de una nueva era. Un mundo abierto masivo creado por Rockstar Games que redefine la inmersión.', '2018-10-26'),
('The Witcher 3: Wild Hunt', 9.3, 9.8, 'Ponte en la piel del brujo Geralt de Rivia en este RPG de fantasía y explora un mundo abierto colosal lleno de monstruos, magia y decisiones morales difíciles.', '2015-05-19'),
('God of War', 9.4, 9.6, 'Kratos viaja a las tierras nórdicas en esta reinvención de la saga de Acción. Un viaje brutal y emotivo de un padre y su hijo por sobrevivir a los dioses.', '2018-04-20'),
('Marvel''s Spider-Man', 8.7, 9.4, 'Conviértete en Peter Parker y balanceate por una Nueva York viva en este juego de Acción. Combate acrobático e improvisación en una historia original de Marvel.', '2018-09-07'),
('Horizon Forbidden West', 8.8, 9.4, 'Acompaña a Aloy en su viaje por el Oeste Prohibido, una frontera majestuosa pero peligrosa que oculta nuevas y misteriosas amenazas de máquinas gigantes.', '2022-02-18'),
('Final Fantasy XVI', 8.8, 9.2, 'RPG de acción épico que nos lleva al mundo de Valisthea, una tierra bendecida por los Cristales Madre y amenazada por la propagación de las Ruinas.', '2023-06-22');

-- 3. Insertar Noticias (Extraídas de la pantalla de "Noticias" de Figma)
INSERT INTO NOTICIA (Titulo, Cuerpo_Texto, ID_Autor) VALUES 
('Nuevo DLC de Elden Ring: Shadow of the Erdtree anunciado', 'FromSoftware anuncia la expansión más grande de Elden Ring con nuevas áreas, jefes, armas y magia. Sumérgete de nuevo en las Tierras Intermedias y descubre los secretos que oculta la sombra del Árbol Áureo. Se espera que este contenido desafíe incluso a los jugadores más experimentados.', 2),
('Cyberpunk 2077 recibe actualización 2.0 con mejoras', 'CD Projekt Red lanza una actualización revolucionaria que transforma la experiencia de juego. El parche 2.0 rehace por completo el sistema de habilidades de los personajes, mejora la inteligencia artificial de la policía de Night City y añade combate vehicular. El juego por fin alcanza su verdadera forma.', 2),
('League of Legends: Nuevos campeones para la temporada', 'Riot Games revela los próximos campeones que llegarán a la Grieta del Invocador en la nueva temporada competitiva. Además de ajustes importantes en el mapa y la introducción de nuevos objetos míticos que cambiarán por completo el meta actual del MOBA.', 3);

-- 4. Insertar Comentarios (Para probar la relación y borrado en cascada)
INSERT INTO COMENTARIO (Contenido, ID_Usuario, ID_Noticia) VALUES 
('¡Qué ganas de sufrir otra vez con los jefes de FromSoftware! Day one total.', 4, 1),
('He vuelto a jugar a Cyberpunk con este parche y es literalmente otro juego distinto. Muy recomendable.', 5, 2),
('A ver si Riot balancea de una vez a los asesinos porque no se puede jugar de ADC.', 4, 3);

-- 5. Insertar Eventos para la sección de Calendario
INSERT INTO EVENTO (Titulo, Descripcion, Fecha_Evento, Tipo) VALUES 
('Lanzamiento mundial de GTA VI', 'El juego más esperado de la década llega a consolas de nueva generación.', '2025-09-15 00:00:00', 'Lanzamiento'),
('Summer Game Fest 2026', 'Evento digital de la industria del videojuego presentado por Geoff Keighley.', '2026-06-08 20:00:00', 'Feria'),
('The Game Awards 2026', 'Gala de entrega de premios a los mejores juegos del año y anuncios mundiales.', '2026-12-10 01:30:00', 'Premios');

-- 6. Insertar Mensaje de Contacto (Para probar tu RF-09 Formulario)
INSERT INTO MENSAJE_CONTACTO (Nombre_Remitente, Email_Remitente, Asunto, Cuerpo_Mensaje) VALUES 
('Sonia Jugadora', 'sonia@gmail.com', 'Sugerencia de juego', 'Hola equipo de Game-Hub, me gustaría sugerir que añadáis la saga Persona a los juegos destacados. ¡Un saludo!');

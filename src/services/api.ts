const BASE = import.meta.env.VITE_API_BASE_URL;

export interface Usuario {
  id_usuario: number;
  nombre: string;
  email: string;
  rol: 'Administrador' | 'Redactor' | 'Colaborador' | 'Suscriptor';
}

export interface Juego {
  ID_Videojuego: number;
  Titulo: string;
  Nota_Prensa: number;
  Nota_Comunidad: number;
  Imagen_URL: string;
  Descripcion: string;
  Fecha_Lanzamiento?: string;
  Trailer_URL?: string;
  Stream_URL?: string;
}

export interface Noticia {
  ID_Noticia: number;
  Titulo: string;
  Cuerpo_Texto: string;
  Imagen_URL: string;
  Fecha_Publicacion: string;
  ID_Autor: number;
}

export interface Evento {
  ID_Evento: number;
  Titulo: string;
  Descripcion: string;
  Fecha_Evento?: string;      // Para el SQL de tu compañero
  Fecha_Inicio?: string;      // Por si Miguel lo cambia
  Fecha_Fin?: string;
  Tipo: string;
  Imagen_URL?: string;
  
}

// SESIÓN
export const guardarSesion = (usuario: {
  id_usuario: number;
  email: string;
  nombre?: string;
  Nombre?: string;
  rol?: string;
  Rol?: string;
}) => {
  // Normaliza tanto mayúsculas como minúsculas
  const normalizado = {
    id_usuario: usuario.id_usuario,
    Nombre: usuario.nombre || usuario.Nombre,
    email: usuario.email,
    Rol: usuario.rol || usuario.Rol || 'Suscriptor',
  };
  localStorage.setItem('usuario', JSON.stringify(normalizado));
};

export const obtenerSesion = (): Usuario | null =>
  JSON.parse(localStorage.getItem('usuario') || 'null');

export const cerrarSesion = () =>
  localStorage.removeItem('usuario');

// AUTH
export const loginUser = async (email: string, contrasena: string) => {
  const res = await fetch(`${BASE}/api/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, contrasena }),
  });
  return res.json();
};

export const registerUser = async (nombre: string, email: string, contrasena: string) => {
  const res = await fetch(`${BASE}/api/auth/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ nombre, email, contrasena }),
  });
  return res.json();
};

// JUEGOS
export const getGames = async (): Promise<Juego[]> => {
  const res = await fetch(`${BASE}/api/games`);
  if (!res.ok) return [];
  return res.json();
};

export const getGameById = async (id: number): Promise<Juego> => {
  const res = await fetch(`${BASE}/api/games/${id}`);
  return res.json();
};

// NOTICIAS
export const getNews = async (): Promise<Noticia[]> => {
  const res = await fetch(`${BASE}/api/news`);
  return res.json();
};

export const postComment = async (
  id_noticia: number,
  id_usuario: number,
  contenido: string
) => {
  const res = await fetch(`${BASE}/api/news/${id_noticia}/comments`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ id_usuario, contenido }),
  });
  return res.json();
};

// EVENTOS
export const getEvents = async (): Promise<Evento[]> => {
  const res = await fetch(`${BASE}/api/events`);
  if (!res.ok) return []; // Si el backend falla, devuelve un array vacío en vez de romper la web
  return res.json();
};
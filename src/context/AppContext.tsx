import { createContext, useContext, useState } from 'react';
import type { ReactNode } from 'react';

type Language = 'es' | 'en';

interface AppContextType {
  userRole: string;
  setUserRole: (role: string) => void;
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const translations: Record<Language, Record<string, string>> = {
  es: {
    welcomeTitle: 'Bienvenido a Game-Hub',
    welcomeSubtitle: 'Tu plataforma de videojuegos definitiva',
    searchPlaceholder: 'Buscar juegos, noticias...',
    exploreGames: 'Explorar Juegos',
    viewRankings: 'Ver Rankings',
    featured: 'Destacados',
    trending: 'Tendencias',
    live: 'En Vivo',
    genre: 'Género',
    rating: 'Valoración',
    players: 'Jugadores',
  },
  en: {
    welcomeTitle: 'Welcome to Game-Hub',
    welcomeSubtitle: 'Your ultimate gaming platform',
    searchPlaceholder: 'Search games, news...',
    exploreGames: 'Explore Games',
    viewRankings: 'View Rankings',
    featured: 'Featured',
    trending: 'Trending',
    live: 'Live',
    genre: 'Genre',
    rating: 'Rating',
    players: 'Players',
  },
};

const AppContext = createContext<AppContextType>({} as AppContextType);

export function AppProvider({ children }: { children: ReactNode }) {
  const [userRole, setUserRole] = useState('');
  const [language, setLanguage] = useState<Language>('es');

  const t = (key: string) => translations[language][key] || key;

  return (
    <AppContext.Provider value={{ userRole, setUserRole, language, setLanguage, t }}>
      {children}
    </AppContext.Provider>
  );
}

export const useApp = () => useContext(AppContext);
import { useState, useEffect } from 'react';
import { Search, TrendingUp, Gamepad2, Calendar } from 'lucide-react';
import { Input } from '../components/Input';
import { Button } from '../components/Button';
import { GameCard } from '../components/GameCard';
import { Badge } from '../components/Badge';
import { useApp } from '../context/AppContext';
import { getGames, getEvents, type Juego, type Evento } from '../services/api';

export function Home() {
  const { t, language } = useApp();
  
  // AÑADIDO: Estados para guardar los datos reales
  const [games, setGames] = useState<Juego[]>([]);
  const [events, setEvents] = useState<Evento[]>([]);
  const [loading, setLoading] = useState(true);

  // AÑADIDO: Llamar a la API al cargar la página
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [gamesData, eventsData] = await Promise.all([
          getGames(),
          getEvents()
        ]);
        setGames(gamesData);
        setEvents(eventsData);
      } catch (error) {
        console.error("Error cargando la Home", error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchData();
  }, []);

  return (
    <div className="min-h-screen pb-20 md:pb-8">
      <div
        className="relative min-h-[50vh] flex items-center justify-center bg-cover bg-center py-12"
        style={{
          backgroundImage:
            'linear-gradient(to bottom, rgba(18, 18, 18, 0.7), rgba(18, 18, 18, 0.95)), url(https://images.unsplash.com/photo-1616093700899-dddbfc0fe7d4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1600)',
        }}
      >
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-3xl sm:text-5xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-primary via-secondary to-primary bg-clip-text text-transparent">
            {t('welcomeTitle')}
          </h1>
          <p className="text-xl text-muted-foreground mb-8">
            {t('welcomeSubtitle')}
          </p>
          <div className="max-w-2xl mx-auto">
            <Input
              placeholder={t('searchPlaceholder')}
              icon={<Search className="w-5 h-5" />}
              className="text-lg py-4"
            />
          </div>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mt-6 w-full sm:w-auto px-4">
            <Button variant="primary" size="lg">
              <Gamepad2 className="w-5 h-5 mr-2" />
              {t('exploreGames')}
            </Button>
            <Button variant="outline" size="lg">
              {t('viewRankings')}
            </Button>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        {/* SECCIÓN 1: PRÓXIMOS EVENTOS (Usamos "Featured" para esto) */}
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-4">
            <Calendar className="w-6 h-6 text-secondary" />
            <h2 className="text-2xl font-bold">
              {language === 'es' ? 'Próximos Eventos' : 'Upcoming Events'}
            </h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {loading ? (
              <div className="text-muted-foreground col-span-2">Cargando eventos...</div>
            ) : events.length > 0 ? (
              events.slice(0, 2).map((evento) => ( // Mostramos solo los 2 primeros
                <div key={evento.ID_Evento} className="bg-card border border-border rounded-xl p-4 flex flex-col gap-2">
                   <h3 className="text-xl font-bold text-primary">{evento.Titulo}</h3>
                   <p className="text-sm text-muted-foreground">{evento.Descripcion}</p>
                   <div className="flex justify-between items-center mt-2">
                     <span className="text-sm">📅 {new Date(evento.Fecha_Inicio).toLocaleDateString()}</span>
                     <Badge variant="outline">{evento.Tipo}</Badge>
                   </div>
                </div>
              ))
            ) : (
              <div className="text-muted-foreground">No hay eventos próximos.</div>
            )}
          </div>
        </div>

        {/* SECCIÓN 2: JUEGOS EN TENDENCIA (Los sacamos del endpoint getGames) */}
        <div>
          <div className="flex items-center gap-2 mb-4">
            <TrendingUp className="w-6 h-6 text-primary" />
            <h2 className="text-2xl font-bold">{t('trending')}</h2>
            <Badge variant="secondary">{t('live')}</Badge>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {loading ? (
               <div className="text-muted-foreground col-span-full">Cargando juegos...</div>
            ) : games.length > 0 ? (
              games.map((game) => (
                <GameCard 
                  key={game.ID_Videojuego} 
                  title={game.Titulo}
                  image={game.Imagen_URL}
                  pressRating={game.Nota_Prensa}
                  communityRating={game.Nota_Comunidad}
                  players="—" // Este dato no está en tu DB, lo dejamos vacío visualmente
                  genre={game.Descripcion || 'Videojuego'}
                  featured={false}
                />
              ))
            ) : (
               <div className="text-muted-foreground">No hay juegos en tendencia.</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
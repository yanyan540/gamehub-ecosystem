import { useState, useEffect } from 'react';
import { Card } from '../components/Card';
import { Badge } from '../components/Badge';
import { Button } from '../components/Button';
import { Input } from '../components/Input';
import { GameCard } from '../components/GameCard';
import { Trophy, Medal, Award, Search, Star, Users, TrendingUp, Filter } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { getGames, type Juego } from '../services/api';

export function GameCatalog() {
  const { language, t: globalT } = useApp();
  const [activeTab, setActiveTab] = useState<'catalog' | 'ranking'>('catalog');

  // AÑADIDO: Estado para guardar los juegos que vienen de la API
  const [catalogGames, setCatalogGames] = useState<Juego[]>([]);
  const [loadingGames, setLoadingGames] = useState(true);

  // AÑADIDO: Llamada a la base de datos de Miguel al cargar la pantalla
  useEffect(() => {
    getGames()
      .then(data => setCatalogGames(data))
      .catch(() => {})
      .finally(() => setLoadingGames(false));
  }, []);

  const content = {
    es: {
      catalog: 'Catálogo',
      ranking: 'Ranking Global',
      search: 'Buscar juegos...',
      filter: 'Filtrar',
      allGames: 'Todos los Juegos',
      topGames: 'Top 10 Juegos Más Jugados',
      featured: 'Destacado',
      category: 'Categoría',
      genres: {
        all: 'Todos',
        rpg: 'RPG',
        action: 'Acción',
        shooter: 'Shooter',
        moba: 'MOBA',
        strategy: 'Estrategia',
      },
    },
    en: {
      catalog: 'Catalog',
      ranking: 'Global Ranking',
      search: 'Search games...',
      filter: 'Filter',
      allGames: 'All Games',
      topGames: 'Top 10 Most Played Games',
      featured: 'Featured',
      category: 'Category',
      genres: {
        all: 'All',
        rpg: 'RPG',
        action: 'Action',
        shooter: 'Shooter',
        moba: 'MOBA',
        strategy: 'Strategy',
      },
    },
  };

  const t = content[language];

  // El Top 10 se queda fijo porque el backend aún no tiene endpoint para el ranking
  const topGames = [
    {
      rank: 1,
      title: 'League of Legends',
      image: '',
      rating: 4.8,
      players: '150M',
      monthlyPlayers: '180M',
      genre: 'MOBA',
      trend: 'up',
    },
    {
      rank: 2,
      title: 'Fortnite',
      image: '',
      rating: 4.7,
      players: '125M',
      monthlyPlayers: '140M',
      genre: 'Battle Royale',
      trend: 'up',
    },
    {
      rank: 3,
      title: 'Minecraft',
      image: '',
      rating: 4.9,
      players: '140M',
      monthlyPlayers: '165M',
      genre: 'Sandbox',
      trend: 'up',
    },
    {
      rank: 4,
      title: 'Counter-Strike 2',
      image: '',
      rating: 4.6,
      players: '95M',
      monthlyPlayers: '110M',
      genre: 'Tactical Shooter',
      trend: 'up',
    },
    {
      rank: 5,
      title: 'Valorant',
      image: '',
      rating: 4.7,
      players: '85M',
      monthlyPlayers: '98M',
      genre: 'Tactical Shooter',
      trend: 'up',
    },
    {
      rank: 6,
      title: 'Grand Theft Auto V',
      image: '',
      rating: 4.8,
      players: '80M',
      monthlyPlayers: '92M',
      genre: 'Action',
      trend: 'stable',
    },
    {
      rank: 7,
      title: 'Apex Legends',
      image: '',
      rating: 4.5,
      players: '70M',
      monthlyPlayers: '85M',
      genre: 'Battle Royale',
      trend: 'up',
    },
    {
      rank: 8,
      title: 'Roblox',
      image: '',
      rating: 4.4,
      players: '200M',
      monthlyPlayers: '230M',
      genre: 'Sandbox',
      trend: 'up',
    },
    {
      rank: 9,
      title: 'Call of Duty: Warzone',
      image: '',
      rating: 4.3,
      players: '75M',
      monthlyPlayers: '88M',
      genre: 'Battle Royale',
      trend: 'down',
    },
    {
      rank: 10,
      title: 'Overwatch 2',
      image: '',
      rating: 4.4,
      players: '60M',
      monthlyPlayers: '72M',
      genre: 'Hero Shooter',
      trend: 'stable',
    },
  ];

  const getRankBadge = (rank: number) => {
    if (rank === 1)
      return <Trophy className="w-7 h-7 text-secondary drop-shadow-[0_0_10px_var(--secondary-glow)]" />;
    if (rank === 2)
      return <Medal className="w-7 h-7 text-gray-300" />;
    if (rank === 3)
      return <Award className="w-7 h-7 text-primary/70" />;
    return <span className="text-lg font-bold text-muted-foreground">#{rank}</span>;
  };

  return (
    <div className="min-h-screen pb-20 md:pb-8">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            {activeTab === 'catalog' ? t.allGames : t.topGames}
          </h1>
          <p className="text-muted-foreground">
            {activeTab === 'catalog'
              ? language === 'es' ? 'Explora nuestra colección de juegos' : 'Explore our game collection'
              : language === 'es' ? 'Los videojuegos más populares del momento' : 'The most popular games right now'}
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 mb-8">
          <div className="flex gap-2">
            <Button
              variant={activeTab === 'catalog' ? 'primary' : 'outline'}
              onClick={() => setActiveTab('catalog')}
            >
              {t.catalog}
            </Button>
            <Button
              variant={activeTab === 'ranking' ? 'primary' : 'outline'}
              onClick={() => setActiveTab('ranking')}
            >
              {t.ranking}
            </Button>
          </div>
          <div className="flex gap-2 sm:ml-auto">
            <Input
              placeholder={t.search}
              icon={<Search className="w-4 h-4" />}
              className="w-full sm:w-64"
            />
            <Button variant="outline">
              <Filter className="w-4 h-4 mr-2" />
              {t.filter}
            </Button>
          </div>
        </div>

        {activeTab === 'catalog' ? (
          <>
            <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
              {Object.entries(t.genres).map(([key, label]) => (
                <Button key={key} variant={key === 'all' ? 'primary' : 'outline'} size="sm" className="whitespace-nowrap">
                  {label}
                </Button>
              ))}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {/* AÑADIDO: Lógica para renderizar los juegos de la Base de Datos */}
              {loadingGames ? (
                <div className="text-center text-muted-foreground py-12 col-span-full">Cargando juegos...</div>
              ) : catalogGames.length > 0 ? (
                catalogGames.map((game) => (
                  <GameCard
                    key={game.ID_Videojuego}
                    title={game.Titulo}
                    image={game.Imagen_URL}
                    pressRating={game.Nota_Prensa}
                    communityRating={game.Nota_Comunidad}
                    players="—"
                    genre={game.Descripcion || 'Videojuego'}
                  />
                ))
              ) : (
                <div className="text-center text-muted-foreground py-12 col-span-full">No hay juegos disponibles.</div>
              )}
            </div>
          </>
        ) : (
          <>
            {/* Pestaña de Ranking (Mantiene los datos fijos de moment) */}
            <div className="grid md:grid-cols-4 gap-4 mb-8">
              <Card className="text-center border-secondary/50">
                <Trophy className="w-10 h-10 text-secondary mx-auto mb-2 drop-shadow-[0_0_20px_var(--secondary-glow)]" />
                <div className="text-2xl font-bold mb-1">230M</div>
                <div className="text-sm text-muted-foreground">{language === 'es' ? 'Jugadores Activos' : 'Active Players'}</div>
              </Card>
              <Card className="text-center border-primary/50">
                <Star className="w-10 h-10 text-primary mx-auto mb-2" />
                <div className="text-2xl font-bold mb-1">4.7</div>
                <div className="text-sm text-muted-foreground">{language === 'es' ? 'Rating Promedio' : 'Average Rating'}</div>
              </Card>
              <Card className="text-center">
                <Users className="w-10 h-10 text-secondary mx-auto mb-2" />
                <div className="text-2xl font-bold mb-1">1.2B</div>
                <div className="text-sm text-muted-foreground">{language === 'es' ? 'Jugadores Totales' : 'Total Players'}</div>
              </Card>
              <Card className="text-center">
                <TrendingUp className="w-10 h-10 text-primary mx-auto mb-2" />
                <div className="text-2xl font-bold mb-1">+18%</div>
                <div className="text-sm text-muted-foreground">{language === 'es' ? 'Crecimiento Mensual' : 'Monthly Growth'}</div>
              </Card>
            </div>

            <Card>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-border">
                      <th className="text-left py-3 px-2 text-sm font-medium text-muted-foreground w-16">
                        {language === 'es' ? 'Pos.' : 'Rank'}
                      </th>
                      <th className="text-left py-3 px-2 text-sm font-medium text-muted-foreground">
                        {language === 'es' ? 'Juego' : 'Game'}
                      </th>
                      <th className="text-center py-3 px-2 text-sm font-medium text-muted-foreground hidden sm:table-cell">
                        {globalT('genre')}
                      </th>
                      <th className="text-center py-3 px-2 text-sm font-medium text-muted-foreground">
                        {globalT('rating')}
                      </th>
                      <th className="text-center py-3 px-2 text-sm font-medium text-muted-foreground hidden md:table-cell">
                        {globalT('players')}
                      </th>
                      <th className="text-center py-3 px-2 text-sm font-medium text-muted-foreground hidden lg:table-cell">
                        {language === 'es' ? 'Mensuales' : 'Monthly'}
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {topGames.map((game) => (
                      <tr
                        key={game.rank}
                        className={`border-b border-border/50 hover:bg-muted/30 transition-colors ${
                          game.rank <= 3 ? 'bg-primary/5' : ''
                        }`}
                      >
                        <td className="py-4 px-2">
                          <div className="flex items-center justify-center">
                            {getRankBadge(game.rank)}
                          </div>
                        </td>
                        <td className="py-4 px-2">
                          <div className="flex items-center gap-3">
                            <img
                              src={game.image}
                              alt={game.title}
                              className="w-16 h-16 rounded-lg object-cover border border-border"
                            />
                            <div>
                              <div className="font-semibold">{game.title}</div>
                              <div className="text-xs text-muted-foreground sm:hidden">{game.genre}</div>
                            </div>
                          </div>
                        </td>
                        <td className="py-4 px-2 text-center hidden sm:table-cell">
                          <Badge variant="outline">{game.genre}</Badge>
                        </td>
                        <td className="py-4 px-2 text-center">
                          <div className="flex items-center justify-center gap-1">
                            <Star className="w-4 h-4 text-secondary fill-current" />
                            <span className="font-semibold text-secondary">{game.rating}</span>
                          </div>
                        </td>
                        <td className="py-4 px-2 text-center font-semibold text-primary hidden md:table-cell">
                          {game.players}
                        </td>
                        <td className="py-4 px-2 text-center text-muted-foreground hidden lg:table-cell">
                          {game.monthlyPlayers}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Card>
          </>
        )}
      </div>
    </div>
  );
}
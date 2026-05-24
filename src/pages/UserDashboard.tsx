import { useEffect, useState } from 'react';
import { Card } from '../components/Card';
import { Avatar } from '../components/Avatar';
import { Badge } from '../components/Badge';
import { GameCard } from '../components/GameCard';
import { Trophy, Star, Gamepad2, Clock, TrendingUp, Shield, Users, FileText, PenTool } from 'lucide-react';
import { Button } from '../components/Button';
import { Link } from 'react-router';

export function UserDashboard() {
  // Estado para guardar los datos reales del usuario logueado
  const [currentUser, setCurrentUser] = useState({ Nombre: 'Cargando...', Rol: 'Suscriptor' });

  useEffect(() => {
    // Recuperamos los datos de la sesión (ajusta 'usuario' a la key exacta que uses en guardarSesion)
    const sessionData = localStorage.getItem('usuario');
    if (sessionData) {
      setCurrentUser(JSON.parse(sessionData));
    }
  }, []);

  // Banderas booleanas para facilitar la lectura del código
  const isAdmin = currentUser.Rol === 'Administrador';
  const isCreator = currentUser.Rol === 'Redactor' || currentUser.Rol === 'Colaborador';
  const isPlayer = currentUser.Rol === 'Suscriptor';

  // Datos mockeados (hasta que Miguel haga los endpoints de actividad/favoritos)
  const favoriteGames = [
    { title: 'The Witcher 3', image: '', pressRating: 4.9, communityRating: 4.9, players: '80K', genre: 'RPG' },
    { title: 'Cyberpunk 2077', image: '', pressRating: 4.5, communityRating: 4.2, players: '50K', genre: 'RPG' },
  ];

  const recentActivity = [
    { game: 'Cyberpunk 2077', action: 'Completó misión principal', time: 'Hace 2 horas' },
    { game: 'Elden Ring', action: 'Desbloqueó logro "Maestro"', time: 'Hace 5 horas' },
  ];

  const stats = [
    { label: 'Juegos', value: '47', icon: Gamepad2, color: 'text-primary' },
    { label: 'Horas Jugadas', value: '1,234', icon: Clock, color: 'text-secondary' },
    { label: 'Logros', value: '156', icon: Trophy, color: 'text-primary' },
    { label: 'Nivel', value: '42', icon: TrendingUp, color: 'text-secondary' },
  ];

  return (
    <div className="min-h-screen pb-20 md:pb-8">
      <div
        className="relative h-48 bg-cover bg-center"
        style={{
          backgroundImage:
            'linear-gradient(to bottom, rgba(18, 18, 18, 0.3), rgba(18, 18, 18, 0.95)), url(https://images.unsplash.com/photo-1766051666522-9cfa12675f5b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1600)',
        }}
      />

      <div className="container mx-auto px-4 -mt-20">
        <Card className="mb-8">
          <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
            <Avatar
              size="xl"
              src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=200"
              className="w-32 h-32 ring-4 ring-background shadow-[0_0_30px_var(--primary-glow)]"
            />
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-2">
                {/* Nombre real desde la Base de Datos */}
                <h1 className="text-3xl font-bold">{currentUser.Nombre}</h1>
                
                {/* Badge dinámico según el rol */}
                <Badge variant={isAdmin ? 'secondary' : isCreator ? 'primary' : 'outline'} className="gap-1">
                  {isAdmin && <Shield className="w-3 h-3" />}
                  {isCreator && <PenTool className="w-3 h-3" />}
                  {currentUser.Rol}
                </Badge>
              </div>
              
              <p className="text-muted-foreground mb-4">
                {isAdmin && 'Gestión total de contenido y comunidad de Game-Hub'}
                {isCreator && 'Creación de noticias, guías y contenido para la comunidad'}
                {isPlayer && 'Jugador apasionado | Cazador de logros'}
              </p>
            </div>
            
            {/* Botones de acción dinámicos */}
            <div className="flex gap-2">
              {isAdmin && (
                <Link to="/admin">
                  <Button variant="primary">Panel Admin</Button>
                </Link>
              )}
              {isCreator && (
                <Button variant="primary">Escribir Artículo</Button>
              )}
              <Button variant="outline">Editar Perfil</Button>
            </div>
          </div>
        </Card>

        {/* Estadísticas exclusivas de Admin */}
        {isAdmin && (
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
            <Card className="text-center border-primary/30">
              <Users className="w-10 h-10 text-primary mx-auto mb-2" />
              <div className="text-2xl font-bold mb-1">Activos</div>
              <div className="text-sm text-muted-foreground">Usuarios Totales</div>
            </Card>
            <Card className="text-center border-secondary/30">
              <FileText className="w-10 h-10 text-secondary mx-auto mb-2" />
              <div className="text-2xl font-bold mb-1">Gestión</div>
              <div className="text-sm text-muted-foreground">Artículos Publicados</div>
            </Card>
            <Card className="text-center border-primary/30">
              <TrendingUp className="w-10 h-10 text-primary mx-auto mb-2" />
              <div className="text-2xl font-bold mb-1">Métricas</div>
              <div className="text-sm text-muted-foreground">Visitas Mensuales</div>
            </Card>
          </div>
        )}

        {/* Stats de Jugador (Todos las ven) */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <Card key={index} className="text-center">
                <Icon className={`w-8 h-8 mx-auto mb-2 ${stat.color}`} />
                <div className="text-2xl font-bold mb-1">{stat.value}</div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
              </Card>
            );
          })}
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          <div className="md:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <Star className="w-5 h-5 text-primary" />
              <h2 className="text-xl font-bold">Mis Juegos Favoritos</h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {favoriteGames.map((game, index) => (
                <GameCard key={index} {...game} featured={false} />
              ))}
            </div>
          </div>

          <div>
            <div className="flex items-center gap-2 mb-4">
              <Clock className="w-5 h-5 text-secondary" />
              <h2 className="text-xl font-bold">Actividad Reciente</h2>
            </div>
            <div className="space-y-3">
              {recentActivity.map((activity, index) => (
                <Card key={index} className="p-4">
                  <div className="font-semibold text-sm mb-1">{activity.game}</div>
                  <div className="text-sm text-muted-foreground mb-2">{activity.action}</div>
                  <div className="text-xs text-muted-foreground flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    {activity.time}
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
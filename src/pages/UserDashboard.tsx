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
    // Permite forzar rol por URL para demo: /dashboard?rol=Administrador
    const params = new URLSearchParams(window.location.search);
    const rolForzado = params.get('rol');
    
    const sessionData = localStorage.getItem('usuario');
    if (rolForzado) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setCurrentUser({ Nombre: 'Demo Admin', Rol: rolForzado });
    } else if (sessionData) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setCurrentUser(JSON.parse(sessionData));
    }
  }, []);

  // Banderas booleanas para facilitar la lectura del código
  const isAdmin = currentUser.Rol === 'Administrador';
  const isCreator = currentUser.Rol === 'Redactor' || currentUser.Rol === 'Colaborador';
  const isPlayer = currentUser.Rol === 'Suscriptor';

  // Datos mockeados (hasta que Miguel haga los endpoints de actividad/favoritos)
  const favoriteGames = [
    { title: 'The Witcher 3', image: 'data:image/jpeg;base64,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', pressRating: 4.9, communityRating: 4.9, players: '80K', genre: 'RPG' },
    { title: 'Cyberpunk 2077', image: 'data:image/jpeg;base64,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', pressRating: 4.5, communityRating: 4.2, players: '50K', genre: 'RPG' },
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
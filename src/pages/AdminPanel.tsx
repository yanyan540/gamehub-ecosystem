import { Card } from '../components/Card';
import { Badge } from '../components/Badge';
import { Button } from '../components/Button';
import { Input } from '../components/Input';
import {
  Users,
  FileText,
  AlertTriangle,
  TrendingUp,
  Search,
  Eye,
  Edit,
  Trash2,
  CheckCircle,
  XCircle,
} from 'lucide-react';
import { useEffect } from 'react';
import { useNavigate } from 'react-router';
import { obtenerSesion } from '../services/api';

export function AdminPanel() {
  const navigate = useNavigate();

  // 1. Control de seguridad (Efecto de sesión)
  useEffect(() => {
    const sesion = obtenerSesion();
    if (!sesion || sesion.Rol !== 'Administrador') {
      navigate('/dashboard');
    }
  }, [navigate]);

  // 2. Datos simulados del panel de administración
  const stats = [
    { label: 'Usuarios Totales', value: '45,231', change: '+12%', icon: Users, trend: 'up' },
    { label: 'Noticias Publicadas', value: '1,234', change: '+8%', icon: FileText, trend: 'up' },
    { label: 'Reportes Pendientes', value: '23', change: '-5%', icon: AlertTriangle, trend: 'down' },
    { label: 'Visitas del Mes', value: '892K', change: '+18%', icon: TrendingUp, trend: 'up' },
  ];

  const recentNews = [
    {
      id: 1,
      title: 'Nuevo DLC de Elden Ring anunciado',
      author: 'Admin_01',
      date: '2026-05-10',
      status: 'Publicado',
      views: '12.5K',
    },
    {
      id: 2,
      title: 'Actualización de Cyberpunk trae mejoras',
      author: 'Editor_02',
      date: '2026-05-09',
      status: 'Publicado',
      views: '8.3K',
    },
    {
      id: 3,
      title: 'Top 10 juegos más esperados de 2026',
      author: 'Admin_01',
      date: '2026-05-08',
      status: 'Borrador',
      views: '0',
    },
    {
      id: 4,
      title: 'Guía completa: Cómo mejorar en Valorant',
      author: 'Editor_03',
      date: '2026-05-07',
      status: 'Publicado',
      views: '15.2K',
    },
  ];

  const userReports = [
    {
      id: 1,
      reporter: 'User_2983',
      reported: 'ToxicGamer_99',
      reason: 'Lenguaje ofensivo',
      date: '2026-05-11',
      status: 'Pendiente',
    },
    {
      id: 2,
      reporter: 'ProPlayer_42',
      reported: 'Cheater_XYZ',
      reason: 'Posible trampa',
      date: '2026-05-10',
      status: 'En revisión',
    },
    {
      id: 3,
      reporter: 'GamerGirl_88',
      reported: 'Spam_Bot_123',
      reason: 'Spam en comentarios',
      date: '2026-05-10',
      status: 'Resuelto',
    },
    {
      id: 4,
      reporter: 'Admin_Test',
      reported: 'FakeAccount_01',
      reason: 'Cuenta falsa',
      date: '2026-05-09',
      status: 'Pendiente',
    },
  ];

  // 3. Renderizado de la interfaz del componente
  return (
    <div className="min-h-screen pb-20 md:pb-8">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Panel de Administración</h1>
          <p className="text-muted-foreground">Gestiona contenido y usuarios de Game-Hub</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            const isPositive = stat.trend === 'up';
            return (
              <Card key={index}>
                <div className="flex items-start justify-between mb-3">
                  <Icon
                    className={`w-8 h-8 ${isPositive ? 'text-secondary' : 'text-primary'}`}
                  />
                  <Badge variant={isPositive ? 'secondary' : 'primary'}>{stat.change}</Badge>
                </div>
                <div className="text-2xl font-bold mb-1">{stat.value}</div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
              </Card>
            );
          })}
        </div>

        <div className="grid lg:grid-cols-3 gap-6 mb-8">
          <div className="lg:col-span-2">
            <Card>
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-xl font-bold mb-1">Gestión de Noticias</h2>
                  <p className="text-sm text-muted-foreground">
                    Administra artículos y publicaciones
                  </p>
                </div>
                <Button variant="primary">
                  <FileText className="w-4 h-4 mr-2" />
                  Nueva Noticia
                </Button>
              </div>

              <div className="mb-4">
                <Input icon={<Search className="w-4 h-4" />} placeholder="Buscar noticias..." />
              </div>

              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-border">
                      <th className="text-left py-3 px-2 text-sm font-medium text-muted-foreground">
                        Título
                      </th>
                      <th className="text-left py-3 px-2 text-sm font-medium text-muted-foreground hidden md:table-cell">
                        Autor
                      </th>
                      <th className="text-left py-3 px-2 text-sm font-medium text-muted-foreground hidden sm:table-cell">
                        Fecha
                      </th>
                      <th className="text-left py-3 px-2 text-sm font-medium text-muted-foreground">
                        Estado
                      </th>
                      <th className="text-left py-3 px-2 text-sm font-medium text-muted-foreground hidden lg:table-cell">
                        Vistas
                      </th>
                      <th className="text-right py-3 px-2 text-sm font-medium text-muted-foreground">
                        Acciones
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {recentNews.map((news) => (
                      <tr key={news.id} className="border-b border-border/50 hover:bg-muted/30">
                        <td className="py-3 px-2 font-medium">{news.title}</td>
                        <td className="py-3 px-2 text-muted-foreground hidden md:table-cell">
                          {news.author}
                        </td>
                        <td className="py-3 px-2 text-muted-foreground text-sm hidden sm:table-cell">
                          {news.date}
                        </td>
                        <td className="py-3 px-2">
                          <Badge
                            variant={news.status === 'Publicado' ? 'secondary' : 'outline'}
                          >
                            {news.status}
                          </Badge>
                        </td>
                        <td className="py-3 px-2 text-muted-foreground text-sm hidden lg:table-cell">
                          {news.views}
                        </td>
                        <td className="py-3 px-2">
                          <div className="flex items-center justify-end gap-2">
                            <Button variant="ghost" size="sm">
                              <Eye className="w-4 h-4" />
                            </Button>
                            <Button variant="ghost" size="sm">
                              <Edit className="w-4 h-4" />
                            </Button>
                            <Button variant="ghost" size="sm">
                              <Trash2 className="w-4 h-4 text-destructive" />
                            </Button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Card>
          </div>

          <div>
            <Card>
              <h2 className="text-xl font-bold mb-1">Reportes de Usuarios</h2>
              <p className="text-sm text-muted-foreground mb-6">
                Revisa y gestiona reportes
              </p>

              <div className="space-y-3">
                {userReports.map((report) => (
                  <Card key={report.id} className="p-4 border-l-4 border-l-primary">
                    <div className="flex items-start justify-between mb-2">
                      <Badge
                        variant={
                          report.status === 'Resuelto'
                            ? 'secondary'
                            : report.status === 'En revisión'
                            ? 'primary'
                            : 'outline'
                        }
                      >
                        {report.status}
                      </Badge>
                      <span className="text-xs text-muted-foreground">{report.date}</span>
                    </div>
                    <div className="text-sm font-semibold mb-1">{report.reason}</div>
                    <div className="text-xs text-muted-foreground mb-3">
                      <span className="text-foreground">{report.reporter}</span> reportó a{' '}
                      <span className="text-foreground">{report.reported}</span>
                    </div>
                    {report.status !== 'Resuelto' && (
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm" className="flex-1">
                          <CheckCircle className="w-3 h-3 mr-1" />
                          Aprobar
                        </Button>
                        <Button variant="ghost" size="sm" className="flex-1">
                          <XCircle className="w-3 h-3 mr-1" />
                          Rechazar
                        </Button>
                      </div>
                    )}
                  </Card>
                ))}
              </div>

              <Button variant="outline" className="w-full mt-4">
                Ver Todos los Reportes
              </Button>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
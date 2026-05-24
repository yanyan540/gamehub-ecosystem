import { Card } from '../components/Card';
import { Avatar } from '../components/Avatar';
import { Badge } from '../components/Badge';
import { Button } from '../components/Button';
import { Input } from '../components/Input';
import {
  Clock,
  Eye,
  Share2,
  Bookmark,
  ThumbsUp,
  MessageCircle,
  Send,
} from 'lucide-react';

export function ArticleView() {
  const comments = [
    {
      id: 1,
      user: 'ProGamer_2077',
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=200',
      content: '¡Increíble! No puedo esperar para jugar esta expansión. FromSoftware nunca decepciona.',
      time: 'Hace 30 min',
      likes: 24,
    },
    {
      id: 2,
      user: 'EldenLord_99',
      avatar: 'https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=200',
      content: 'Las nuevas áreas se ven espectaculares. Espero que añadan más builds viables.',
      time: 'Hace 1 hora',
      likes: 18,
    },
    {
      id: 3,
      user: 'SoulsVeteran',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200',
      content: '¿Alguien sabe si habrá cross-play entre plataformas? Sería genial jugar con amigos de PC y consola.',
      time: 'Hace 2 horas',
      likes: 12,
    },
    {
      id: 4,
      user: 'CasualGamer_42',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200',
      content: 'Aún no he terminado el juego base, pero esto me da más motivación para seguir jugando.',
      time: 'Hace 3 horas',
      likes: 9,
    },
  ];

  return (
    <div className="min-h-screen pb-20 md:pb-8">
      <article className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="mb-6">
          <Badge variant="primary" className="mb-3">
            Anuncios
          </Badge>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Nuevo DLC de Elden Ring: Shadow of the Erdtree confirmado
          </h1>
          <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <Avatar
                src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=200"
                size="sm"
              />
              <span className="font-medium text-foreground">Admin_GameHub</span>
            </div>
            <div className="flex items-center gap-1">
              <Clock className="w-4 h-4" />
              <span>11 de Mayo, 2026</span>
            </div>
            <div className="flex items-center gap-1">
              <Eye className="w-4 h-4" />
              <span>12.5K vistas</span>
            </div>
            <div className="flex items-center gap-1">
              <MessageCircle className="w-4 h-4" />
              <span>87 comentarios</span>
            </div>
          </div>
        </div>

        <div className="mb-6 flex gap-2">
          <Button variant="outline" size="sm">
            <Share2 className="w-4 h-4 mr-2" />
            Compartir
          </Button>
          <Button variant="outline" size="sm">
            <Bookmark className="w-4 h-4 mr-2" />
            Guardar
          </Button>
          <Button variant="outline" size="sm" className="ml-auto">
            <ThumbsUp className="w-4 h-4 mr-2" />
            234
          </Button>
        </div>

        <div className="relative aspect-video rounded-xl overflow-hidden mb-8 border border-border">
          <img
            src="https://images.unsplash.com/photo-1774060526585-19be7b4af255?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxFbGRlbiUyMFJpbmclMjBnYW1lfGVufDF8fHx8MTc3ODU5MjE1N3ww&ixlib=rb-4.1.0&q=80&w=1080"
            alt="Elden Ring DLC"
            className="w-full h-full object-cover"
          />
        </div>

        <div className="prose prose-invert max-w-none mb-12">
          <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
            FromSoftware ha confirmado oficialmente Shadow of the Erdtree, la esperada
            expansión de Elden Ring que promete ser la más ambiciosa de la historia del
            estudio. El DLC llegará el 21 de junio de 2026 a todas las plataformas.
          </p>

          <h2 className="text-2xl font-bold mb-4 mt-8">¿Qué incluye la expansión?</h2>
          <p className="text-muted-foreground mb-4 leading-relaxed">
            Shadow of the Erdtree introducirá nuevas áreas masivas que expanden el mundo
            de las Tierras Intermedias, incluyendo el misterioso Reino de las Sombras. Los
            jugadores podrán explorar mazmorras completamente nuevas, enfrentarse a jefes
            épicos nunca antes vistos, y descubrir armas, hechizos y armaduras únicas.
          </p>

          <h2 className="text-2xl font-bold mb-4 mt-8">Nuevas mecánicas de juego</h2>
          <p className="text-muted-foreground mb-4 leading-relaxed">
            El DLC traerá mecánicas de juego innovadoras que complementarán el sistema de
            combate existente. Se han confirmado nuevas clases de armas, habilidades de
            invocación mejoradas, y un sistema de progresión adicional que permitirá a los
            jugadores alcanzar nuevos niveles de poder.
          </p>

          <h2 className="text-2xl font-bold mb-4 mt-8">Requisitos y disponibilidad</h2>
          <p className="text-muted-foreground mb-4 leading-relaxed">
            Para acceder a Shadow of the Erdtree, los jugadores deberán haber derrotado a
            Mohg, Señor de la Sangre, en el juego base. El DLC estará disponible para
            PlayStation 5, PlayStation 4, Xbox Series X|S, Xbox One y PC a través de Steam.
          </p>

          <div className="bg-muted/30 border border-border rounded-lg p-6 my-8">
            <h3 className="text-xl font-bold mb-3">Fecha de lanzamiento confirmada</h3>
            <p className="text-muted-foreground mb-2">
              Shadow of the Erdtree llegará el <strong className="text-secondary">21 de
              junio de 2026</strong> con un precio de $39.99 USD.
            </p>
          </div>

          <p className="text-muted-foreground leading-relaxed">
            FromSoftware ha prometido revelar más detalles sobre el contenido del DLC en
            las próximas semanas. Los fans ya están especulando sobre posibles conexiones
            con la historia principal y secretos ocultos que solo los jugadores más
            dedicados descubrirán.
          </p>
        </div>

        <div className="border-t border-border pt-8">
          <h2 className="text-2xl font-bold mb-6">
            Comentarios ({comments.length})
          </h2>

          <Card className="mb-6 p-4">
            <div className="flex gap-3">
              <Avatar
                src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=200"
                size="md"
              />
              <div className="flex-1">
                <Input placeholder="Escribe un comentario..." className="mb-3" />
                <div className="flex justify-end">
                  <Button variant="primary" size="sm">
                    <Send className="w-4 h-4 mr-2" />
                    Comentar
                  </Button>
                </div>
              </div>
            </div>
          </Card>

          <div className="space-y-4">
            {comments.map((comment) => (
              <Card key={comment.id} className="p-4">
                <div className="flex gap-3">
                  <Avatar src={comment.avatar} size="md" />
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="font-semibold">{comment.user}</span>
                      <span className="text-xs text-muted-foreground">{comment.time}</span>
                    </div>
                    <p className="text-muted-foreground mb-3">{comment.content}</p>
                    <div className="flex items-center gap-4">
                      <Button variant="ghost" size="sm">
                        <ThumbsUp className="w-3.5 h-3.5 mr-1" />
                        {comment.likes}
                      </Button>
                      <Button variant="ghost" size="sm">
                        <MessageCircle className="w-3.5 h-3.5 mr-1" />
                        Responder
                      </Button>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>

          <div className="mt-6 flex justify-center">
            <Button variant="outline">Cargar más comentarios</Button>
          </div>
        </div>
      </article>
    </div>
  );
}

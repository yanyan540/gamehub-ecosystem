import { useState, useEffect } from 'react';
import { NewsCard } from '../components/NewsCard';
import { Input } from '../components/Input';
import { Button } from '../components/Button';
import { Search, TrendingUp } from 'lucide-react';
import { Link } from 'react-router';
import { getNews, type Noticia } from '../services/api';

export function NewsFeed() {
  const [newsArticles, setNewsArticles] = useState<Noticia[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getNews()
      .then(data => setNewsArticles(data))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const categories = ['Todos','Anuncios','Noticias','Guías','Actualizaciones','Eventos','Rumores','Análisis'];

  return (
    <div className="min-h-screen pb-20 md:pb-8">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-2">
            <TrendingUp className="w-8 h-8 text-primary" />
            <h1 className="text-3xl font-bold">Noticias Gaming</h1>
          </div>
          <p className="text-muted-foreground">Las últimas novedades del mundo de los videojuegos</p>
        </div>

        <div className="mb-6">
          <Input
            placeholder="Buscar noticias, juegos, desarrolladores..."
            icon={<Search className="w-5 h-5" />}
            className="max-w-2xl"
          />
        </div>

        <div className="flex gap-2 mb-8 overflow-x-auto pb-2">
          {categories.map((category, index) => (
            <Button key={index} variant={index === 0 ? 'primary' : 'outline'} size="sm" className="whitespace-nowrap">
              {category}
            </Button>
          ))}
        </div>

        {loading ? (
          <div className="text-center text-muted-foreground py-12">Cargando noticias...</div>
        ) : newsArticles.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {newsArticles.map((article) => (
              <Link key={article.ID_Noticia} to={`/news/${article.ID_Noticia}`}>
                <NewsCard
                  id={String(article.ID_Noticia)}
                  title={article.Titulo}
                  image={article.Imagen_URL}
                  excerpt={article.Cuerpo_Texto.substring(0, 120) + '...'}
                  category="Noticias"
                  date={new Date(article.Fecha_Publicacion).toLocaleDateString('es-ES')}
                  views="—"
                />
              </Link>
            ))}
          </div>
        ) : (
          <div className="text-center text-muted-foreground py-12">No hay noticias disponibles.</div>
        )}

        <div className="mt-12 flex justify-center">
          <Button variant="outline" size="lg">Cargar Más Noticias</Button>
        </div>
      </div>
    </div>
  );
}
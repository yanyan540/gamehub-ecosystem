import { useState } from 'react';
import { Card } from '../components/Card';
import { Input } from '../components/Input';
import { Button } from '../components/Button';
import { Badge } from '../components/Badge';
import { Mail, MessageSquare, Send, MapPin, Phone } from 'lucide-react';
import { useApp } from '../context/AppContext';

export function Contact() {
  const { language } = useApp();
  const [subject, setSubject] = useState('Consulta');

  const content = {
    es: {
      title: 'Contáctanos',
      subtitle: 'Estamos aquí para ayudarte',
      name: 'Nombre completo',
      namePlaceholder: 'Tu nombre',
      email: 'Correo electrónico',
      emailPlaceholder: 'tu@email.com',
      subject: 'Asunto',
      consultation: 'Consulta',
      suggestion: 'Sugerencia',
      message: 'Mensaje',
      messagePlaceholder: 'Escribe tu mensaje aquí...',
      send: 'Enviar Mensaje',
      info: 'Información de Contacto',
      address: 'Madrid, España',
      hours: 'Lun - Vie: 9:00 AM - 6:00 PM',
      response: 'Tiempo de respuesta: 24-48 horas',
    },
    en: {
      title: 'Contact Us',
      subtitle: 'We are here to help you',
      name: 'Full name',
      namePlaceholder: 'Your name',
      email: 'Email',
      emailPlaceholder: 'your@email.com',
      subject: 'Subject',
      consultation: 'Consultation',
      suggestion: 'Suggestion',
      message: 'Message',
      messagePlaceholder: 'Write your message here...',
      send: 'Send Message',
      info: 'Contact Information',
      address: 'Madrid, Spain',
      hours: 'Mon - Fri: 9:00 AM - 6:00 PM',
      response: 'Response time: 24-48 hours',
    },
  };

  const t = content[language];

  return (
    <div className="min-h-screen pb-20 md:pb-8">
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <Badge variant="primary" className="mb-4">
              {t.info}
            </Badge>
            <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              {t.title}
            </h1>
            <p className="text-muted-foreground text-lg">{t.subtitle}</p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 mb-12">
            <Card className="text-center">
              <MapPin className="w-10 h-10 text-primary mx-auto mb-3" />
              <h3 className="font-semibold mb-2">Game-Hub HQ</h3>
              <p className="text-sm text-muted-foreground">{t.address}</p>
            </Card>
            <Card className="text-center">
              <Mail className="w-10 h-10 text-secondary mx-auto mb-3" />
              <h3 className="font-semibold mb-2">Email</h3>
              <p className="text-sm text-muted-foreground">support@gamehub.com</p>
            </Card>
            <Card className="text-center">
              <Phone className="w-10 h-10 text-primary mx-auto mb-3" />
              <h3 className="font-semibold mb-2">{t.hours}</h3>
              <p className="text-sm text-muted-foreground">{t.response}</p>
            </Card>
          </div>

          <Card className="max-w-2xl mx-auto">
            <div className="flex items-center gap-3 mb-6">
              <MessageSquare className="w-6 h-6 text-primary" />
              <h2 className="text-2xl font-bold">{t.send}</h2>
            </div>

            <form className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium mb-2">{t.name}</label>
                  <Input placeholder={t.namePlaceholder} />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">{t.email}</label>
                  <Input type="email" placeholder={t.emailPlaceholder} icon={<Mail className="w-4 h-4" />} />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">{t.subject}</label>
                <div className="flex gap-3">
                  <Button
                    type="button"
                    variant={subject === 'Consulta' ? 'primary' : 'outline'}
                    onClick={() => setSubject('Consulta')}
                    className="flex-1"
                  >
                    {t.consultation}
                  </Button>
                  <Button
                    type="button"
                    variant={subject === 'Sugerencia' ? 'primary' : 'outline'}
                    onClick={() => setSubject('Sugerencia')}
                    className="flex-1"
                  >
                    {t.suggestion}
                  </Button>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">{t.message}</label>
                <textarea
                  className="w-full h-48 px-4 py-3 rounded-lg bg-input-background border border-input text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-200 resize-none"
                  placeholder={t.messagePlaceholder}
                />
              </div>

              <Button variant="primary" size="lg" className="w-full">
                <Send className="w-5 h-5 mr-2" />
                {t.send}
              </Button>
            </form>
          </Card>
        </div>
      </div>
    </div>
  );
}

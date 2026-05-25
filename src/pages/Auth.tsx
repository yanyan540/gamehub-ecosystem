import { useState } from 'react';
import { Input } from '../components/Input';
import { Button } from '../components/Button';
import { Card } from '../components/Card';
import { Mail, Lock, User, Gamepad2 } from 'lucide-react';
import { useNavigate } from 'react-router';
import { loginUser, registerUser, guardarSesion } from '../services/api';

export function Auth() {
  const [isLogin, setIsLogin] = useState(true);
  const [nombre, setNombre] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    if (!isLogin && password !== confirmPassword) {
      alert('Las contraseñas no coinciden');
      setLoading(false);
      return;
    }

    try {
      if (isLogin) {
        const data = await loginUser(email, password);
        console.log('Respuesta login:', data); 
        
        if (data && (data.status === 'success' || data.token || data.usuario)) {
          guardarSesion(data.usuario || data);
          navigate('/dashboard');
        } else {
          alert(data?.message || 'Credenciales incorrectas');
        }
      } else {
        await registerUser(nombre, email, password);
        alert('Cuenta creada con éxito. Ya puedes iniciar sesión.');
        
        setPassword('');
        setConfirmPassword('');
        setIsLogin(true);
      }
    } catch (err) {
      console.error('Error de conexión:', err);
      alert('Error de conexión con el servidor');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-8">
      <div className="w-full max-w-6xl grid md:grid-cols-2 gap-8 items-center">
        <div className="hidden md:block relative">
          <div className="relative aspect-square rounded-2xl overflow-hidden">
            <img
              src="https://images.unsplash.com/photo-1542751371-adc38448a05e?w=800"
              alt="Gaming"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-br from-primary/50 to-secondary/50 flex items-center justify-center">
              <div className="text-center">
                <Gamepad2 className="w-24 h-24 text-white mx-auto mb-4 drop-shadow-[0_0_30px_rgba(255,255,255,0.5)]" />
                <h2 className="text-4xl font-bold text-white mb-2">Game-Hub</h2>
                <p className="text-white/90 text-lg">Tu comunidad gaming definitiva</p>
              </div>
            </div>
          </div>
        </div>

        <Card className="w-full max-w-md mx-auto">
          <div className="mb-6 text-center">
            <h1 className="text-3xl font-bold mb-2">
              {isLogin ? 'Iniciar Sesión' : 'Crear Cuenta'}
            </h1>
            <p className="text-muted-foreground">
              {isLogin ? 'Accede a tu cuenta de Game-Hub' : 'Únete a la comunidad de gamers'}
            </p>
          </div>

          <form className="space-y-4" onSubmit={handleSubmit}>
            {!isLogin && (
              <div>
                <label className="block text-sm font-medium mb-2">Nombre de usuario</label>
                <Input
                  icon={<User className="w-4 h-4" />}
                  placeholder="gamer_pro"
                  value={nombre}
                  onChange={e => setNombre(e.target.value)}
                  required
                />
              </div>
            )}

            <div>
              <label className="block text-sm font-medium mb-2">Correo electrónico</label>
              <Input
                type="email"
                icon={<Mail className="w-4 h-4" />}
                placeholder="tu@email.com"
                value={email}
                onChange={e => setEmail(e.target.value)}
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Contraseña</label>
              <Input
                type="password"
                icon={<Lock className="w-4 h-4" />}
                placeholder="••••••••"
                value={password}
                onChange={e => setPassword(e.target.value)}
                required
              />
            </div>

            {!isLogin && (
              <div>
                <label className="block text-sm font-medium mb-2">Confirmar contraseña</label>
                <Input
                  type="password"
                  icon={<Lock className="w-4 h-4" />}
                  placeholder="••••••••"
                  value={confirmPassword}
                  onChange={e => setConfirmPassword(e.target.value)}
                  required
                />
              </div>
            )}

            {isLogin && (
              <div className="flex items-center justify-between text-sm">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" className="rounded border-border" />
                  <span className="text-muted-foreground">Recordarme</span>
                </label>
                <a href="#" className="text-primary hover:underline">
                  ¿Olvidaste tu contraseña?
                </a>
              </div>
            )}

            <Button variant="primary" className="w-full" size="lg" disabled={loading}>
              {loading ? 'Cargando...' : isLogin ? 'Iniciar Sesión' : 'Crear Cuenta'}
            </Button>

            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-border"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-card text-muted-foreground">O continúa con</span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <Button variant="outline" type="button">
                <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
                  <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                  <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                  <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                  <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                </svg>
                Google
              </Button>
              <Button variant="outline" type="button">
                <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                </svg>
                GitHub
              </Button>
            </div>
          </form>

          <div className="mt-6 text-center text-sm">
            <span className="text-muted-foreground">
              {isLogin ? '¿No tienes cuenta?' : '¿Ya tienes cuenta?'}
            </span>{' '}
            <button
              onClick={() => setIsLogin(!isLogin)}
              className="text-primary hover:underline font-medium"
            >
              {isLogin ? 'Regístrate' : 'Inicia sesión'}
            </button>
          </div>
        </Card>
      </div>
    </div>
  );
}
import { Link, useLocation } from 'react-router';
import { Search, Home, TrendingUp, User, Settings, Newspaper, Globe, Calendar } from 'lucide-react';
import { Button } from './Button';
import { cn } from '../lib/utils';
import { useApp } from '../context/AppContext';

export function Navbar() {
  const location = useLocation();
  const { language, setLanguage, t, userRole, setUserRole } = useApp();

  const isActive = (path: string) => location.pathname === path;

  const toggleLanguage = () => {
    setLanguage(language === 'es' ? 'en' : 'es');
  };

  const toggleRole = () => {
    setUserRole(userRole === 'user' ? 'admin' : 'user');
  };

  return (
    <nav className="border-b border-border bg-card/50 backdrop-blur-lg sticky top-0 z-50">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary to-secondary flex items-center justify-center shadow-[0_0_20px_var(--primary-glow)]">
            <span className="text-white font-bold text-xl">G</span>
          </div>
          <span className="text-xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            Game-Hub
          </span>
        </Link>

        <div className="hidden md:flex items-center gap-6">
          <Link
            to="/"
            className={cn(
              'text-sm font-medium transition-colors hover:text-primary',
              isActive('/') ? 'text-primary' : 'text-muted-foreground'
            )}
          >
            {t('home')}
          </Link>
          <Link
            to="/games"
            className={cn(
              'text-sm font-medium transition-colors hover:text-primary',
              isActive('/games') ? 'text-primary' : 'text-muted-foreground'
            )}
          >
            {t('games')}
          </Link>
          <Link
            to="/news"
            className={cn(
              'text-sm font-medium transition-colors hover:text-primary',
              isActive('/news') ? 'text-primary' : 'text-muted-foreground'
            )}
          >
            {t('news')}
          </Link>
          <Link
            to="/calendar"
            className={cn(
              'text-sm font-medium transition-colors hover:text-primary',
              isActive('/calendar') ? 'text-primary' : 'text-muted-foreground'
            )}
          >
            {t('calendar')}
          </Link>
          <Link
            to="/contact"
            className={cn(
              'text-sm font-medium transition-colors hover:text-primary',
              isActive('/contact') ? 'text-primary' : 'text-muted-foreground'
            )}
          >
            {t('contact')}
          </Link>
          <Link
            to="/dashboard"
            className={cn(
              'text-sm font-medium transition-colors hover:text-primary',
              isActive('/dashboard') ? 'text-primary' : 'text-muted-foreground'
            )}
          >
            {t('profile')}
          </Link>
        </div>

        <div className="flex items-center gap-3">
          <Button
            variant="ghost"
            size="sm"
            onClick={toggleLanguage}
            className="gap-1.5"
          >
            <Globe className="w-4 h-4" />
            <span className="font-semibold">{language.toUpperCase()}</span>
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={toggleRole}
            title="Toggle user role (demo)"
          >
            {userRole === 'admin' ? <Settings className="w-4 h-4" /> : <User className="w-4 h-4" />}
          </Button>
          <Link to="/search">
            <Button variant="ghost" size="sm">
              <Search className="w-4 h-4" />
            </Button>
          </Link>
          <Link to="/auth">
            <Button variant="outline" size="sm">{t('login')}</Button>
          </Link>
        </div>
      </div>
    </nav>
  );
}

export function MobileNav() {
  const location = useLocation();
  const { t, userRole } = useApp();

  const isActive = (path: string) => location.pathname === path;

  const navItems = [
    { path: '/', icon: Home, label: t('home') },
    { path: '/games', icon: TrendingUp, label: t('games') },
    { path: '/calendar', icon: Calendar, label: t('calendar') },
    { path: '/news', icon: Newspaper, label: t('news') },
    { path: userRole === 'admin' ? '/admin' : '/dashboard', icon: userRole === 'admin' ? Settings : User, label: userRole === 'admin' ? t('admin') : t('profile') },
  ];

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-card/95 backdrop-blur-lg border-t border-border z-50">
      <div className="flex items-center justify-around h-16">
        {navItems.map((item) => {
          const Icon = item.icon;
          const active = isActive(item.path);

          return (
            <Link
              key={item.path}
              to={item.path}
              className={cn(
                'flex flex-col items-center justify-center gap-1 flex-1 h-full transition-colors',
                active ? 'text-primary' : 'text-muted-foreground'
              )}
            >
              <Icon className={cn('w-5 h-5', active && 'drop-shadow-[0_0_8px_var(--primary-glow)]')} />
              <span className="text-xs">{item.label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}

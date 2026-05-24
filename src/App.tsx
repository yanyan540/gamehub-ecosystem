import { BrowserRouter, Routes, Route } from 'react-router';
import { AppProvider } from './context/AppContext';
import { Home } from './pages/Home';
import { GameCatalog } from './pages/GameCatalog';
import { NewsFeed } from './pages/NewsFeed';
import { ArticleView } from './pages/ArticleView';
import { Auth } from './pages/Auth';
import { UserDashboard } from './pages/UserDashboard';
import { AdminPanel } from './pages/AdminPanel';
import { Calendar } from './pages/Calendar';
import { Navbar, MobileNav } from './components/Navbar';
import { Contact } from './pages/Contact';

export default function App() {
  return (
    <AppProvider>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/games" element={<GameCatalog />} />
          <Route path="/news" element={<NewsFeed />} />
          <Route path="/news/:id" element={<ArticleView />} />
          <Route path="/auth" element={<Auth />} />
          <Route path="/dashboard" element={<UserDashboard />} />
          <Route path="/admin" element={<AdminPanel />} />
          <Route path="/calendar" element={<Calendar />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
        <MobileNav />
      </BrowserRouter>
    </AppProvider>
  );
}


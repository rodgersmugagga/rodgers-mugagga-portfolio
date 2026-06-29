import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { ThemeProvider } from './context/ThemeContext';
import { AuthProvider } from './context/AuthContext';
import Navbar from './components/Navbar';
import ThemeToggle from './components/ThemeToggle';
import Footer from './components/Footer';
import Home from './pages/Home';

import NotFound from './pages/NotFound';


function App() {
  return (
    <HelmetProvider>
      <ThemeProvider>
        <AuthProvider>
          <BrowserRouter>
            <div className="min-h-screen bg-bg-light dark:bg-bg-dark text-text-dark dark:text-text-light transition-colors">
              <ThemeToggle />
              <Navbar />
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
              <Footer />
            </div>
          </BrowserRouter>
        </AuthProvider>
      </ThemeProvider>
    </HelmetProvider>
  );
}

export default App;
import React, { useState, useEffect } from 'react';
import { Layout } from './components/Layout';
import { Home } from './pages/Home';
import { AuthPage } from './pages/Auth';
import { Dashboard } from './pages/Dashboard';
import { ProductsPage, SolutionsPage, PricingPage, CompanyPage, ResearchPage, ResourcesPage, LegalPage } from './pages/MarketingPages';

const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState('home');
  const [user, setUser] = useState<string | null>(null);

  // Simple scrollToTop on navigation
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [currentPage]);

  // Check auth on mount
  useEffect(() => {
    const storedUser = localStorage.getItem('rv_user');
    if (storedUser) {
      setUser(storedUser);
    }
  }, []);

  const handleAuth = (username: string) => {
    localStorage.setItem('rv_user', username);
    setUser(username);
    setCurrentPage('dashboard');
  };

  const renderPage = () => {
    switch (currentPage) {
      case 'home': return <Home onNavigate={setCurrentPage} />;
      case 'products': return <ProductsPage />;
      case 'solutions': return <SolutionsPage />;
      case 'pricing': return <PricingPage />;
      case 'company': return <CompanyPage />;
      case 'research': return <ResearchPage />;
      
      // Resources
      case 'documentation': return <ResourcesPage type="Documentation" />;
      case 'api': return <ResourcesPage type="API Reference" />;
      case 'blog': return <ResourcesPage type="Blog" />;
      case 'community': return <ResourcesPage type="Community" />;
      
      // Legal
      case 'legal': return <LegalPage type="Legal Terms" />;
      case 'careers': return <ResourcesPage type="Careers" />;
      
      // Auth & App
      case 'login': return <AuthPage mode="login" onAuth={handleAuth} onNavigate={setCurrentPage} />;
      case 'signup': return <AuthPage mode="signup" onAuth={handleAuth} onNavigate={setCurrentPage} />;
      case 'dashboard': return user ? <Dashboard username={user} /> : <AuthPage mode="login" onAuth={handleAuth} onNavigate={setCurrentPage} />;
      
      default: return <Home onNavigate={setCurrentPage} />;
    }
  };

  return (
    <Layout currentPage={currentPage} onNavigate={setCurrentPage}>
      {renderPage()}
    </Layout>
  );
};

export default App;
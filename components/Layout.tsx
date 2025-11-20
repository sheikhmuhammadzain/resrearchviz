import React, { useState, useEffect } from 'react';
import { Button } from './Button';
import { ChatWidget } from './ChatWidget';

interface LayoutProps {
  children: React.ReactNode;
  currentPage: string;
  onNavigate: (page: string) => void;
}

export const Layout: React.FC<LayoutProps> = ({ children, currentPage, onNavigate }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [username, setUsername] = useState('');

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const user = localStorage.getItem('rv_user');
    if (user) {
        setIsAuthenticated(true);
        setUsername(user);
    } else {
        setIsAuthenticated(false);
        setUsername('');
    }
  }, [currentPage]);

  const handleLogout = () => {
      localStorage.removeItem('rv_user');
      setIsAuthenticated(false);
      onNavigate('home');
  };

  const navLinks = [
    { id: 'products', label: 'Products' },
    { id: 'solutions', label: 'Solutions' },
    { id: 'research', label: 'Research' },
    { id: 'resources', label: 'Resources' },
    { id: 'company', label: 'Company' },
  ];

  return (
    <div className="min-h-screen bg-cohere-darker text-cohere-light font-sans selection:bg-cohere-accent selection:text-white">
      {/* Navigation */}
      <nav 
        className={`fixed top-0 w-full z-50 transition-all duration-300 border-b ${
          isScrolled ? 'bg-cohere-darker/80 backdrop-blur-md border-white/5 py-3' : 'bg-transparent border-transparent py-5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
          {/* Logo */}
          <div 
            onClick={() => onNavigate('home')} 
            className="flex items-center gap-3 cursor-pointer group"
          >
            <div className="w-8 h-8 bg-cohere-accent rounded-lg flex items-center justify-center transform group-hover:rotate-90 transition-transform duration-500">
                <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
            </div>
            <span className="text-xl font-bold tracking-tight text-white">ResearchVis</span>
          </div>

          {/* Desktop Links */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map(link => (
              <button
                key={link.id}
                onClick={() => onNavigate(link.id)}
                className={`text-sm font-medium transition-colors ${
                  currentPage === link.id ? 'text-white' : 'text-cohere-sand hover:text-white'
                }`}
              >
                {link.label}
              </button>
            ))}
          </div>

          {/* Auth Buttons */}
          <div className="flex items-center gap-4">
            {isAuthenticated ? (
                <div className="flex items-center gap-4">
                    <button onClick={() => onNavigate('dashboard')} className="hidden md:block text-sm font-medium text-white hover:text-cohere-accent transition-colors">
                        Dashboard
                    </button>
                    <div className="h-8 w-[1px] bg-white/10 hidden md:block"></div>
                    <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-cohere-accent to-purple-500 flex items-center justify-center text-xs font-bold text-white">
                            {username.charAt(0).toUpperCase()}
                        </div>
                        <button onClick={handleLogout} className="text-xs text-cohere-sand hover:text-white">Sign out</button>
                    </div>
                </div>
            ) : (
                <>
                    <button onClick={() => onNavigate('login')} className="text-sm font-medium text-white hover:text-cohere-accent transition-colors hidden md:block">
                    Sign in
                    </button>
                    <Button onClick={() => onNavigate('signup')} className="py-2 px-4 text-xs">
                    Talk to sales
                    </Button>
                </>
            )}
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="relative z-10">
        {children}
      </main>

      {/* Footer */}
      <footer className="bg-cohere-dark border-t border-white/5 pt-20 pb-10">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-10 mb-16">
            <div className="col-span-2">
              <div className="flex items-center gap-2 mb-6">
                <div className="w-6 h-6 bg-cohere-accent rounded flex items-center justify-center">
                    <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
                </div>
                <span className="text-lg font-bold text-white">ResearchVis</span>
              </div>
              <p className="text-cohere-sand text-sm leading-relaxed max-w-xs">
                Empowering scientists with AI-driven visualization tools. Accelerate your research lifecycle from hypothesis to publication.
              </p>
            </div>
            
            <div>
              <h4 className="text-white font-semibold mb-6">Product</h4>
              <ul className="space-y-4 text-sm text-cohere-sand">
                <li className="hover:text-white cursor-pointer">Synthesis</li>
                <li className="hover:text-white cursor-pointer">Mapping</li>
                <li className="hover:text-white cursor-pointer">Enterprise</li>
                <li className="hover:text-white cursor-pointer">Pricing</li>
              </ul>
            </div>

            <div>
              <h4 className="text-white font-semibold mb-6">Company</h4>
              <ul className="space-y-4 text-sm text-cohere-sand">
                <li className="hover:text-white cursor-pointer">About</li>
                <li className="hover:text-white cursor-pointer">Careers</li>
                <li className="hover:text-white cursor-pointer">Blog</li>
                <li className="hover:text-white cursor-pointer">Contact</li>
              </ul>
            </div>

            <div>
              <h4 className="text-white font-semibold mb-6">Legal</h4>
              <ul className="space-y-4 text-sm text-cohere-sand">
                <li className="hover:text-white cursor-pointer" onClick={() => onNavigate('legal')}>Terms</li>
                <li className="hover:text-white cursor-pointer" onClick={() => onNavigate('legal')}>Privacy</li>
                <li className="hover:text-white cursor-pointer">Security</li>
              </ul>
            </div>
          </div>
          
          <div className="flex flex-col md:flex-row justify-between items-center pt-8 border-t border-white/5">
            <p className="text-xs text-cohere-sand">© 2025 ResearchVis AI Inc. All rights reserved.</p>
            <div className="flex gap-6 mt-4 md:mt-0">
               {/* Social Icons Placeholder */}
               <div className="w-5 h-5 bg-cohere-sand/20 hover:bg-cohere-accent transition-colors rounded-full cursor-pointer"></div>
               <div className="w-5 h-5 bg-cohere-sand/20 hover:bg-cohere-accent transition-colors rounded-full cursor-pointer"></div>
               <div className="w-5 h-5 bg-cohere-sand/20 hover:bg-cohere-accent transition-colors rounded-full cursor-pointer"></div>
            </div>
          </div>
        </div>
      </footer>

      {/* Chat Widget */}
      {isAuthenticated && <ChatWidget />}
    </div>
  );
};
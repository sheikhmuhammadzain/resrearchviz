
import React, { useState } from 'react';
import { Button } from '../components/Button';

interface AuthProps {
  mode: 'login' | 'signup';
  onAuth: (username: string) => void;
  onNavigate: (page: string) => void;
}

export const AuthPage: React.FC<AuthProps> = ({ mode, onAuth, onNavigate }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate network delay for professional feel
    setTimeout(() => {
      const displayName = mode === 'login' ? (name || email.split('@')[0] || 'User') : name;
      onAuth(displayName);
      setIsLoading(false);
    }, 1500);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-cohere-darker relative overflow-hidden px-6">
      {/* Background Elements */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-cohere-teal/10 blur-[100px] rounded-full pointer-events-none"></div>
      <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-cohere-accent/5 blur-[80px] rounded-full pointer-events-none"></div>

      <div className="w-full max-w-md bg-cohere-surface border border-cohere-light/10 rounded-2xl shadow-2xl p-8 md:p-12 relative z-10 animate-in fade-in slide-in-from-bottom-4 duration-700">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-12 h-12 bg-cohere-light/5 rounded-xl mb-6 border border-cohere-light/10">
             <div className="w-4 h-4 bg-cohere-accent rounded-full"></div>
          </div>
          <h1 className="text-3xl font-serif text-cohere-light mb-2">{mode === 'login' ? 'Welcome Back' : 'Create Account'}</h1>
          <p className="text-cohere-light/60 text-sm">
            {mode === 'login' ? 'Enter your credentials to access your dashboard.' : 'Join thousands of researchers analyzing data faster.'}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          {mode === 'signup' && (
            <div>
              <label className="block text-xs font-bold text-cohere-teal uppercase tracking-wider mb-2">Full Name</label>
              <input 
                type="text" 
                required 
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full bg-cohere-darker border border-cohere-light/10 rounded-lg px-4 py-3 text-cohere-light focus:border-cohere-accent/50 focus:ring-1 focus:ring-cohere-accent/50 outline-none transition-all placeholder-cohere-light/20"
                placeholder="e.g. Dr. Jane Doe"
              />
            </div>
          )}

          <div>
            <label className="block text-xs font-bold text-cohere-teal uppercase tracking-wider mb-2">Email Address</label>
            <input 
              type="email" 
              required 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-cohere-darker border border-cohere-light/10 rounded-lg px-4 py-3 text-cohere-light focus:border-cohere-accent/50 focus:ring-1 focus:ring-cohere-accent/50 outline-none transition-all placeholder-cohere-light/20"
              placeholder="name@institution.edu"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-cohere-teal uppercase tracking-wider mb-2">Password</label>
            <input 
              type="password" 
              required 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-cohere-darker border border-cohere-light/10 rounded-lg px-4 py-3 text-cohere-light focus:border-cohere-accent/50 focus:ring-1 focus:ring-cohere-accent/50 outline-none transition-all placeholder-cohere-light/20"
              placeholder="••••••••"
            />
          </div>

          <Button type="submit" isLoading={isLoading} className="w-full py-4 mt-4 text-cohere-darker font-bold bg-cohere-light hover:bg-white shadow-lg shadow-cohere-light/10">
            {mode === 'login' ? 'Sign In' : 'Get Started'}
          </Button>
        </form>

        <div className="mt-8 text-center">
          <p className="text-sm text-cohere-light/50">
            {mode === 'login' ? "Don't have an account? " : "Already have an account? "}
            <button 
              onClick={() => onNavigate(mode === 'login' ? 'signup' : 'login')}
              className="text-cohere-accent hover:text-white font-medium transition-colors"
            >
              {mode === 'login' ? 'Sign up' : 'Log in'}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};
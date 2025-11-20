import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  isLoading?: boolean;
}

export const Button: React.FC<ButtonProps> = ({ 
  children, 
  variant = 'primary', 
  isLoading, 
  className = '', 
  ...props 
}) => {
  const baseStyles = "px-5 py-2.5 rounded-lg font-semibold text-sm transition-all duration-200 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed tracking-tight";
  
  const variants = {
    primary: "bg-cohere-accent text-white hover:bg-blue-600 shadow-[0_0_20px_-5px_rgba(37,99,235,0.5)] hover:shadow-[0_0_25px_-5px_rgba(37,99,235,0.6)] border border-transparent",
    secondary: "bg-white text-black hover:bg-gray-100 border border-transparent",
    outline: "bg-transparent border border-white/20 text-white hover:bg-white/10",
    ghost: "text-cohere-sand hover:text-white hover:bg-white/5"
  };

  return (
    <button 
      className={`${baseStyles} ${variants[variant]} ${className}`}
      disabled={isLoading || props.disabled}
      {...props}
    >
      {isLoading && (
        <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-current" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
      )}
      {children}
    </button>
  );
};
import React, { useState, useRef, useEffect } from 'react';
import { streamChat } from '../services/geminiService';
import { ChatMessage } from '../types';
import { Button } from './Button';

export const ChatWidget: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    { role: 'model', text: 'Hello! I am your Gemini research assistant. How can I help you analyze your data today?' }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMsg: ChatMessage = { role: 'user', text: input };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsLoading(true);

    try {
      // Prepare history for API
      // Filter out the initial welcome message if it's from the model, as API expects history to start with User
      const history = messages
        .filter((_, index) => index > 0 || messages[0].role === 'user')
        .map(m => ({ role: m.role, text: m.text }));

      const stream = streamChat(history, userMsg.text);
      
      let fullResponse = "";
      setMessages(prev => [...prev, { role: 'model', text: '' }]); // Placeholder

      for await (const chunk of stream) {
        fullResponse += chunk;
        setMessages(prev => {
          const newArr = [...prev];
          newArr[newArr.length - 1] = { role: 'model', text: fullResponse };
          return newArr;
        });
      }
    } catch (error) {
      console.error(error);
      setMessages(prev => [...prev, { role: 'model', text: "I'm sorry, I encountered an error connecting to Gemini. Please try again." }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end pointer-events-none">
      {/* Chat Window */}
      <div className={`pointer-events-auto mb-4 w-[360px] h-[500px] bg-cohere-darker border border-cohere-light/10 rounded-2xl shadow-2xl flex flex-col overflow-hidden transition-all duration-300 origin-bottom-right ${isOpen ? 'opacity-100 scale-100' : 'opacity-0 scale-90 translate-y-10 pointer-events-none'}`}>
        {/* Header */}
        <div className="p-4 bg-cohere-surface border-b border-cohere-light/5 flex justify-between items-center">
          <div className="flex items-center gap-2">
             <div className="w-2 h-2 bg-cohere-accent rounded-full animate-pulse"></div>
             <span className="font-serif font-medium text-cohere-light">Gemini Assistant</span>
          </div>
          <button onClick={() => setIsOpen(false)} className="text-cohere-light/50 hover:text-cohere-light">
             <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
          </button>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4 custom-scrollbar bg-cohere-darker">
           {messages.map((msg, idx) => (
             <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[80%] p-3 rounded-2xl text-sm leading-relaxed ${msg.role === 'user' ? 'bg-cohere-accent text-white rounded-tr-none' : 'bg-cohere-light/10 text-cohere-light rounded-tl-none'}`}>
                  {msg.text}
                </div>
             </div>
           ))}
           <div ref={messagesEndRef} />
        </div>

        {/* Input */}
        <div className="p-4 bg-cohere-surface border-t border-cohere-light/5">
          <div className="flex gap-2">
            <input 
              type="text" 
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              placeholder="Ask about your research..."
              className="flex-1 bg-cohere-dark border border-cohere-light/10 rounded-full px-4 py-2 text-sm text-cohere-light focus:outline-none focus:border-cohere-accent/50"
            />
            <button onClick={handleSend} disabled={isLoading} className="p-2 bg-cohere-light text-cohere-dark rounded-full hover:bg-white transition-colors disabled:opacity-50">
               <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" /></svg>
            </button>
          </div>
        </div>
      </div>

      {/* Toggle Button */}
      <button 
        onClick={() => setIsOpen(!isOpen)} 
        className="pointer-events-auto w-14 h-14 bg-cohere-accent hover:bg-[#c46545] text-white rounded-full shadow-lg flex items-center justify-center transition-all hover:scale-105"
      >
        {isOpen ? (
           <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" /></svg>
        ) : (
           <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" /></svg>
        )}
      </button>
    </div>
  );
};
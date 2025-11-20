
import React, { useEffect, useRef } from 'react';

interface ThinkingTerminalProps {
  content: string;
  isVisible: boolean;
  mode: 'thinking' | 'generating';
}

export const ThinkingTerminal: React.FC<ThinkingTerminalProps> = ({ content, isVisible, mode }) => {
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [content]);

  if (!isVisible) return null;

  // Basic syntax highlighting for JSON-like stream
  const highlightCode = (text: string) => {
    if (!text) return '';
    
    // 1. Escape HTML
    let safe = text
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;');

    // 2. Highlight keys in JSON (e.g., "reasoning": )
    // We look for "word": pattern
    safe = safe.replace(
      /("[\w]+")(\s*:)/g, 
      '<span class="text-cohere-accent">$1</span>$2'
    );

    return safe;
  };

  return (
    <div className="w-full relative min-h-[300px] max-h-[500px] bg-[#0f1f1a]/95 backdrop-blur-xl z-20 flex flex-col font-mono text-xs md:text-sm rounded-2xl border border-cohere-teal/20 shadow-2xl overflow-hidden transition-all duration-500 animate-in fade-in zoom-in-95 mb-8">
       
       {/* Header */}
       <div className="flex items-center justify-between px-6 py-4 bg-[#0a1612] border-b border-cohere-teal/10 select-none flex-shrink-0">
          <div className="flex items-center gap-3">
              <div className={`w-2 h-2 rounded-full ${mode === 'thinking' ? 'bg-cohere-accent animate-pulse shadow-[0_0_8px_rgba(217,119,87,0.8)]' : 'bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.8)]'}`}></div>
              <span className="text-cohere-light/90 text-xs tracking-[0.2em] font-bold uppercase">{mode === 'thinking' ? 'Gemini Cortex Active' : 'Synthesizing Output'}</span>
          </div>
          <span className="text-cohere-light/30 text-[10px] tracking-widest uppercase font-medium">Token Stream</span>
       </div>
       
       {/* Terminal Output */}
       <div ref={scrollRef} className="flex-1 overflow-y-auto custom-scrollbar p-8 bg-[#0f1f1a]">
          <pre className="font-mono text-sm leading-loose whitespace-pre-wrap break-all text-cohere-light/70">
            <code dangerouslySetInnerHTML={{ __html: highlightCode(content) }} />
            <span className="inline-block w-2 h-4 bg-cohere-accent ml-1 animate-pulse align-middle shadow-[0_0_8px_rgba(217,119,87,0.6)]"></span>
          </pre>
       </div>

       {/* Footer */}
       <div className="px-6 py-3 bg-[#0a1612] border-t border-cohere-teal/10 flex justify-between items-center text-[10px] text-cohere-light/30 font-medium tracking-wider uppercase select-none flex-shrink-0">
          <div className="flex gap-4">
              <span>Model: gemini-3-pro-preview</span>
              <span>Latency: {(Math.random() * 20 + 40).toFixed(0)}ms</span>
          </div>
          <span>Status: {mode === 'thinking' ? 'REASONING...' : 'GENERATING...'}</span>
       </div>
    </div>
  );
};

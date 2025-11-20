
import React, { useState, useRef, useEffect } from 'react';
import { OutputType, InputMode } from '../types';

interface CompactInputProps {
  onGenerate: (text: string, mode: InputMode, file: File | null, outputType: OutputType, useThinking: boolean) => void;
  isGenerating: boolean;
}

export const CompactInput: React.FC<CompactInputProps> = ({ onGenerate, isGenerating }) => {
  const [text, setText] = useState('');
  const [outputType, setOutputType] = useState<OutputType>(OutputType.SLIDES);
  const [file, setFile] = useState<File | null>(null);
  const [useThinking, setUseThinking] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Icons map
  const TYPE_ICONS: Record<OutputType, React.ReactNode> = {
    [OutputType.SLIDES]: <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z" /></svg>,
    [OutputType.POSTER]: <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>,
    [OutputType.DIAGRAM]: <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>,
    [OutputType.CITATION_MAP]: <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064" /></svg>,
    [OutputType.ANALYSIS]: <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
  };

  const TYPE_LABELS: Record<OutputType, string> = {
    [OutputType.SLIDES]: "Presentation Deck",
    [OutputType.POSTER]: "Research Poster",
    [OutputType.DIAGRAM]: "Process Flow",
    [OutputType.CITATION_MAP]: "Citation Map",
    [OutputType.ANALYSIS]: "Deep Analysis"
  };

  // Auto-resize textarea
  const adjustHeight = () => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight, 300)}px`;
    }
  };

  useEffect(() => {
    adjustHeight();
  }, [text]);

  // Click outside to close dropdown
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  const handleFileSelect = () => {
    // Programmatically click the hidden input
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
      // Reset value so the same file can be selected again if needed
      e.target.value = '';
    }
  };

  const removeFile = () => {
    setFile(null);
    if (fileInputRef.current) {
        fileInputRef.current.value = '';
    }
  };

  const handleSubmit = () => {
    if ((!text.trim() && !file) || isGenerating) return;
    
    let mode = InputMode.TEXT;
    if (file) {
        mode = (file.type.startsWith('image/') || file.type === 'application/pdf') ? InputMode.FILE : InputMode.TEXT;
    }

    onGenerate(text, mode, file, outputType, useThinking);
    setText('');
    setFile(null);
    if (textareaRef.current) textareaRef.current.style.height = 'auto';
  };

  const isSendDisabled = (!text.trim() && !file) || isGenerating;

  return (
    <div className="w-full max-w-3xl mx-auto relative">
        {/* Floating Container */}
        <div className="bg-[#141414] rounded-2xl border border-white/10 shadow-2xl overflow-visible transition-all duration-200 focus-within:border-cohere-accent/50 focus-within:ring-1 focus-within:ring-cohere-accent/50 relative z-50">
            
            {/* Text Area */}
            <div className="p-4">
                <textarea
                    ref={textareaRef}
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder="Describe your research, paste an abstract, or ask for a visualization..."
                    className="w-full bg-transparent border-none text-white placeholder-white/30 resize-none focus:ring-0 text-sm md:text-base leading-relaxed max-h-[300px] min-h-[60px]"
                    rows={1}
                />
                
                {/* File Preview */}
                {file && (
                    <div className="flex items-center gap-2 mt-2 bg-white/5 px-3 py-2 rounded-lg w-fit border border-white/5 animate-in fade-in zoom-in duration-200">
                         <div className="w-6 h-6 bg-cohere-accent/20 rounded flex items-center justify-center text-cohere-accent">
                            {file.type === 'application/pdf' ? (
                                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
                            ) : (
                                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                            )}
                         </div>
                         <span className="text-xs text-white max-w-[200px] truncate font-medium">{file.name}</span>
                         <button onClick={removeFile} className="text-white/50 hover:text-white ml-2 p-1 hover:bg-white/10 rounded">
                            <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
                         </button>
                    </div>
                )}
            </div>

            {/* Bottom Bar */}
            <div className="h-12 bg-black/20 border-t border-white/5 rounded-b-2xl flex items-center justify-between px-2 md:px-4">
                
                <div className="flex items-center gap-2">
                    
                    {/* Output Type Selector */}
                    <div className="relative" ref={dropdownRef}>
                        <button 
                            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                            className="flex items-center gap-2 px-3 py-1.5 rounded-lg hover:bg-white/5 text-cohere-sand hover:text-white text-xs font-medium transition-colors"
                        >
                            {TYPE_ICONS[outputType]}
                            <span className="hidden md:inline">{TYPE_LABELS[outputType]}</span>
                            <svg className={`w-3 h-3 transition-transform duration-200 ${isDropdownOpen ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" /></svg>
                        </button>

                        {/* Dropdown Menu */}
                        {isDropdownOpen && (
                            <div className="absolute bottom-full left-0 mb-2 w-56 bg-[#1a1a1a] border border-white/10 rounded-xl shadow-xl overflow-hidden py-1 animate-in fade-in zoom-in-95 duration-100 origin-bottom-left">
                                {Object.values(OutputType).map((type) => (
                                    <button
                                        key={type}
                                        onClick={() => { setOutputType(type); setIsDropdownOpen(false); }}
                                        className={`w-full px-4 py-2.5 flex items-center gap-3 text-xs md:text-sm text-left hover:bg-white/5 transition-colors ${outputType === type ? 'text-cohere-accent bg-cohere-accent/5' : 'text-white/80'}`}
                                    >
                                        <span className={outputType === type ? 'text-cohere-accent' : 'text-white/50'}>
                                            {TYPE_ICONS[type]}
                                        </span>
                                        {TYPE_LABELS[type]}
                                        {outputType === type && <svg className="w-4 h-4 ml-auto text-cohere-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" /></svg>}
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>

                    <div className="w-[1px] h-4 bg-white/10 mx-1"></div>

                    {/* Thinking Toggle */}
                    <button 
                        onClick={() => setUseThinking(!useThinking)}
                        className={`flex items-center gap-2 px-3 py-1.5 rounded-lg transition-colors text-xs font-medium ${useThinking ? 'bg-cohere-accent/10 text-cohere-accent' : 'text-cohere-sand hover:bg-white/5 hover:text-white'}`}
                        title="Use Gemini 3.0 Pro Reasoning"
                    >
                        <div className={`w-3 h-3 rounded-full border ${useThinking ? 'bg-cohere-accent border-cohere-accent' : 'border-white/30 bg-transparent'}`}></div>
                        <span className="hidden md:inline">Deep Think</span>
                    </button>
                </div>

                <div className="flex items-center gap-2">
                    {/* File Upload Button */}
                    <button 
                        onClick={handleFileSelect}
                        className={`p-2 rounded-lg hover:bg-white/5 text-cohere-sand hover:text-white cursor-pointer transition-colors ${file ? 'text-cohere-accent' : ''}`}
                        title="Attach file"
                    >
                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13" /></svg>
                    </button>
                    {/* Hidden Input */}
                    <input 
                        type="file" 
                        ref={fileInputRef}
                        className="hidden" 
                        onChange={handleFileChange} 
                        accept=".txt,.md,.pdf,.png,.jpg,.jpeg" 
                    />

                    {/* Send Button */}
                    <button 
                        onClick={handleSubmit}
                        disabled={isSendDisabled}
                        className={`p-2 rounded-lg transition-all duration-200 ${
                            !isSendDisabled
                                ? 'bg-cohere-light text-black hover:bg-white shadow-[0_0_15px_-3px_rgba(255,255,255,0.3)]' 
                                : 'bg-white/5 text-white/20 cursor-not-allowed'
                        }`}
                    >
                        {isGenerating ? (
                            <svg className="animate-spin w-5 h-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                        ) : (
                            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
                        )}
                    </button>
                </div>
            </div>
        </div>
        
        {/* Helper Text */}
        <div className="text-center mt-3 text-[10px] text-white/20 font-mono uppercase tracking-widest">
            Gemini 3.0 Pro • Context: 1M Tokens • Safety: Strict
        </div>
    </div>
  );
};
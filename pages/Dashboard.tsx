
import React, { useState, useEffect } from 'react';
import { OutputType, InputMode, GeneratedContent } from '../types';
import { generateVisuals, parseFileContent, fileToBase64 } from '../services/geminiService';
import { SlideRenderer } from '../components/SlideRenderer';
import { PosterRenderer } from '../components/PosterRenderer';
import { DiagramRenderer } from '../components/DiagramRenderer';
import { ThinkingTerminal } from '../components/ThinkingTerminal';
import { CompactInput } from '../components/CompactInput';
import { AITextLoading } from '../components/AITextLoading';

interface DashboardProps {
  username: string;
}

export const Dashboard: React.FC<DashboardProps> = ({ username }) => {
  const [isGenerating, setIsGenerating] = useState(false);
  const [streamContent, setStreamContent] = useState('');
  const [generatedContent, setGeneratedContent] = useState<GeneratedContent | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [thinkingMode, setThinkingMode] = useState(false);
  const [activeOutputType, setActiveOutputType] = useState<OutputType>(OutputType.SLIDES);

  const handleGenerate = async (
      text: string, 
      mode: InputMode, 
      file: File | null, 
      outputType: OutputType, 
      useThinking: boolean
  ) => {
    setError(null);
    setIsGenerating(true);
    setStreamContent('');
    setGeneratedContent(null);
    setThinkingMode(useThinking);
    setActiveOutputType(outputType);

    try {
      let processedText = text;
      let mediaData: { mimeType: string, data: string } | undefined = undefined;

      if (file) {
          // Handle PDF and Images as binary media
          if (file.type === 'application/pdf' || file.type.startsWith('image/')) {
               const base64 = await fileToBase64(file);
               mediaData = { mimeType: file.type, data: base64 };
               // Ensure processedText is not empty if user sent file with no text
               if (!processedText.trim()) {
                   processedText = `Analyze the attached ${file.type === 'application/pdf' ? 'document' : 'image'} and generate the requested output.`;
               }
          } else {
               // Assume generic text file
               const content = await parseFileContent(file);
               if (content) {
                   processedText = text.trim() ? `${text}\n\nFILE CONTENT:\n${content}` : content;
               }
          }
      }

      const data = await generateVisuals(
          processedText, 
          outputType, 
          {
             useThinking: useThinking,
             mediaData: mediaData
          },
          (chunk) => {
              setStreamContent(chunk);
          }
      );
      setGeneratedContent({ type: outputType, data });
    } catch (err: any) {
      setError(err.message || "Something went wrong during generation.");
    } finally {
      setIsGenerating(false);
      // Keep stream content for inspection if needed, or clear it
      // setStreamContent(''); 
    }
  };

  return (
    <div className="h-screen bg-black flex flex-col overflow-hidden relative">
      
      {/* Top Header */}
      <div className="absolute top-0 left-0 w-full z-20 pt-20 pb-4 px-6 bg-gradient-to-b from-black via-black/80 to-transparent pointer-events-none">
          <div className="max-w-7xl mx-auto flex justify-between items-center pointer-events-auto">
            <div className="flex items-center gap-3">
                 <div className="w-8 h-8 bg-cohere-accent/20 rounded-lg flex items-center justify-center border border-cohere-accent/30">
                    <span className="text-cohere-accent font-bold text-xs">{username.charAt(0).toUpperCase()}</span>
                 </div>
                 <span className="text-sm font-medium text-white/60">Workspace / <span className="text-white">Project Alpha</span></span>
            </div>
            <div className="flex items-center gap-3 px-3 py-1.5 bg-white/5 rounded-full border border-white/10">
               <span className={`w-1.5 h-1.5 rounded-full ${isGenerating ? 'bg-cohere-accent animate-pulse' : 'bg-emerald-500'}`}></span>
               <span className="text-[10px] font-mono uppercase tracking-wide text-white/50">{isGenerating ? 'PROCESSING' : 'READY'}</span>
            </div>
          </div>
      </div>

      {/* Main Content Area - Full Screen Preview */}
      <div className="flex-1 relative w-full h-full bg-[#050505]">
        {/* Background Grid */}
        <div className="absolute inset-0 opacity-20" style={{ backgroundImage: 'radial-gradient(#333 1px, transparent 1px)', backgroundSize: '40px 40px' }}></div>
        
        {/* Content Container */}
        <div className="absolute inset-0 overflow-y-auto custom-scrollbar pt-32 pb-48 px-4">
            <div className="max-w-6xl mx-auto min-h-full flex flex-col justify-start">
                
                {/* Empty State */}
                {!generatedContent && !isGenerating && !streamContent && (
                    <div className="text-center opacity-30 select-none mt-32 animate-in fade-in slide-in-from-bottom-4 duration-700">
                        <div className="w-32 h-32 mx-auto mb-6 border border-white/10 rounded-full flex items-center justify-center bg-white/5">
                            <svg className="w-12 h-12 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.384-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" /></svg>
                        </div>
                        <h2 className="text-4xl font-bold text-white mb-2 tracking-tight">What are we visualizing?</h2>
                        <p className="text-lg text-cohere-sand">Upload a PDF paper or describe a concept to begin.</p>
                    </div>
                )}

                {/* Error Message */}
                {error && (
                     <div className="bg-red-900/20 border border-red-500/30 text-red-200 p-4 rounded-xl text-center mx-auto max-w-lg mb-8">
                         {error}
                     </div>
                )}

                {/* Loading State (Text Shimmer) */}
                {isGenerating && !streamContent && (
                    <div className="flex-1 flex items-center justify-center">
                        <AITextLoading selectedFeature={activeOutputType} />
                    </div>
                )}

                {/* Thinking Terminal (Streaming) */}
                <ThinkingTerminal 
                    content={streamContent} 
                    isVisible={isGenerating && !!streamContent} 
                    mode={thinkingMode ? 'thinking' : 'generating'} 
                />

                {/* Result Renderers */}
                {generatedContent && !isGenerating && (
                    <div className="animate-in fade-in slide-in-from-bottom-8 duration-700">
                        {generatedContent.type === OutputType.SLIDES && (
                            <SlideRenderer slides={generatedContent.data as any} />
                        )}
                        {generatedContent.type === OutputType.POSTER && (
                            <PosterRenderer data={generatedContent.data as any} />
                        )}
                        {(generatedContent.type === OutputType.DIAGRAM || generatedContent.type === OutputType.CITATION_MAP) && (
                            <DiagramRenderer data={generatedContent.data as any} />
                        )}
                        {generatedContent.type === OutputType.ANALYSIS && (
                            <div className="bg-[#0F0F0F] border border-white/10 rounded-2xl p-8 md:p-12 shadow-2xl max-w-4xl mx-auto">
                                <h2 className="text-3xl font-serif font-bold text-white mb-8 pb-4 border-b border-white/10">Analysis Report</h2>
                                <div className="prose prose-invert max-w-none prose-lg prose-headings:font-serif prose-p:leading-relaxed prose-li:text-cohere-sand">
                                    <div className="whitespace-pre-wrap font-sans">
                                        {(generatedContent.data as any).markdown}
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
      </div>

      {/* Bottom Input Area */}
      <div className="absolute bottom-0 left-0 w-full z-50 p-6 bg-gradient-to-t from-black via-black/90 to-transparent">
         <CompactInput onGenerate={handleGenerate} isGenerating={isGenerating} />
      </div>

    </div>
  );
};

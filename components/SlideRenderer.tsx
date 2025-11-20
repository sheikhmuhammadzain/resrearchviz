import React, { useState } from 'react';
import { SlideData } from '../types';
import { Button } from './Button';

interface SlideRendererProps {
  slides: SlideData[];
}

export const SlideRenderer: React.FC<SlideRendererProps> = ({ slides }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = () => setCurrentIndex((prev) => Math.min(prev + 1, slides.length - 1));
  const prevSlide = () => setCurrentIndex((prev) => Math.max(prev - 1, 0));

  const currentSlide = slides[currentIndex];

  return (
    <div className="w-full max-w-4xl mx-auto">
      {/* Slide Canvas */}
      <div className="aspect-video bg-white text-cohere-dark rounded-xl shadow-2xl p-12 flex flex-col relative overflow-hidden border-8 border-cohere-sand/20">
        {/* Decorative Elements */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-cohere-teal/10 rounded-bl-full -mr-10 -mt-10"></div>
        <div className="absolute bottom-0 left-0 w-24 h-24 bg-cohere-accent/10 rounded-tr-full -ml-8 -mb-8"></div>

        <div className="flex justify-between items-center mb-8 border-b-2 border-cohere-light/20 pb-4 z-10">
            <span className="text-xs font-bold tracking-widest uppercase text-cohere-teal">Research Visualizer</span>
            <span className="text-xs text-gray-400">{currentIndex + 1} / {slides.length}</span>
        </div>

        <div className="flex-1 z-10">
          <h2 className="text-4xl font-serif font-bold mb-8 text-cohere-dark">{currentSlide.title}</h2>
          <ul className="space-y-4">
            {currentSlide.bullets.map((bullet, idx) => (
              <li key={idx} className="flex items-start gap-3 text-lg leading-relaxed text-gray-700">
                <span className="mt-2 w-2 h-2 bg-cohere-accent rounded-full flex-shrink-0"></span>
                {bullet}
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-8 pt-4 border-t border-gray-100 text-sm text-gray-400 italic z-10">
            Speaker Notes: {currentSlide.speakerNotes.substring(0, 150)}...
        </div>
      </div>

      {/* Controls */}
      <div className="flex justify-center items-center gap-6 mt-8">
        <Button variant="outline" onClick={prevSlide} disabled={currentIndex === 0}>
            ← Previous
        </Button>
        <div className="flex gap-2">
            {slides.map((_, idx) => (
                <button 
                    key={idx}
                    onClick={() => setCurrentIndex(idx)}
                    className={`w-3 h-3 rounded-full transition-colors ${idx === currentIndex ? 'bg-cohere-accent' : 'bg-cohere-light/20'}`}
                />
            ))}
        </div>
        <Button variant="outline" onClick={nextSlide} disabled={currentIndex === slides.length - 1}>
            Next →
        </Button>
      </div>
    </div>
  );
};
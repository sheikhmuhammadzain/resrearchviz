import React from 'react';
import { PosterData } from '../types';

interface PosterRendererProps {
  data: PosterData;
}

export const PosterRenderer: React.FC<PosterRendererProps> = ({ data }) => {
  return (
    <div className="w-full bg-white text-cohere-dark p-8 rounded-sm shadow-2xl overflow-hidden border-t-8 border-cohere-accent min-h-[800px]">
      {/* Header */}
      <div className="text-center border-b-2 border-cohere-dark pb-6 mb-6">
        <h1 className="text-4xl font-serif font-bold mb-2 text-cohere-dark uppercase tracking-wide">{data.title}</h1>
        <p className="text-lg font-medium text-cohere-teal">{data.authors}</p>
        <div className="flex justify-center gap-4 mt-4">
            <span className="px-3 py-1 bg-gray-100 rounded text-xs font-bold">UNIVERSITY OF SCIENCE</span>
            <span className="px-3 py-1 bg-gray-100 rounded text-xs font-bold">RESEARCH DEPT</span>
        </div>
      </div>

      {/* Grid Layout */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 h-full">
        {/* Column 1 */}
        <div className="space-y-6">
          <div className="bg-cohere-light/30 p-4 rounded border-l-4 border-cohere-dark">
            <h3 className="font-serif font-bold text-xl mb-2 text-cohere-dark">Abstract</h3>
            <p className="text-sm text-gray-700 leading-relaxed text-justify">{data.abstract}</p>
          </div>
          <div className="bg-cohere-light/30 p-4 rounded border-l-4 border-cohere-teal">
            <h3 className="font-serif font-bold text-xl mb-2 text-cohere-dark">Introduction & Methods</h3>
            <p className="text-sm text-gray-700 leading-relaxed text-justify">{data.methods}</p>
          </div>
        </div>

        {/* Column 2 (Visuals focus) */}
        <div className="space-y-6">
           <div className="bg-gray-100 p-4 rounded h-full flex flex-col">
             <h3 className="font-serif font-bold text-xl mb-4 text-center text-cohere-dark">Key Findings</h3>
             <div className="flex-1 flex flex-col gap-4">
                {data.keyFigures.map((fig, idx) => (
                    <div key={idx} className="bg-white p-3 rounded shadow-sm border border-gray-200">
                        <div className="w-full h-32 bg-gradient-to-br from-cohere-teal/20 to-cohere-accent/20 mb-2 flex items-center justify-center text-cohere-dark/30 font-bold">
                            FIGURE {idx + 1}
                        </div>
                        <p className="text-xs italic text-center text-gray-600">{fig.description}</p>
                    </div>
                ))}
             </div>
           </div>
        </div>

        {/* Column 3 */}
        <div className="space-y-6">
          <div className="bg-cohere-light/30 p-4 rounded border-l-4 border-cohere-accent">
            <h3 className="font-serif font-bold text-xl mb-2 text-cohere-dark">Results</h3>
            <p className="text-sm text-gray-700 leading-relaxed text-justify">{data.results}</p>
          </div>
          <div className="bg-cohere-dark p-4 rounded text-white">
            <h3 className="font-serif font-bold text-xl mb-2 text-cohere-sand">Conclusion</h3>
            <p className="text-sm text-gray-300 leading-relaxed text-justify">{data.conclusion}</p>
          </div>
        </div>
      </div>
    </div>
  );
};
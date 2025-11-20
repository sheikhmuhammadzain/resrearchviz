
import React, { useEffect, useState } from "react";
import { OutputType } from "../types";

interface AITextLoadingProps {
    selectedFeature?: OutputType;
    className?: string;
    interval?: number;
}

const DEFAULT_MESSAGES = [
    "Thinking...",
    "Processing...",
    "Analyzing...",
    "Computing...",
    "Almost there...",
];

const LOADING_MESSAGES: Record<string, string[]> = {
    [OutputType.SLIDES]: [
        "Analyzing content structure...",
        "Drafting slide outline...",
        "Synthesizing bullet points...",
        "Generating speaker notes...",
        "Finalizing presentation deck..."
    ],
    [OutputType.POSTER]: [
        "Reading research context...",
        "Extracting key findings...",
        "Structuring abstract & methods...",
        "Designing layout grid...",
        "Composing scientific poster..."
    ],
    [OutputType.DIAGRAM]: [
        "Identifying key entities...",
        "Mapping relationships...",
        "Calculating node positions...",
        "Structuring process flow...",
        "Rendering visual graph..."
    ],
    [OutputType.CITATION_MAP]: [
        "Scanning literature...",
        "Identifying key authors...",
        "Mapping citation network...",
        "Building knowledge graph...",
        "Visualizing connections..."
    ],
    [OutputType.ANALYSIS]: [
        "Reading document...",
        "Synthesizing insights...",
        "Deep thinking in progress...",
        "Drafting detailed report...",
        "Formatting analysis..."
    ]
};

export const AITextLoading: React.FC<AITextLoadingProps> = ({
    selectedFeature,
    className = "",
    interval = 2000,
}) => {
    const [currentTextIndex, setCurrentTextIndex] = useState(0);
    const [isVisible, setIsVisible] = useState(true);
    
    const texts = selectedFeature && LOADING_MESSAGES[selectedFeature] 
        ? LOADING_MESSAGES[selectedFeature] 
        : DEFAULT_MESSAGES;

    useEffect(() => {
        // Reset index when feature changes
        setCurrentTextIndex(0);
        setIsVisible(true);
    }, [selectedFeature]);

    useEffect(() => {
        const timer = setInterval(() => {
            // Fade out
            setIsVisible(false);
            
            setTimeout(() => {
                setCurrentTextIndex((prevIndex) => (prevIndex + 1) % texts.length);
                // Fade in
                setIsVisible(true);
            }, 300); // wait for fade out

        }, interval);

        return () => clearInterval(timer);
    }, [interval, texts.length, texts]);

    return (
        <div className={`flex items-center justify-center p-8 w-full ${className}`}>
            <div className="relative px-4 py-2">
                <div
                    className={`
                        flex justify-center text-3xl md:text-4xl font-bold 
                        bg-gradient-to-r from-white/20 via-white to-white/20 
                        bg-[length:200%_auto] bg-clip-text text-transparent 
                        whitespace-nowrap min-w-max animate-shimmer
                        transition-all duration-500 transform
                        ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}
                    `}
                    style={{
                        backgroundSize: '200% auto',
                    }}
                >
                    {texts[currentTextIndex]}
                </div>
                <style>{`
                    @keyframes shimmer {
                        0% { background-position: 0% center; }
                        100% { background-position: 200% center; }
                    }
                    .animate-shimmer {
                        animation: shimmer 3s linear infinite;
                    }
                `}</style>
            </div>
        </div>
    );
}

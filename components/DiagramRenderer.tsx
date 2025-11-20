import React, { useEffect, useRef, useState } from 'react';
import { DiagramData, GraphNode } from '../types';

interface DiagramRendererProps {
  data: DiagramData;
}

export const DiagramRenderer: React.FC<DiagramRendererProps> = ({ data }) => {
  const svgRef = useRef<SVGSVGElement>(null);
  const [positions, setPositions] = useState<Record<string, { x: number; y: number }>>({});

  useEffect(() => {
    // Simple Layout Algorithm (Grid/Circle hybrid for stability)
    const newPositions: Record<string, { x: number; y: number }> = {};
    const nodes = data.nodes;
    const centerX = 400;
    const centerY = 300;
    const radius = 200;

    // Identify primary node (usually the first one or labeled primary)
    const primaryNode = nodes.find(n => n.type === 'primary') || nodes[0];
    
    if (primaryNode) {
      newPositions[primaryNode.id] = { x: centerX, y: centerY };
    }

    const otherNodes = nodes.filter(n => n.id !== primaryNode?.id);
    const angleStep = (2 * Math.PI) / otherNodes.length;

    otherNodes.forEach((node, index) => {
      const angle = index * angleStep;
      newPositions[node.id] = {
        x: centerX + radius * Math.cos(angle),
        y: centerY + radius * Math.sin(angle),
      };
    });

    setPositions(newPositions);
  }, [data]);

  return (
    <div className="w-full h-full flex flex-col items-center bg-white/5 rounded-xl p-6 border border-cohere-teal/20">
      <h3 className="text-2xl font-serif mb-2 text-cohere-light">{data.title}</h3>
      <p className="text-sm text-cohere-sand/80 mb-6 max-w-2xl text-center">{data.summary}</p>
      
      <div className="relative w-full h-[600px] overflow-hidden rounded-lg bg-cohere-darker shadow-inner">
        <svg ref={svgRef} className="w-full h-full" viewBox="0 0 800 600">
          <defs>
            <marker id="arrowhead" markerWidth="10" markerHeight="7" refX="28" refY="3.5" orient="auto">
              <polygon points="0 0, 10 3.5, 0 7" fill="#4D7C73" />
            </marker>
          </defs>
          
          {/* Links */}
          {data.links.map((link, i) => {
            const start = positions[link.source];
            const end = positions[link.target];
            if (!start || !end) return null;

            return (
              <g key={`link-${i}`}>
                <line
                  x1={start.x}
                  y1={start.y}
                  x2={end.x}
                  y2={end.y}
                  stroke="#4D7C73"
                  strokeWidth="2"
                  markerEnd="url(#arrowhead)"
                  opacity="0.6"
                />
                {link.label && (
                  <text
                    x={(start.x + end.x) / 2}
                    y={(start.y + end.y) / 2 - 10}
                    textAnchor="middle"
                    fill="#E5DED2"
                    fontSize="10"
                    className="bg-cohere-dark"
                  >
                    {link.label}
                  </text>
                )}
              </g>
            );
          })}

          {/* Nodes */}
          {data.nodes.map((node) => {
            const pos = positions[node.id];
            if (!pos) return null;
            const isPrimary = node.type === 'primary';

            return (
              <g key={node.id} transform={`translate(${pos.x}, ${pos.y})`}>
                <circle
                  r={isPrimary ? 35 : 25}
                  fill={isPrimary ? "#D97757" : "#193028"}
                  stroke={isPrimary ? "#fff" : "#4D7C73"}
                  strokeWidth="2"
                  className="transition-all duration-300 hover:scale-110 cursor-pointer shadow-lg"
                />
                <text
                  y="5"
                  textAnchor="middle"
                  fill={isPrimary ? "#fff" : "#E5DED2"}
                  fontSize={isPrimary ? "12" : "10"}
                  fontWeight={isPrimary ? "bold" : "normal"}
                  className="pointer-events-none select-none"
                  style={{ textShadow: '0px 1px 2px rgba(0,0,0,0.8)' }}
                >
                  {node.label.length > 10 ? node.label.substring(0, 8) + '...' : node.label}
                </text>
                <title>{node.label}</title>
              </g>
            );
          })}
        </svg>
      </div>
      <div className="mt-4 flex gap-4 text-xs text-cohere-sand/50">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-cohere-accent"></div> Key Concept
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-cohere-dark border border-cohere-teal"></div> Related Node
        </div>
      </div>
    </div>
  );
};
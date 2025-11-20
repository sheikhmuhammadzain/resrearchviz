
export enum OutputType {
  SLIDES = 'SLIDES',
  POSTER = 'POSTER',
  DIAGRAM = 'DIAGRAM',
  CITATION_MAP = 'CITATION_MAP',
  ANALYSIS = 'ANALYSIS'
}

export enum InputMode {
  TEXT = 'TEXT',
  FILE = 'FILE',
  IMAGE = 'IMAGE'
}

export interface SlideData {
  title: string;
  bullets: string[];
  speakerNotes: string;
}

export interface PosterData {
  title: string;
  authors: string;
  abstract: string;
  methods: string;
  results: string;
  conclusion: string;
  keyFigures: { description: string }[];
  reasoning?: string;
}

export interface GraphNode {
  id: string;
  label: string;
  type?: 'primary' | 'secondary';
}

export interface GraphLink {
  source: string;
  target: string;
  label?: string;
}

export interface DiagramData {
  title: string;
  nodes: GraphNode[];
  links: GraphLink[];
  summary: string;
  reasoning?: string;
}

export interface AnalysisData {
  markdown: string;
  reasoning?: string;
}

export interface GeneratedContent {
  type: OutputType;
  data: SlideData[] | PosterData | DiagramData | AnalysisData;
}

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
  isThinking?: boolean;
}
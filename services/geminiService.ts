
import { GoogleGenAI, Type, Schema, Content } from "@google/genai";
import { OutputType, SlideData, PosterData, DiagramData } from "../types";

const getClient = () => {
  return new GoogleGenAI({ apiKey: process.env.API_KEY });
};

// Define Schemas for Structured Output with Reasoning to show "Thinking"
const slideSchema: Schema = {
  type: Type.OBJECT,
  properties: {
    reasoning: { type: Type.STRING, description: "Step-by-step reasoning on how to structure the presentation based on the input." },
    slides: {
      type: Type.ARRAY,
      items: {
        type: Type.OBJECT,
        properties: {
          title: { type: Type.STRING },
          bullets: { type: Type.ARRAY, items: { type: Type.STRING } },
          speakerNotes: { type: Type.STRING },
        },
        required: ["title", "bullets", "speakerNotes"],
      },
    },
  },
  propertyOrdering: ["reasoning", "slides"],
  required: ["reasoning", "slides"],
};

const posterSchema: Schema = {
  type: Type.OBJECT,
  properties: {
    reasoning: { type: Type.STRING, description: "Analysis of the key scientific points to highlight in the poster." },
    title: { type: Type.STRING },
    authors: { type: Type.STRING },
    abstract: { type: Type.STRING },
    methods: { type: Type.STRING },
    results: { type: Type.STRING },
    conclusion: { type: Type.STRING },
    keyFigures: {
      type: Type.ARRAY,
      items: {
        type: Type.OBJECT,
        properties: { description: { type: Type.STRING } },
      },
    },
  },
  propertyOrdering: ["reasoning", "title", "authors", "abstract", "methods", "results", "conclusion", "keyFigures"],
  required: ["reasoning", "title", "abstract", "methods", "results", "conclusion"],
};

const diagramSchema: Schema = {
  type: Type.OBJECT,
  properties: {
    reasoning: { type: Type.STRING, description: "Explanation of the relationships and entities identified for the diagram." },
    title: { type: Type.STRING },
    summary: { type: Type.STRING },
    nodes: {
      type: Type.ARRAY,
      items: {
        type: Type.OBJECT,
        properties: {
          id: { type: Type.STRING },
          label: { type: Type.STRING },
          type: { type: Type.STRING, enum: ["primary", "secondary"] },
        },
        required: ["id", "label"],
      },
    },
    links: {
      type: Type.ARRAY,
      items: {
        type: Type.OBJECT,
        properties: {
          source: { type: Type.STRING },
          target: { type: Type.STRING },
          label: { type: Type.STRING },
        },
        required: ["source", "target"],
      },
    },
  },
  propertyOrdering: ["reasoning", "title", "summary", "nodes", "links"],
  required: ["reasoning", "title", "nodes", "links"],
};

interface GenerateOptions {
  useThinking?: boolean;
  mediaData?: {
    mimeType: string;
    data: string; // Base64 string
  };
}

export const generateVisuals = async (
  text: string,
  outputType: OutputType,
  options: GenerateOptions = {},
  onStream?: (text: string) => void
): Promise<any> => {
  const ai = getClient();
  
  // Use gemini-3-pro-preview for thinking or complex tasks, gemini-2.5-flash for speed
  const modelName = options.useThinking ? "gemini-3-pro-preview" : "gemini-2.5-flash";
  
  let prompt = "";
  let schema: Schema | undefined = undefined;
  let systemInstruction = "You are a helpful research assistant. You MUST provide your reasoning before generating the data.";

  // Build Content Parts
  const parts: any[] = [];
  
  if (options.mediaData) {
     parts.push({
        inlineData: {
           mimeType: options.mediaData.mimeType,
           data: options.mediaData.data
        }
     });
     if (options.mediaData.mimeType === 'application/pdf') {
         prompt += "Analyze the attached PDF document carefully. ";
     } else {
         prompt += "Analyze this image/file. ";
     }
  }

  switch (outputType) {
    case OutputType.SLIDES:
      prompt += `Convert the following content/file into a presentation deck. First explain your plan, then create 4-6 slides covering Intro, Method, Results, Conclusion. \n\nCONTENT: ${text}`;
      schema = slideSchema;
      break;
    case OutputType.POSTER:
      prompt += `Summarize the following content/file into a scientific poster format. First explain what key points you selected and why. \n\nCONTENT: ${text}`;
      schema = posterSchema;
      break;
    case OutputType.DIAGRAM:
      prompt += `Analyze the process or concepts in the following content/file and create a node-link structure. First explain the logic of the connections. \n\nCONTENT: ${text}`;
      schema = diagramSchema;
      break;
    case OutputType.CITATION_MAP:
      prompt += `Analyze the content/file and identify key concepts, authors, or related fields for a relationship map. First explain your analysis. \n\nCONTENT: ${text}`;
      schema = diagramSchema;
      break;
    case OutputType.ANALYSIS:
      prompt += `Provide a detailed analysis and explanation of the provided content (text, pdf, or image). Use Markdown formatting. \n\nCONTENT: ${text}`;
      schema = undefined; // Freeform text
      break;
  }

  parts.push({ text: prompt });

  // Configure Thinking
  const thinkingConfig = options.useThinking 
    ? { thinkingBudget: 32768 } 
    : { thinkingBudget: 0 };

  try {
    const result = await ai.models.generateContentStream({
      model: modelName,
      contents: { parts },
      config: {
        responseMimeType: schema ? "application/json" : "text/plain",
        responseSchema: schema,
        thinkingConfig: thinkingConfig as any, 
        systemInstruction: systemInstruction
      },
    });

    let fullText = '';
    
    for await (const chunk of result) {
        const chunkText = chunk.text;
        if (chunkText) {
            fullText += chunkText;
            if (onStream) {
                onStream(fullText);
            }
        }
    }

    const responseText = fullText || (schema ? "{}" : "");
    
    if (!schema) {
        return { markdown: responseText };
    }

    try {
        const json = JSON.parse(responseText);

        // Normalize keys based on schema
        if (outputType === OutputType.SLIDES) return json.slides;
        return json;
    } catch (e) {
        console.error("JSON Parse Error", e);
        // Fallback if JSON is incomplete or malformed due to streaming error
        throw new Error("Failed to parse generated content. The model might have been interrupted.");
    }

  } catch (error) {
    console.error("Gemini API Error:", error);
    throw new Error("Failed to generate content. Please check your API key and try again.");
  }
};

export const parseFileContent = async (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
        // Only read text files as text. binaries are handled as base64 elsewhere.
        if (file.type === 'text/plain' || file.name.endsWith('.md') || file.name.endsWith('.txt')) {
            const reader = new FileReader();
            reader.onload = (e) => resolve(e.target?.result as string);
            reader.onerror = reject;
            reader.readAsText(file);
        } else {
            // For PDF/Images, we don't return text here, we expect Dashboard to handle them.
            resolve(''); 
        }
    });
}

export const fileToBase64 = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
        const result = reader.result as string;
        // Remove Data URL prefix to get just base64
        const base64 = result.split(',')[1];
        resolve(base64);
    };
    reader.onerror = error => reject(error);
  });
};

// Chat streaming
export const streamChat = async function* (
  history: { role: 'user' | 'model', text: string }[], 
  message: string
) {
  const ai = getClient();
  
  const formattedHistory: Content[] = history.map(h => ({
      role: h.role,
      parts: [{ text: h.text }]
  }));

  // Use gemini-2.5-flash for chat for better responsiveness and standard conversational support
  const chat = ai.chats.create({
    model: 'gemini-2.5-flash',
    history: formattedHistory,
  });

  const result = await chat.sendMessageStream({ message });
  for await (const chunk of result) {
    yield chunk.text;
  }
};
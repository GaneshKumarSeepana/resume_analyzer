export interface AnalysisResult {
  id: string;
  date: string;
  jobTitle?: string; // Extracted or user input
  resumeQualityScore: number;
  jobMatchScore: number;
  matchedSkills: string[];
  missingSkills: string[];
  suggestions: string[];
  alternativeRoles: string[];
  summary: string;
}

export interface HistoryItem extends AnalysisResult {
  fileName: string;
}

// For the Gemini Schema
export enum GeminiSchemaType {
  STRING = 'STRING',
  NUMBER = 'NUMBER',
  INTEGER = 'INTEGER',
  BOOLEAN = 'BOOLEAN',
  ARRAY = 'ARRAY',
  OBJECT = 'OBJECT'
}
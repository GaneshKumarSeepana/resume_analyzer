import { GoogleGenAI, Type, Schema } from "@google/genai";
import { AnalysisResult } from "../types";

// Initialize Gemini Client
// The API key is automatically injected via process.env.API_KEY
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const MODEL_NAME = "gemini-2.5-flash";

const analysisSchema: Schema = {
  type: Type.OBJECT,
  properties: {
    resumeQualityScore: {
      type: Type.NUMBER,
      description: "A score from 0 to 100 indicating the overall quality, formatting, and clarity of the resume.",
    },
    jobMatchScore: {
      type: Type.NUMBER,
      description: "A score from 0 to 100 indicating how well the resume matches the provided job description.",
    },
    matchedSkills: {
      type: Type.ARRAY,
      items: { type: Type.STRING },
      description: "List of skills found in both the resume and the job description.",
    },
    missingSkills: {
      type: Type.ARRAY,
      items: { type: Type.STRING },
      description: "List of important skills mentioned in the job description but missing from the resume.",
    },
    suggestions: {
      type: Type.ARRAY,
      items: { type: Type.STRING },
      description: "Actionable suggestions to improve the resume for this specific job application.",
    },
    alternativeRoles: {
      type: Type.ARRAY,
      items: { type: Type.STRING },
      description: "3-5 alternative job titles that this candidate might be a good fit for based on their resume.",
    },
    summary: {
      type: Type.STRING,
      description: "A brief, professional summary of the analysis (max 2 sentences).",
    },
    jobTitle: {
        type: Type.STRING,
        description: "The likely job title being applied for, extracted from the job description.",
    }
  },
  required: ["resumeQualityScore", "jobMatchScore", "matchedSkills", "missingSkills", "suggestions", "alternativeRoles", "summary"],
};

export const analyzeApplication = async (
  fileBase64: string,
  mimeType: string,
  jobDescription: string
): Promise<AnalysisResult> => {
  try {
    const prompt = `
      You are an expert AI Resume Analyzer and Recruiter.
      
      Task:
      1. Analyze the provided resume document.
      2. Compare it strictly against the provided Job Description text.
      3. Extract key skills, experience, and keywords.
      4. Evaluate the match percentage and resume quality.
      5. Provide actionable feedback.

      Job Description:
      ${jobDescription}
    `;

    const response = await ai.models.generateContent({
      model: MODEL_NAME,
      contents: {
        parts: [
          {
            inlineData: {
              mimeType: mimeType,
              data: fileBase64,
            },
          },
          {
            text: prompt,
          },
        ],
      },
      config: {
        responseMimeType: "application/json",
        responseSchema: analysisSchema,
        // Resume analysis can benefit from thinking, but flash is fast enough. 
        // Let's disable thinking budget to ensure fast response for this demo, 
        // or use a small budget if using a stronger model. 
        // For 2.5 Flash, standard inference is usually sufficient for this task.
      },
    });

    const textResponse = response.text;
    if (!textResponse) {
      throw new Error("No response received from Gemini.");
    }

    const parsedData = JSON.parse(textResponse);

    return {
      id: crypto.randomUUID(),
      date: new Date().toISOString(),
      ...parsedData,
    };
  } catch (error) {
    console.error("Error analyzing resume:", error);
    throw error;
  }
};

// Helper to convert File to Base64
export const fileToBase64 = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
        // remove the data URL prefix (e.g., "data:application/pdf;base64,")
        const result = reader.result as string;
        const base64 = result.split(',')[1];
        resolve(base64);
    };
    reader.onerror = (error) => reject(error);
  });
};
import { GoogleGenAI } from "@google/genai";
import { SYSTEM_INSTRUCTION } from "../constants";
import { ModelEntry, AnalysisResult, Candidate } from "../types";

const parseResponse = (text: string): AnalysisResult => {
  const scratchpadMatch = text.match(/<scratchpad>([\s\S]*?)<\/scratchpad>/);
  const reasoningMatch = text.match(/<reasoning>([\s\S]*?)<\/reasoning>/);
  const recommendationMatch = text.match(/<recommendation>([\s\S]*?)<\/recommendation>/);
  const candidatesMatch = text.match(/<candidates_json>([\s\S]*?)<\/candidates_json>/);
  const tipMatch = text.match(/<fine_tuning_tip>([\s\S]*?)<\/fine_tuning_tip>/);

  let candidates: Candidate[] = [];
  if (candidatesMatch) {
    try {
      candidates = JSON.parse(candidatesMatch[1]);
    } catch (e) {
      console.warn("Failed to parse candidates JSON:", e);
    }
  }

  return {
    scratchpad: scratchpadMatch ? scratchpadMatch[1].trim() : "Analysis data parsing failed for scratchpad.",
    reasoning: reasoningMatch ? reasoningMatch[1].trim() : "Analysis data parsing failed for reasoning.",
    recommendation: recommendationMatch ? recommendationMatch[1].trim() : "Analysis data parsing failed for recommendation.",
    fine_tuning_tip: tipMatch ? tipMatch[1].trim() : undefined,
    candidates: candidates,
    raw: text
  };
};

export const analyzeTask = async (task: string, catalog: ModelEntry[]): Promise<AnalysisResult> => {
  const apiKey = process.env.API_KEY;
  if (!apiKey) {
    throw new Error("API Key not found in environment variables.");
  }

  const ai = new GoogleGenAI({ apiKey });

  const catalogString = JSON.stringify(catalog, null, 2);
  const prompt = `
    **MODEL CATALOG**:
    ${catalogString}

    **TASK DESCRIPTION**:
    ${task}
  `;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
        temperature: 0.2, // Low temperature for analytical precision
      }
    });

    const text = response.text || "";
    return parseResponse(text);
  } catch (error) {
    console.error("Gemini API Error:", error);
    throw new Error("Failed to generate analysis. Please try again.");
  }
};
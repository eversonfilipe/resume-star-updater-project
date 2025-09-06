
import { GoogleGenAI, Type } from "@google/genai";

// Define the structure for a professional experience entry
export interface Experience {
  id: number;
  jobTitle: string;
  company: string;
  situation: string;
  task: string;
  action: string;
  result: string;
}

// Partial experience for the extraction step
export type ExtractedExperience = Omit<Experience, 'id' | 'situation' | 'task' | 'action' | 'result'>;


const apiKey = process.env.API_KEY;
if (!apiKey) {
  console.warn("API_KEY environment variable not found.");
}
const ai = new GoogleGenAI({ apiKey: apiKey || "" });

/**
 * Extracts job experiences from a raw resume text using the Gemini API.
 * 
 * @param {string} rawResume - The user's raw resume text.
 * @returns {Promise<ExtractedExperience[]>} - A promise that resolves to an array of extracted experiences.
 * @throws {Error} - Throws an error if the API call fails or returns invalid JSON.
 */
export const extractExperiencesFromResume = async (rawResume: string): Promise<ExtractedExperience[]> => {
  if (!apiKey) {
    throw new Error("API key is not configured. The application cannot connect to the optimization service.");
  }
  
  const prompt = `
    Analyze the provided resume text. Your task is to identify and extract all distinct professional experience entries.
    For each entry, extract the "jobTitle" and "company".
    Return the result as a JSON array of objects. Each object must have keys "jobTitle" and "company".
    If no professional experiences are found, return an empty array.

    Resume Text:
    ---
    ${rawResume}
    ---
    `;

  try {
    const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: prompt,
        config: {
          responseMimeType: "application/json",
          responseSchema: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                jobTitle: { type: Type.STRING, description: 'The job title for the experience.' },
                company: { type: Type.STRING, description: 'The company name for the experience.' },
              },
              required: ["jobTitle", "company"],
            },
          },
        }
    });

    const jsonText = response.text.trim();
    // A simple check to handle potentially empty or non-JSON responses gracefully
    if (!jsonText || !jsonText.startsWith('[')) {
        return [];
    }
    const experiences = JSON.parse(jsonText);
    
    if (!Array.isArray(experiences)) {
        throw new Error("AI returned an invalid format. Expected an array of experiences.");
    }
    
    return experiences;

  } catch (error) {
    console.error("Error calling Gemini API for experience extraction:", error);
    throw new Error("Failed to extract experiences from the resume. The format might be unconventional. Please try again.");
  }
};

/**
 * Generates a final, optimized resume using the original resume and user-provided STAR data.
 * 
 * @param {string} rawResume - The user's original resume text (for context and other sections).
 * @param {Experience[]} experiences - An array of experiences with user-filled STAR details.
 * @returns {Promise<string>} - A promise that resolves to the final, optimized resume text.
 * @throws {Error} - Throws an error if the API call fails.
 */
export const generateFinalResume = async (rawResume: string, experiences: Experience[]): Promise<string> => {
  if (!apiKey) {
    throw new Error("API key is not configured.");
  }

  // Convert the structured experience data into a readable string for the prompt
  const experiencesText = experiences.map(exp => `
    - Job Title: ${exp.jobTitle}
      Company: ${exp.company}
      STAR Details:
      * Situation: ${exp.situation}
      * Task: ${exp.task}
      * Action: ${exp.action}
      * Result: ${exp.result}
  `).join('\n');
  
  const prompt = `
    **Role:** You are an expert career coach and professional resume writer specializing in optimizing resumes for modern Applicant Tracking Systems (ATS) and human recruiters.

    **Task:** Your goal is to rewrite the "Professional Experience" section of the provided raw resume. You MUST use the structured STAR data I provide below to construct compelling, achievement-oriented bullet points for each role.

    **Context - Raw Resume (use this for structure, skills, education, etc.):**
    ---
    ${rawResume}
    ---

    **Data to Use - User-Provided STAR Experiences:**
    ---
    ${experiencesText}
    ---

    **Instructions & Rules:**
    1.  **Integrate STAR Data:** Replace the existing descriptions under the "Professional Experience" section with new bullet points derived ONLY from the provided STAR data.
    2.  **Professional Formatting:** For each experience, create 2-4 powerful bullet points. Start each bullet point with a strong action verb. Quantify results wherever the data allows.
    3.  **ATS Optimization:** Ensure the final text is clean, uses relevant keywords from the context of the roles, and is easily parsable by ATS software.
    4.  **Preserve Other Sections:** Keep all other sections of the raw resume (e.g., 'Summary', 'Education', 'Skills', 'Projects') exactly as they are. Do not add, remove, or alter information in those sections.
    5.  **Output Format:** The output must be ONLY the complete, rewritten resume text in a single block. Do not include any introductory or concluding phrases like "Here is the optimized resume:". The output should be ready for the user to copy and paste.
    `;

  try {
    const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: prompt
    });

    const optimizedText = response.text;
    if (!optimizedText) {
      throw new Error("The AI returned an empty response.");
    }

    return optimizedText.trim();

  } catch (error) {
    console.error("Error calling Gemini API for final resume generation:", error);
    throw new Error("Failed to generate the final resume. Please check your connection and try again.");
  }
};

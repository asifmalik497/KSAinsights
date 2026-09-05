import { GoogleGenAI, Type } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || "" });

export interface GeneratedPost {
  title: { en: string; ar: string; ur: string };
  excerpt: { en: string; ar: string; ur: string };
  content: { en: string; ar: string; ur: string };
  category: string;
}

export async function generateBlogPost(topic: string): Promise<GeneratedPost> {
  const prompt = `
    Create a professional, high-quality blog post for "KSA Insights" about the following topic: "${topic}".
    
    The post must be provided in three languages: English, Arabic, and Urdu.
    The tone should be premium, expert, and insightful, suitable for business investors and expats in Saudi Arabia.
    
    Requirements:
    1. Title: Catchy and professional.
    2. Excerpt: A brief 2-3 sentence summary.
    3. Content: A full article (approx 500-800 words) in Markdown format. Use headers, bold text, and lists for readability.
    4. Category: Choose one from [Market Insights, Vision 2030, Fintech, Tourism, Business, Environment].
    
    Return the result as a JSON object.
  `;

  const response = await ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: [{ role: "user", parts: [{ text: prompt }] }],
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          title: {
            type: Type.OBJECT,
            properties: {
              en: { type: Type.STRING },
              ar: { type: Type.STRING },
              ur: { type: Type.STRING }
            },
            required: ["en", "ar", "ur"]
          },
          excerpt: {
            type: Type.OBJECT,
            properties: {
              en: { type: Type.STRING },
              ar: { type: Type.STRING },
              ur: { type: Type.STRING }
            },
            required: ["en", "ar", "ur"]
          },
          content: {
            type: Type.OBJECT,
            properties: {
              en: { type: Type.STRING },
              ar: { type: Type.STRING },
              ur: { type: Type.STRING }
            },
            required: ["en", "ar", "ur"]
          },
          category: { type: Type.STRING }
        },
        required: ["title", "excerpt", "content", "category"]
      }
    }
  });

  return JSON.parse(response.text);
}

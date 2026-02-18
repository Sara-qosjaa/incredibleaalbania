
import { GoogleGenAI, Type } from "@google/genai";
import { ItineraryRequest, ItineraryResponse } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });

export const generateItinerary = async (req: ItineraryRequest): Promise<ItineraryResponse> => {
  const prompt = `Create a travel itinerary for Albania. 
    Region: ${req.region}
    Interests: ${req.interest}
    Duration: ${req.duration} days.
    
    Ensure the response focuses on authentic experiences, local "Besa" hospitality, and hidden gems.`;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            title: { type: Type.STRING },
            days: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  day: { type: Type.INTEGER },
                  activity: { type: Type.STRING },
                  location: { type: Type.STRING }
                },
                required: ["day", "activity", "location"]
              }
            },
            tips: {
              type: Type.ARRAY,
              items: { type: Type.STRING }
            }
          },
          required: ["title", "days", "tips"]
        }
      }
    });

    const result = JSON.parse(response.text || '{}');
    return result as ItineraryResponse;
  } catch (error) {
    console.error("Failed to generate itinerary:", error);
    throw error;
  }
};

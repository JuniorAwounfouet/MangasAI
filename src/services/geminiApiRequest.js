import { GoogleGenAI } from "@google/genai";


const ai = new GoogleGenAI({
    apiKey: import.meta.env.VITE_GEMINI_API_KEY
});

async function generateGeminiImageFromPrompt(style, ImageDescription) {

    try {
        const response = await ai.models.generateImages({
            model: 'imagen-4.0-generate-001',
            prompt: `${style}. ${ImageDescription}`,
            config: {
                numberOfImages: 1,
            },
        });
        return response.generatedImages[0].image.imageBytes;
    }
    catch (error) {
        console.error("Error generating Gemini image:", error);
        throw error;
    }


}

export { generateGeminiImageFromPrompt };
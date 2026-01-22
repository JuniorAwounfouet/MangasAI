import { GoogleGenAI } from "@google/genai";


const ai = new GoogleGenAI({
    apiKey: import.meta.env.VITE_GEMINI_API_KEY
});

/*
async function generateGeminiImageFromPrompt(style, ImageDescription) {

    try {
        console.log("Generating image with Gemini ...");
        
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
    */

async function generateGeminiImageFromPrompt(style, ImageDescription) {
    try {
        console.log("Generating image with Gemini ...");
        const response = await fetch("https://localhost:7175/api/Gemini/generate-image", {
            method: 'POST',
            body: JSON.stringify({
                prompt: `${style}. ${ImageDescription}`
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        });
        console.log(response)
        return response.data.generatedImage; // Assuming the API returns the base64 image string in this field
        
        }
    catch (error) {
        console.error("Error generating Gemini image:", error.message);
        throw error;
    }
}
/*
async function editGeminiImageFromPrompt(imageBase64, editPrompt) {

    try {
        // 1. Ensure you use 'await' as these are network requests
        const response = await fetch("https://localhost:7175/api/Gemini/generate-image", {
            method: 'POST',
            body: JSON.stringify({
                prompt: editPrompt,
                base64Image: imageBase64
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        });
        console.log("Gemini Edit Response:", response);
        return response.candidates[0].content.parts[0].inlineData.data;
    }
    catch (error) {
        console.error("Error editing Gemini image:", error);
        throw error;
    }
}

*/
async function editGeminiImageFromPrompt(imageBase64, editPrompt) {

    try {
        // 1. Ensure you use 'await' as these are network requests
        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash-image',
            contents: [
                {
                    inlineData: {
                        data: imageBase64, // Must be a base64 string
                        mimeType: 'image/png'      // Specify the format
                    }
                },
                { text: editPrompt }
            ],
            config: { responseModalities: ["IMAGE"] }
        });
        console.log("Gemini Edit Response:", response);
        return response.candidates[0].content.parts[0].inlineData.data;
    }
    catch (error) {
        console.error("Error editing Gemini image:", error);
        throw error;
    }
}
 */
export { generateGeminiImageFromPrompt, editGeminiImageFromPrompt };
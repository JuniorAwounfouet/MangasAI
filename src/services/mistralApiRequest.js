import { Mistral } from "@mistralai/mistralai";
import { streamToBase64 } from "./imageService";

const apiKey = import.meta.env.VITE_MISTRAL_API_KEY_1;
const client = new Mistral({ apiKey: apiKey });

async function getImageDescription(base64Image) {
    const chatResponse = await client.chat.complete({
        model: "mistral-small-latest",
        messages: [
            {
                role: "user",
                content: [
                    { type: "text", text: "What's in this image? Describe in a one paragraph answer  in detail physical characteristics. (skin color, height, hair color, clothing, facial features)" },
                    {
                        type: "image_url",
                        imageUrl: base64Image,
                    },
                ],
            },
        ],
    })
    return chatResponse.choices[0].message.content;
}


async function generateMistralImageFromPrompt(style, ImageDescription) {
    console.log("Generating image with Mistral ...");

    let imageAgent = await client.beta.agents.create({
        model: "mistral-medium-2505",
        name: "Image Generation Agent",
        description: "Agent used to generate images.",
        instructions: "Use the image generation tool when you have to create images.",
        tools: [{
            type: "image_generation"
        }],
        completionArgs: {
            temperature: 0.3,
            topP: 0.95,
        }
    });


    let conversation = await client.beta.conversations.start({
        agentId: imageAgent.id,
        inputs: `${style}. ${ImageDescription}`,
        //store:false
    });

  const entry = conversation.outputs[conversation.outputs.length - 1];
const messageOutputEntry = entry;
console.log("Message Output Entry:");
console.log(messageOutputEntry);
const chunk = messageOutputEntry.content[1];

if (chunk && typeof chunk !== "string" && 'fileId' in chunk) {
  const fileChunk = chunk;
  const fileStream = await client.files.download({ fileId: fileChunk.fileId });

  const base64Image = await streamToBase64(fileStream);
  console.log(base64Image);
    
  return base64Image; // You can set this as <img src={base64Image} />
}

}


export { getImageDescription, generateMistralImageFromPrompt };
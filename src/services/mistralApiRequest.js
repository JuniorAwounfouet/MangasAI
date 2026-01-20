
async function callMistralApi(prompt, base64Image) {
    // Placeholder function to simulate an API call to Mistral
    const chatResponse = await client.chat.complete({
        model: "mistral-small-latest",
        messages: [
            {
                role: "user",
                content: [
                    { type: "text", text: "What's in this image? Describe in a one paragraph answer  in detail physical characteristics. (skin color, height, hair color, clothing, facial features)" },
                    {
                        type: "image_url",
                        imageUrl: "data:image/jpeg;base64," + base64Image,
                    },
                ],
            },
        ],
    })
    return chatResponse.choices[0].message.content;
}



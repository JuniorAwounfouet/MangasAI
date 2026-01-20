import *  as fs from 'fs';


async function getStyleImage(style) {
    switch (style) {
        case 'cyberpunk':
            return 'A cyberpunk-syle illustration  , neon-lit cityscape in the background, glowing cybernetic details, manga-inspired but with a futuristic twist. Moody atmosphere, vibrant colors';
        case 'onepiece':
            return 'A one piece style manga/anime illustration style that blends exaggerated cartoon elements with detailed fantasy world-building oversized heads, long limbs, tiny waists, or unusual body proportions';
        case 'naruto':
            return ' A Naruto style  illustration  manga and anime style that blends expressive character design with dynamic action and emotional storytelling, Clean, confident line work with varying line thickness, Characters have exaggerated features (large eyes, spiky hair, distinctive clothing)';
        case 'southpark':
            return 'A south park style  illustration  intentionally crude, flat, and minimalist,Characters are built from basic geometric shapes (circles for heads, rectangles for bodies), Faces are front-facing with dot eyes and simple mouths';
        case "jojo":
            return "A Jojo's bizarre style  illustration highly stylized, dramatic, and fashion-influenced, Strong contrast with dramatic lighting and shadows, Characters strike extreme, theatrical poses";
    }
}


async function encodeImage(imagePath) {
    const imageBuffer = fs.readFileSync(imagePath);
    const base64Image = imageBuffer.toString('base64');
    return base64Image;
}

async function saveStreamToFile(stream, filePath) {
    const reader = stream.getReader();
    const writableStream = fs.createWriteStream(filePath);
 
    while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        writableStream.write(value);;
    }
 
    writableStream.end();
}
 
async function streamToBase64(stream) {
  const chunks = [];

  // Read stream (ReadableStream in browser)
  const reader = stream.getReader();
  let done, value;

  while ({ done, value } = await reader.read(), !done) {
    chunks.push(value);
  }

  // Concatenate all Uint8Arrays
  let length = chunks.reduce((sum, chunk) => sum + chunk.length, 0);
  const result = new Uint8Array(length);

  let offset = 0;
  for (const chunk of chunks) {
    result.set(chunk, offset);
    offset += chunk.length;
  }

  // Convert Uint8Array → Base64
  let binary = '';
  const chunkSize = 0x8000; // 32KB slices
  for (let i = 0; i < result.length; i += chunkSize) {
    const slice = result.subarray(i, i + chunkSize);
    binary += String.fromCharCode(...slice);
  }

  return btoa(binary);
}



export { encodeImage, saveStreamToFile, streamToBase64, getStyleImage };
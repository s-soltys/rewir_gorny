import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';

// Configure __dirname for ES modules
const __dirname = path.dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: path.join(__dirname, '../.env') });

if (!process.env.OPENROUTER_API_KEY) {
    console.error("ERROR: OPENROUTER_API_KEY is missing in .env.");
    process.exit(1);
}

const MOOD_BOARD_PATH = path.join(__dirname, '../../mood/mood-cover.jpeg');
const OUTPUT_DIR = path.join(__dirname, '../public/images/scenes');

const SCENES = [
    {
        id: 'station',
        prompt: "A dark, atmospheric scene of a run-down 1990s Polish provincial train station at dusk. Brutalist concrete, flickering fluorescent lights."
    },
    {
        id: 'the_blocks',
        prompt: "A dark, atmospheric scene of massive 1990s concrete panel apartment blocks (wielka płyta) rising like a jaw full of teeth. Faint greenish copper patina in the dying light."
    },
    {
        id: 'the_sky',
        prompt: "A dark, atmospheric scene of a mutated sky above concrete apartment blocks. The sky is bruised with a strange, pulsing copper and green aurora borealis."
    },
    {
        id: 'the_clearing',
        prompt: "A dark, atmospheric scene of a grassy clearing at the edge of a dense pine forest near brutalist apartment blocks. The grass has a strange metallic sheen."
    }
];

function encodeImage(imagePath) {
    const imageBuffer = fs.readFileSync(imagePath);
    return imageBuffer.toString('base64');
}

async function extractStyle() {
    console.log("Analyzing mood board image with OpenRouter (GPT-4o Vision)...");
    const base64Image = encodeImage(MOOD_BOARD_PATH);
    
    const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
        method: "POST",
        headers: {
            "Authorization": `Bearer ${process.env.OPENROUTER_API_KEY}`,
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            model: "openai/gpt-4o",
            messages: [
                {
                    role: "user",
                    content: [
                        { type: "text", text: "Analyze the attached mood board image. Write a highly detailed prompt describing its exact artistic style, medium, lighting, color palette, and atmosphere. This will be used as a style prefix for an AI image generator to create consistent backgrounds in this exact style. Do not describe the specific subject matter, ONLY the stylistic execution. Keep it under 50 words." },
                        {
                            type: "image_url",
                            image_url: {
                                url: `data:image/jpeg;base64,${base64Image}`
                            }
                        }
                    ]
                }
            ],
            max_tokens: 150
        })
    });

    const data = await response.json();
    if (data.error) {
        throw new Error(`OpenRouter Error: ${data.error.message}`);
    }

    const stylePrompt = data.choices[0].message.content;
    console.log("\nExtracted Style:\n", stylePrompt, "\n");
    return stylePrompt;
}

async function generateSceneImage(sceneId, basePrompt, stylePrefix) {
    console.log(`Generating image for scene: ${sceneId} via Pollinations API...`);
    const fullPrompt = `${stylePrefix} Scene Subject: ${basePrompt}.`;

    // Pollinations AI uses a simple GET request with the prompt in the URL
    // We add a random seed to ensure it bypasses their cache
    const seed = Math.floor(Math.random() * 100000);
    const imageUrl = `https://image.pollinations.ai/prompt/${encodeURIComponent(fullPrompt)}?width=1024&height=1024&seed=${seed}&nologo=true`;
    
    const imageRes = await fetch(imageUrl);
    if (!imageRes.ok) {
        throw new Error(`Failed to download image for ${sceneId}. Status: ${imageRes.status}`);
    }
    
    const buffer = Buffer.from(await imageRes.arrayBuffer());
    
    if (!fs.existsSync(OUTPUT_DIR)) {
        fs.mkdirSync(OUTPUT_DIR, { recursive: true });
    }
    
    const outputPath = path.join(OUTPUT_DIR, `${sceneId}.jpeg`);
    fs.writeFileSync(outputPath, buffer);
    console.log(`Saved successfully: ${outputPath}`);
}

async function main() {
    try {
        if (!fs.existsSync(MOOD_BOARD_PATH)) {
            throw new Error(`Mood board not found at ${MOOD_BOARD_PATH}`);
        }

        const stylePrefix = await extractStyle();

        for (const scene of SCENES) {
            await generateSceneImage(scene.id, scene.prompt, stylePrefix);
            // small delay to be polite to the free API
            await new Promise(r => setTimeout(r, 2000));
        }

        console.log("\nAll images generated successfully!");
    } catch (error) {
        console.error("Pipeline failed:", error);
    }
}

main();

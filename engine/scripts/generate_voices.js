import fs from 'fs';
import path from 'path';
import crypto from 'crypto';
import dotenv from 'dotenv';
import OpenAI from 'openai';

// Load environment variables
dotenv.config({ path: path.join(process.cwd(), '.env') });

const apiKey = process.env.OPENROUTER_API_KEY || process.env.OPENAI_API_KEY;
if (!apiKey) {
    console.error("Error: OPENROUTER_API_KEY or OPENAI_API_KEY is not set in .env");
    process.exit(1);
}

const baseURL = process.env.OPENROUTER_API_KEY ? 'https://openrouter.ai/api/v1' : 'https://api.openai.com/v1';
const isOpenRouter = baseURL.includes('openrouter');

const openai = new OpenAI({
    apiKey: apiKey,
    baseURL: process.env.OPENAI_BASE_URL || baseURL
});

// Use Kokoro by default on OpenRouter, or standard tts-1 on OpenAI
const defaultModel = isOpenRouter ? 'hexgrad/kokoro-82m' : 'tts-1';

// Configuration for character voices
const VOICE_MAP = {
    // Kokoro voices: af_bella (female), am_adam (male), etc.
    // OpenAI voices: nova (female), onyx (male), etc.
    'kiosk_woman': isOpenRouter ? 'af_bella' : 'nova',
    'gateway_friend': isOpenRouter ? 'am_adam' : 'onyx',
    'protagonist': isOpenRouter ? 'am_michael' : 'echo',
    'narrator': isOpenRouter ? 'af_sky' : 'alloy'
};

const STORY_DIR = path.join(process.cwd(), '../story');
const AUDIO_DIR = path.join(process.cwd(), 'public/audio');

// Ensure output directory exists
if (!fs.existsSync(AUDIO_DIR)) {
    fs.mkdirSync(AUDIO_DIR, { recursive: true });
}

function getInkFiles(dir, fileList = []) {
    const files = fs.readdirSync(dir);
    for (const file of files) {
        const filePath = path.join(dir, file);
        if (fs.statSync(filePath).isDirectory()) {
            getInkFiles(filePath, fileList);
        } else if (filePath.endsWith('.ink')) {
            fileList.push(filePath);
        }
    }
    return fileList;
}

function extractDialogueLines() {
    const files = getInkFiles(STORY_DIR);
    const linesToGenerate = [];

    files.forEach(file => {
        const content = fs.readFileSync(file, 'utf-8');
        const lines = content.split('\n');

        lines.forEach(line => {
            const trimmed = line.trim();
            // Skip empty, comments, and ink logic syntax
            if (!trimmed || 
                trimmed.startsWith('//') || 
                trimmed.startsWith('=') || 
                trimmed.startsWith('-') || 
                trimmed.startsWith('+') || 
                trimmed.startsWith('~') || 
                trimmed.startsWith('->') || 
                trimmed.startsWith('INCLUDE') ||
                trimmed.startsWith('{') ||
                trimmed.startsWith('}') ||
                trimmed.startsWith('*') ||
                trimmed.startsWith('#')) return;

            let speaker = 'narrator';
            const speakerMatch = trimmed.match(/#\s*speaker:\s*([a-zA-Z0-9_]+)/);
            let rawText = trimmed;

            if (speakerMatch) {
                speaker = speakerMatch[1];
                rawText = rawText.replace(/#\s*speaker:\s*[a-zA-Z0-9_]+/, '').trim();
            }

            // Remove surrounding quotes if they exist
            if (rawText.startsWith('"') && rawText.endsWith('"')) {
                rawText = rawText.substring(1, rawText.length - 1);
            }

            // Compute MD5 hash of the raw text
            const hash = crypto.createHash('md5').update(rawText).digest('hex');
            const filename = `${speaker}_${hash}.wav`;
            const outputPath = path.join(AUDIO_DIR, filename);

            linesToGenerate.push({
                speaker,
                text: rawText,
                hash,
                filename,
                outputPath
            });
        });
    });

    return linesToGenerate;
}

async function main() {
    console.log("Scanning Ink files for spoken dialogue...");
    const linesToGenerate = extractDialogueLines();
    console.log(`Found ${linesToGenerate.length} spoken lines.`);

    // Filter out already generated lines
    const pendingLines = linesToGenerate.filter(line => !fs.existsSync(line.outputPath));
    console.log(`${linesToGenerate.length - pendingLines.length} already exist. Generating ${pendingLines.length} new files...`);

    const BATCH_SIZE = 10;
    let successCount = 0;

    for (let i = 0; i < pendingLines.length; i += BATCH_SIZE) {
        const batch = pendingLines.slice(i, i + BATCH_SIZE);
        console.log(`Processing batch ${Math.floor(i/BATCH_SIZE) + 1}/${Math.ceil(pendingLines.length/BATCH_SIZE)}...`);
        
        await Promise.all(batch.map(async (line) => {
            const voice = VOICE_MAP[line.speaker] || (isOpenRouter ? 'af_sky' : 'alloy');
            
            try {
                const mp3 = await openai.audio.speech.create({
                    model: process.env.TTS_MODEL || defaultModel,
                    voice: voice,
                    input: line.text,
                });

                const rawPcm = Buffer.from(await mp3.arrayBuffer());
                
                // OpenRouter's Kokoro currently returns raw headerless 24kHz 16-bit Mono PCM.
                // We must wrap it in a standard WAV header so browsers can play it.
                const wav = Buffer.alloc(44 + rawPcm.length);
                wav.write('RIFF', 0);
                wav.writeUInt32LE(36 + rawPcm.length, 4);
                wav.write('WAVE', 8);
                wav.write('fmt ', 12);
                wav.writeUInt32LE(16, 16);
                wav.writeUInt16LE(1, 20); // PCM
                wav.writeUInt16LE(1, 22); // Mono
                wav.writeUInt32LE(24000, 24); // Sample rate 24kHz
                wav.writeUInt32LE(24000 * 2, 28); // Byte rate
                wav.writeUInt16LE(2, 32); // Block align
                wav.writeUInt16LE(16, 34); // Bits per sample
                wav.write('data', 36);
                wav.writeUInt32LE(rawPcm.length, 40);
                rawPcm.copy(wav, 44);

                await fs.promises.writeFile(line.outputPath, wav);
                successCount++;
                console.log(`Saved: ${line.filename}`);
            } catch (error) {
                console.error(`Failed to generate audio for ${line.speaker}:`, error.message);
            }
        }));
    }

    if (successCount === 0) {
        console.log("All audio files are up to date! Nothing to generate.");
    } else {
        console.log(`Successfully generated ${successCount} new audio files.`);
    }
}

main();

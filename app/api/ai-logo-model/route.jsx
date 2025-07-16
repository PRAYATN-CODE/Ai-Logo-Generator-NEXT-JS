import { AILogoPrompt } from "@/configs/AiModel";
import cloudinary from "@/configs/cloudinaryConfig";
import { db } from "@/configs/FirebaseConfig";
import { GoogleGenAI } from '@google/genai';
import { doc, setDoc } from "firebase/firestore";
import { NextResponse } from "next/server";

export async function POST(req) {
    try {
        const { prompt, email, title, desc, type, userCredits } = await req.json();

        if (!prompt) {
            return NextResponse.json(
                { error: 'Missing prompt parameter' },
                { status: 400 }
            );
        }

        // Get AI-generated refined prompt from your custom service
        const AiPromptResult = await AILogoPrompt.sendMessage(prompt);
        const parsedResult = JSON.parse(await AiPromptResult.response.text());

        if (!parsedResult?.prompt) {
            return NextResponse.json(
                { error: 'AI did not return a valid prompt' },
                { status: 500 }
            );
        }

        const AiPrompt = parsedResult.prompt;

        const ai = new GoogleGenAI({
            apiKey: process.env.GEMINI_API_KEY,
        });
        const config = {
            responseModalities: [
                'IMAGE',
                'TEXT',
            ],
            responseMimeType: 'text/plain',
        };
        const model = 'gemini-2.0-flash-preview-image-generation';
        const contents = [
            {
                role: 'user',
                parts: [
                    {
                        text: AiPrompt.prompt || AiPrompt,
                    },
                ],
            },
        ];

        const response = await ai.models.generateContentStream({
            model,
            config,
            contents,
        });

        let base64Image = "";
        let mimeType = "";


        for await (const chunk of response) {
            if (
                chunk.candidates &&
                chunk.candidates[0]?.content?.parts?.[0]?.inlineData
            ) {
                const inlineData = chunk.candidates[0].content.parts[0].inlineData;
                base64Image = inlineData.data; // Base64-encoded image data
                mimeType = inlineData.mimeType || "image/png";
            } else if (chunk.text) {
                console.log("Text chunk:", chunk.text); // Log any text responses
            }
        }

        if (!base64Image) {
            return NextResponse.json(
                { error: "No image generated" },
                { status: 500 }
            );
        }

        // Convert base64 to buffer
        const buffer = Buffer.from(base64Image, "base64");

        // Convert buffer back to base64 with MIME type for frontend
        const base64ImageWithMime = `data:${mimeType};base64,${buffer.toString("base64")}`;

        const result = await cloudinary.uploader.upload(base64ImageWithMime, {
            folder: 'logo-images',
            allowed_formats: ['jpeg', 'png', 'jpg'],
        });

        // Save image to FireStore
        try {
            await setDoc(doc(db, 'users', email, 'logos', Date.now().toString()), {
                image: result.url || result.secure_url,
                title: title,
                desc: desc,
            });
        } catch (dbError) {
            console.error('Error storing data in Firestore:', dbError);
            return NextResponse.json(
                { error: 'Failed to store data' },
                { status: 500 }
            );
        }
        
        // Return the base64 image to the frontend
        return NextResponse.json({ image: base64ImageWithMime });


    } catch (error) {
        console.error('Error in POST /api/user:', error);
        return NextResponse.json(
            { error: 'Internal Server Error' },
            { status: 500 }
        );
    }
}


async function ConvertImageToBase64(imageBlob) {
    try {
        const arrayBuffer = await imageBlob.arrayBuffer();

        const base64ImageRaw = Buffer.from(arrayBuffer).toString('base64');

        return `data:image/png;base64,${base64ImageRaw}`;
    } catch (error) {
        console.error('Error converting image to base64:', error);
        return null;
    }
}


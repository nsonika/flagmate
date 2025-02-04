import { NextResponse } from "next/server";
import OpenAI from "openai";

export async function POST(req) {
  try {
    const { scenario } = await req.json();

    const apiKey = process.env.NEXT_PUBLIC_GROQ_API_KEY; // Securely fetch API key from environment variables
    if (!apiKey) {
      return NextResponse.json(
        { error: "API key not configured" },
        { status: 500 }
      );
    }

    const client = new OpenAI({
      apiKey,
      baseURL: "https://api.groq.com/openai/v1",
    });

    const response = await client.chat.completions.create({
      model: "llama3-70b-8192",
      messages: [
        {
          role: "system",
          content: `You are the "Red-Flag Detector," a playful yet insightful assistant analyzing relationship scenarios.
          Keep responses fun and witty while providing valuable insights. Use emojis and casual language.
          Structure your response with:
          1. A clear verdict on the red flag level (🚩 rating out of 5)
          2. A humorous but honest analysis
          3. A playful analogy
          4. Helpful suggestions wrapped in humor`,
        },
        { role: "user", content: scenario },
      ],
      temperature: 0.8,
      max_tokens: 500,
    });

    return NextResponse.json({ analysis: response.choices[0].message.content });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Analysis failed" }, { status: 500 });
  }
}

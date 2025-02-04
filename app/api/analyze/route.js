import { NextResponse } from "next/server";
import Groq from "groq-sdk";

// Mark the route as dynamic
export const dynamic = "force-dynamic";

export async function POST(req) {
  try {
    const { scenario } = await req.json();

    console.log("Received scenario:", scenario);

    const apiKey = process.env.NEXT_PUBLIC_GROQ_API_KEY; // Ensure your API key is set in the .env.local file
    if (!apiKey) {
      console.error("API key is missing!");
      return NextResponse.json(
        { error: "API key not configured" },
        { status: 500 }
      );
    }

    const groq = new Groq({ apiKey });

    const response = await groq.chat.completions.create({
      messages: [
        {
          role: "system",
          content: `You are the "Red-Flag Detector," a playful yet insightful assistant analyzing relationship scenarios. Keep responses fun and witty while providing valuable insights. Use emojis and casual language.`,
        },
        { role: "user", content: scenario },
      ],
      model: "llama-3.3-70b-versatile",
      temperature: 0.8,
      max_tokens: 500,
    });

    const analysis =
      response.choices[0]?.message?.content || "No response received.";
    return NextResponse.json({ analysis });
  } catch (error) {
    console.error("Error in Groq API route:", error.message);
    return NextResponse.json(
      { error: "Analysis failed", details: error.message },
      { status: 500 }
    );
  }
}

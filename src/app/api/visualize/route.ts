import { GoogleGenAI } from "@google/genai";
import { NextRequest, NextResponse } from "next/server";

const ai = new GoogleGenAI({ apiKey: process.env.GOOGLE_AI_API_KEY! });

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const photo = formData.get("photo") as File | null;
    const wallColor = formData.get("wallColor") as string;
    const floorType = formData.get("floorType") as string;
    const style = formData.get("style") as string;
    const materials = formData.get("materials") as string;
    const lighting = formData.get("lighting") as string;
    const furnitureType = formData.get("furnitureType") as string;

    if (!photo) {
      return NextResponse.json({ error: "No photo provided" }, { status: 400 });
    }

    const photoBytes = await photo.arrayBuffer();
    const photoBase64 = Buffer.from(photoBytes).toString("base64");
    const mimeType = photo.type || "image/jpeg";

    const prompt = `You are an expert interior designer. Redesign this room with the following specifications:

- Wall color: ${wallColor}
- Floor type: ${floorType}
- Interior style: ${style}
- Primary materials: ${materials}
- Lighting mood: ${lighting}
- Furniture style: ${furnitureType}

Generate a photorealistic visualization of this room with these changes applied. Keep the room's original layout and dimensions but transform it according to the specifications above. Make it look professional and inviting.`;

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash-image",
      contents: [
        {
          role: "user",
          parts: [
            {
              inlineData: {
                mimeType,
                data: photoBase64,
              },
            },
            { text: prompt },
          ],
        },
      ],
      config: {
        responseModalities: ["IMAGE", "TEXT"],
      },
    });

    const parts = response.candidates?.[0]?.content?.parts;
    if (!parts) {
      return NextResponse.json(
        { error: "No response from AI" },
        { status: 500 }
      );
    }

    for (const part of parts) {
      if (part.inlineData) {
        return NextResponse.json({
          image: `data:${part.inlineData.mimeType};base64,${part.inlineData.data}`,
        });
      }
    }

    const textPart = parts.find((p) => p.text);
    return NextResponse.json(
      { error: textPart?.text || "Failed to generate image" },
      { status: 500 }
    );
  } catch (error: unknown) {
    console.error("Visualization error:", error);
    const message =
      error instanceof Error ? error.message : "Internal server error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

import { products } from "../../../data/products";

export async function POST(req) {
  try {
    const { messages } = await req.json();

    const productList = products
      .map(
        (p) =>
          `- ${p.name} (from ${p.origin}): $${(p.price / 100).toFixed(2)} — ${p.description}`
      )
      .join("\n");

    const systemPrompt = `You are a friendly, helpful shopping assistant for "Meridian Market", an online store selling handmade goods from around the world. Answer customer questions about the products, shipping, and the store. You can understand and reply in English, Bengali, or a casual mix of both (Banglish), matching the customer's language. Keep answers short (2-4 sentences) and warm. If you don't know something specific (like an individual order's status), say so honestly and suggest they contact support.

Here are the products currently in the store:
${productList}

Shipping: worldwide shipping is offered. Prices are shown to each visitor in their local currency automatically.`;

    // Gemini format: role "user"/"model", contents shape
    const contents = messages.map((m) => ({
      role: m.role === "assistant" ? "model" : "user",
      parts: [{ text: m.content }],
    }));

    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${process.env.GEMINI_API_KEY}`,,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents,
          systemInstruction: { parts: [{ text: systemPrompt }] },
          generationConfig: { maxOutputTokens: 300 },
        }),
      }
    );

    const data = await response.json();

    if (data.error) {
      console.error("Gemini API error:", data.error);
      return Response.json({
        reply: "Sorry, something went wrong on our end. Please try again in a moment.",
      });
    }

    const reply =
      data.candidates?.[0]?.content?.parts?.[0]?.text ||
      "Sorry, I couldn't understand that.";
    return Response.json({ reply });
  } catch (e) {
    console.error("Chat API error:", e);
    return Response.json({
      reply: "Sorry, something went wrong. Please try again in a moment.",
    });
  }
                    }

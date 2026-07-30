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

    // Groq uses the same message format as OpenAI: { role, content }
    const groqMessages = [
      { role: "system", content: systemPrompt },
      ...messages.map((m) => ({ role: m.role, content: m.content })),
    ];

    const response = await fetch(
      "https://api.groq.com/openai/v1/chat/completions",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.GROQ_API_KEY}`,
        },
        body: JSON.stringify({
          model: "llama-3.3-70b-versatile",
          messages: groqMessages,
          max_tokens: 300,
        }),
      }
    );

    const data = await response.json();

    if (data.error) {
      console.error("Groq API error:", data.error);
      return Response.json({
        reply: "Sorry, something went wrong on our end. Please try again in a moment.",
      });
    }

    const reply =
      data.choices?.[0]?.message?.content ||
      "Sorry, I couldn't understand that.";
    return Response.json({ reply });
  } catch (e) {
    console.error("Chat API error:", e);
    return Response.json({
      reply: "Sorry, something went wrong. Please try again in a moment.",
    });
  }
}

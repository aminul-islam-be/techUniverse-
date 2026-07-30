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

    const systemPrompt = `You are a friendly, helpful shopping assistant for "Meridian Market", an online store selling handmade goods from around the world. Answer customer questions about the products, shipping, and the store. Keep answers short (2-4 sentences) and warm. If you don't know something specific (like an individual order's status), say so honestly and suggest they contact support.

Here are the products currently in the store:
${productList}

Shipping: worldwide shipping is offered. Prices are shown to each visitor in their local currency automatically, but the store's real charge currency is USD.`;

    const response = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": process.env.ANTHROPIC_API_KEY,
        "anthropic-version": "2023-06-01",
      },
      body: JSON.stringify({
        model: "claude-haiku-4-5-20251001",
        max_tokens: 500,
        system: systemPrompt,
        messages: messages,
      }),
    });

    const data = await response.json();

    if (data.error) {
      console.error("Anthropic API error:", data.error);
      return Response.json({
        reply: "Sorry, something went wrong on our end. Please try again in a moment.",
      });
    }

    const reply = data.content?.[0]?.text || "Sorry, I couldn't understand that.";
    return Response.json({ reply });
  } catch (e) {
    console.error("Chat API error:", e);
    return Response.json({
      reply: "Sorry, something went wrong. Please try again in a moment.",
    });
  }
      }

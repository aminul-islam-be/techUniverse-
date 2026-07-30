import { products } from "../data/products";

// Kono API call lage na — shob answer age theke lekha, browser-e e cholbe.
// Eita completely free, kono external service-er upor depend kore na,
// tai model deprecate/API down howar kono risk nei.

function findProduct(text) {
  return products.find((p) => text.includes(p.name.toLowerCase()));
}

const GREETING_WORDS = [
  "hi",
  "hello",
  "hey",
  "assalam",
  "salam",
  "kemon acho",
  "kemon achen",
  "kmn aso",
  "kmn acho",
  "ki khobor",
  "kiro",
];

export function getFaqReply(rawText) {
  const text = rawText.toLowerCase().trim();

  // Kono product-er nam mention korle
  const product = findProduct(text);
  if (product) {
    return `${product.name} comes from ${product.origin}. ${product.description} It's priced at $${(product.price / 100).toFixed(2)} (shown in your local currency on the page).`;
  }

  if (GREETING_WORDS.some((w) => text.includes(w))) {
    return "Hi there! 👋 Ami valo achi, thanks for asking! Ask me about our products, shipping, prices, or how to order.";
  }

  if (text.includes("ship") || text.includes("deliver") || text.includes("delivery")) {
    return "We ship worldwide! Delivery time depends on your location, usually 1-3 weeks for international orders.";
  }

  if (text.includes("price") || text.includes("cost") || text.includes("dam") || text.includes("currency")) {
    return "Prices are shown automatically in your local currency — you can also change it manually using the dropdown in the top menu.";
  }

  if (text.includes("origin") || text.includes("where") || text.includes("kothay") || text.includes("country")) {
    const list = products.map((p) => `${p.name} (${p.origin})`).join(", ");
    return `Our products come from small workshops around the world: ${list}.`;
  }

  if (text.includes("return") || text.includes("refund")) {
    return "We're finalizing our returns policy — please reach out to our support email for any return requests for now.";
  }

  if (text.includes("pay") || text.includes("payment") || text.includes("checkout") || text.includes("order")) {
    return "Online payment is being set up right now — for now, please contact us directly to place an order.";
  }

  if (text.includes("contact") || text.includes("human") || text.includes("support") || text.includes("email")) {
    return "You can reach our team directly by email — check the footer of the site for our contact details.";
  }

  if (text.includes("thank") || text.includes("dhonnobad")) {
    return "You're very welcome! Let me know if you have any other questions. 🙂";
  }

  if (text.includes("how are you") || text.includes("kemon") || text.includes("kmn")) {
    return "I'm doing great, thanks for asking! How can I help you with your shopping today?";
  }

  return "That's a great question! I'm a simple assistant for now and can help with product info, origins, shipping, and prices. For anything else, please contact our support team directly.";
}

import { products } from "../data/products";

// Kono API call lage na — shob answer age theke lekha, browser-e e cholbe.
// Pore jokhon Anthropic API key thakbe, ChatWidget.js-e /api/chat call korle
// eita real AI hoye jabe (route.js already ache repo-te).

function findProduct(text) {
  return products.find((p) => text.includes(p.name.toLowerCase()));
}

export function getFaqReply(rawText) {
  const text = rawText.toLowerCase();

  // Kono product-er nam mention korle
  const product = findProduct(text);
  if (product) {
    return `${product.name} comes from ${product.origin}. ${product.description} It's priced at $${(product.price / 100).toFixed(2)} (shown in your local currency on the page).`;
  }

  if (/(hi|hello|hey|assalam|salam)\b/.test(text)) {
    return "Hi there! 👋 Ask me about our products, shipping, prices, or how to order.";
  }

  if (text.includes("ship") || text.includes("deliver")) {
    return "We ship worldwide! Delivery time depends on your location, usually 1-3 weeks for international orders.";
  }

  if (text.includes("price") || text.includes("cost") || text.includes("currency")) {
    return "Prices are shown automatically in your local currency — you can also change it manually using the dropdown in the top menu.";
  }

  if (text.includes("origin") || text.includes("where") || text.includes("from") || text.includes("country")) {
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

  if (text.includes("thank")) {
    return "You're very welcome! Let me know if you have any other questions. 🙂";
  }

  return "That's a great question! I'm a simple assistant for now and can help with product info, origins, shipping, and prices. For anything else, please contact our support team directly.";
                                                                                                     }

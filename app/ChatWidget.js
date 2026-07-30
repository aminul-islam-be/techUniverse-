"use client";
import { useState, useRef, useEffect } from "react";

export default function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, open]);

  async function sendMessage() {
    const text = input.trim();
    if (!text || loading) return;

    const newMessages = [...messages, { role: "user", content: text }];
    setMessages(newMessages);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: newMessages }),
      });
      const data = await res.json();
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: data.reply },
      ]);
    } catch (e) {
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: "Sorry, something went wrong. Please try again.",
        },
      ]);
    } finally {
      setLoading(false);
    }
  }

  function handleKeyDown(e) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  }

  return (
    <div className="chat-widget">
      {open && (
        <div className="chat-panel">
          <div className="chat-header">
            <span>Ask us anything</span>
            <button className="chat-close" onClick={() => setOpen(false)}>
              ✕
            </button>
          </div>
          <div className="chat-messages">
            {messages.length === 0 && (
              <div className="chat-empty">
                Hi! Ask me about our products, shipping, or anything else.
              </div>
            )}
            {messages.map((m, i) => (
              <div key={i} className={`chat-bubble chat-${m.role}`}>
                {m.content}
              </div>
            ))}
            {loading && <div className="chat-bubble chat-assistant">…</div>}
            <div ref={bottomRef} />
          </div>
          <div className="chat-input-row">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Type a message..."
            />
            <button onClick={sendMessage} disabled={loading}>
              Send
            </button>
          </div>
        </div>
      )}
      <button
        className="chat-toggle"
        onClick={() => setOpen((o) => !o)}
        aria-label="Open chat"
      >
        {open ? "✕" : "💬"}
      </button>
    </div>
  );
                }

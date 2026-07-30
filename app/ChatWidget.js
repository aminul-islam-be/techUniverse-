"use client";
import { useState, useRef, useEffect } from "react";
import { getFaqReply } from "../lib/faq-bot";

export default function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, open]);

  function sendMessage() {
    const text = input.trim();
    if (!text) return;

    const userMsg = { role: "user", content: text };
    // Choto delay diye reply dekhale ta besh natural lage,
    // kono real API call hocche na tai kono kharoch o nei.
    const reply = getFaqReply(text);

    setMessages((prev) => [...prev, userMsg]);
    setInput("");

    setTimeout(() => {
      setMessages((prev) => [...prev, { role: "assistant", content: reply }]);
    }, 400);
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
            <div ref={bottomRef} />
          </div>
          <div className="chat-input-row">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Type a message..."
            />
            <button onClick={sendMessage}>Send</button>
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

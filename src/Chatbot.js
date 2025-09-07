import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
import "./Chatbot.css";
import { MessageCircle } from "lucide-react";

function Chatbot() {
  const [messages, setMessages] = useState([
    { text: "👋 Hi! I’m your Crop Assistant. Ask me anything.", sender: "bot" }
  ]);
  const [input, setInput] = useState("");
  const [open, setOpen] = useState(false); // toggle chat
  const [loading, setLoading] = useState(false); // show "Thinking..."
  const chatEndRef = useRef(null);

  // Auto-scroll to bottom
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  const sendMessage = async () => {
    const trimmedInput = input.trim();
    if (!trimmedInput) return;

    // Clear chat
    if (trimmedInput.toLowerCase() === "clear") {
      setMessages([
        { text: "👋 Chat reset! I’m your Crop Assistant. Ask me anything.", sender: "bot" }
      ]);
      setInput("");
      return;
    }

    const newMessages = [...messages, { text: trimmedInput, sender: "user" }];
    setMessages(newMessages);
    setInput("");
    setLoading(true);

    try {
      const res = await axios.post("http://127.0.0.1:5000/chat", { message: trimmedInput });
      const botReply = res.data.reply?.trim() || "🤔 Sorry, I couldn’t find an answer.";
      setMessages([...newMessages, { text: botReply, sender: "bot" }]);
    } catch (err) {
      console.error("Chatbot error:", err);
      setMessages([...newMessages, { text: "⚠️ Server not responding. Please try again.", sender: "bot" }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="chatbot-container">
      {/* Floating Button */}
      {!open && (
        <button className="chat-toggle-btn" onClick={() => setOpen(true)}>
          <MessageCircle size={28} />
        </button>
      )}

      {/* Chat Window */}
      {open && (
        <div className="chatbot">
          <div className="chat-header">
            <h3>🌱 Krishi Mitra</h3>
            <button className="close-btn" onClick={() => setOpen(false)}>✖</button>
          </div>

          <div className="chat-window">
            {messages.map((msg, idx) => (
              <div key={idx} className={`chat-message ${msg.sender}`}>
                {msg.text}
              </div>
            ))}

            {/* Typing indicator */}
            {loading && <div className="chat-message bot">⏳ Thinking...</div>}
            <div ref={chatEndRef} />
          </div>

          {/* Input */}
          <div className="chat-input">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type your question..."
              onKeyDown={(e) => {
                if (e.key === "Enter" && !loading) sendMessage();
              }}
              disabled={loading}
            />
            <button onClick={sendMessage} disabled={loading}>
              {loading ? "..." : "Send"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Chatbot;

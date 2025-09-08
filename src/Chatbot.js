import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
import "./Chatbot.css";
import { MessageCircle } from "lucide-react";

const API_BASE_URL = "https://uniq-hinged-1.onrender.com"; // ✅ Updated backend URL

function Chatbot() {
  const [messages, setMessages] = useState([
    { text: "👋 Hi! I’m your Crop Assistant. Ask me anything.", sender: "bot" }
  ]);
  const [input, setInput] = useState("");
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const chatEndRef = useRef(null);

  // Auto-scroll
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
      // ✅ Updated API URL
      const res = await axios.post(`${API_BASE_URL}/chat`, { message: trimmedInput });
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

            {loading && <div className="chat-message bot">⏳ Thinking...</div>}
            <div ref={chatEndRef} />
          </div>

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

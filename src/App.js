import React, { useState, useRef } from "react";
import axios from "axios";
import { FaLeaf, FaStethoscope, FaRobot } from "react-icons/fa";
import "./App.css";
import Chatbot from "./Chatbot";
import heroBg from './img.jpg';
import servicesBg from './tools.jpg';
import ContactUs from "./ContactUs";

function App() {
  // ✅ State updated to match your CSV columns
  const [formData, setFormData] = useState({
    N: "",
    P: "",
    K: "",
    temperature: "",
    humidity: "",
    ph: "",
    rainfall: "",
  });

  const [result, setResult] = useState("");
  const [showForm, setShowForm] = useState(false);
  const formRef = useRef(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://127.0.0.1:5000/predict", formData);
      setResult(res.data.recommended_crop);
    } catch (err) {
      console.error(err);
      alert("⚠️ Error while fetching crop recommendation");
    }
  };

  // ✅ Removed unused options for aspect and soil
  
  const toggleFormVisibility = () => {
    const isFormCurrentlyHidden = !showForm;
    setShowForm(isFormCurrentlyHidden);
    if (isFormCurrentlyHidden) {
      setTimeout(() => {
        if (formRef.current) {
          formRef.current.scrollIntoView({ behavior: "smooth" });
        }
      }, 50);
    }
  };

  return (
    <div className="landing-container">

      {/* ================= HERO SECTION ================= */}
      <section className="section hero" style={{ backgroundImage: `url(${heroBg})` }}>
        <h1>🌿 Welcome to JeeVan</h1>
        <p>Your AI-powered farming assistant for smarter, sustainable agriculture.</p>
        <button className="cta-btn" onClick={() =>
          document.getElementById("services").scrollIntoView({ behavior: "smooth" })
        }>
          Explore Services
        </button>
      </section>

      {/* ================= SERVICES ================= */}
      <section id="services" className="section services" style={{ backgroundImage: `url(${servicesBg})` }}>
        <h2>Our Services</h2>
        <div className="services-grid">
          <div className="service-card">
            <FaLeaf className="service-icon" />
            <h3>🌱 Crop Recommendation</h3>
            <p>Get the best crop suggestion based on your soil & weather conditions.</p>
            <button onClick={toggleFormVisibility}>
              {showForm ? "Hide Form" : "Open Form"}
            </button>
          </div>
          <div className="service-card">
            <FaStethoscope className="service-icon" />
            <h3>🧑‍🌾 Disease Detection</h3>
            <p>Upload leaf images to detect crop diseases with AI-powered analysis.</p>
            <button disabled>Coming Soon</button>
          </div>
          <div className="service-card">
            <FaRobot className="service-icon" />
            <h3>🤖 Smart Chatbot</h3>
            <p>Ask farming questions in your local language and get instant answers.</p>
            <button onClick={() =>
              document.getElementById("chatbot").scrollIntoView({ behavior: "smooth" })
            }>
              Try Chatbot
            </button>
          </div>
        </div>
      </section>

      {/* ================= CROP RECOMMENDATION FORM ================= */}
      {showForm && (
        <section className="section recommend" ref={formRef}>
          <div className="form-box">
            <h1>🌿 JeeVan Crop Recommendation</h1>
            <p className="subtitle">
              Enter soil and climate details to discover the best crop for your land.
            </p>

            {/* ✅ Form simplified to match the CSV file */}
            <form onSubmit={handleSubmit} className="recommendation-form">
              <div className="form-groups-container">
                {/* Soil & Nutrients */}
                <div className="form-group">
                  <h3 className="form-group-title">Soil & Nutrients</h3>
                  <div className="form-field">
                    <label>Nitrogen (N)</label>
                    <input type="number" name="N" value={formData.N} onChange={handleChange} required placeholder="e.g., 90" />
                  </div>
                  <div className="form-field">
                    <label>Phosphorus (P)</label>
                    <input type="number" name="P" value={formData.P} onChange={handleChange} required placeholder="e.g., 42" />
                  </div>
                  <div className="form-field">
                    <label>Potassium (K)</label>
                    <input type="number" name="K" value={formData.K} onChange={handleChange} required placeholder="e.g., 43" />
                  </div>
                   <div className="form-field">
                    <label>Soil pH</label>
                    <input type="number" name="ph" value={formData.ph} onChange={handleChange} required placeholder="e.g., 6.5" />
                  </div>
                </div>

                {/* Climate Conditions */}
                <div className="form-group">
                  <h3 className="form-group-title">Climate Conditions</h3>
                  <div className="form-field">
                    <label>Temperature (°C)</label>
                    <input type="number" name="temperature" value={formData.temperature} onChange={handleChange} required placeholder="e.g., 25.5" />
                  </div>
                  <div className="form-field">
                    <label>Humidity (%)</label>
                    <input type="number" name="humidity" value={formData.humidity} onChange={handleChange} required placeholder="e.g., 70" />
                  </div>
                  <div className="form-field">
                    <label>Rainfall (mm)</label>
                    <input type="number" name="rainfall" value={formData.rainfall} onChange={handleChange} required placeholder="e.g., 200" />
                  </div>
                </div>
              </div>

              <button type="submit" className="submit-btn">
                🌱 Get Recommendation
              </button>
            </form>

            {result && (
              <div className="result-box">
                <h2>✅ Recommended Crop: <span>{result}</span></h2>
              </div>
            )}
          </div>
        </section>
      )}

      {/* ================= CHATBOT ================= */}
      <section id="chatbot" className="section chatbot-section">
        <div className="chatbot-card">
          <h2>🤖 Krishi Mitra Farming Chatbot</h2>
          <p>
            Chat with <strong>Jeevan AI Assistant</strong> for instant farming advice in your own language.
          </p>
          <div className="chatbot-window">
            <Chatbot />
          </div>
          <button className="chatbot-btn">
            🚀 Start Chatting
          </button>
        </div>
      </section>

      {/* ================= CONTACT ================= */}
      <ContactUs />
    </div>
  );
}

export default App;
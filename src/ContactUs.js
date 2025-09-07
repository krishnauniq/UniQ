import React from "react";
import "./ContactUs.css";

const ContactUs = () => {
  return (
    <section className="contact-section" id="contact">
      <h2 className="contact-title">📞 Contact Us</h2>
      <p className="contact-subtitle">
        Have questions? We’d love to hear from you.
      </p>

      <div className="contact-container">
        {/* Left Side - Form */}
        <div className="contact-form">
          <h3>Send us a Message</h3>
          <form>
            <input type="text" placeholder="Your Name" required />
            <input type="email" placeholder="Your Email" required />
            <textarea placeholder="Your Message" rows="5" required></textarea>
            <button type="submit">Send Message 🚀</button>
          </form>
        </div>

        {/* Right Side - Details */}
        <div className="contact-info">
          <h3>Get in Touch</h3>
          <p>📧 Email: contact@jeevan.ai</p>
          <p>📞 Phone: +91 98765 43210</p>
          <p><b>📍 Address</b>: GCET, New Campus Road, Noida</p>
          <a
            href="https://maps.google.com"
            target="_blank"
            rel="noopener noreferrer"
            className="map-link"
          >
            🌍 View on Google Maps
          </a>
        </div>
      </div>
    </section>
  );
};

export default ContactUs;

import React from 'react';
import './Contact.css';

const Contact = () => {
  return (
    <section className="contact-section">
      <div className="contact-container">
        <h2>📞 Contact Us</h2>
        <p>We’d love to hear from you! Reach out anytime.</p>

        <div className="contact-details">
          <div className="contact-item">
            <strong>📱 Phone:</strong> +91 98765 43210
          </div>
          <div className="contact-item">
            <strong>📧 Email:</strong> support@agrovision.in
          </div>
          <div className="contact-item">
            <strong>📍 Address:</strong> AgroVision HQ, Pune, Maharashtra, India
          </div>
        </div>

        
      </div>
    </section>
  );
};

export default Contact;

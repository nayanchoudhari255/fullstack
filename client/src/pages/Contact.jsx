import React from "react";
import "../styles/contact.css";
import Navbar from "../components/Navbar";

const Contact = () => {
   
  return (
   <>
   <Navbar/>
   <section className="contact-section">
      <div className="contact-container">
        <h2 className="contact-title">Contact Us</h2>
        <div className="contact-form-wrapper">
          <form>
            <div className="form-group">
              <label className="form-label">Name</label>
              <input type="text" className="form-input" placeholder="Your Name" />
            </div>
            <div className="form-group">
              <label className="form-label">Email</label>
              <input type="email" className="form-input" placeholder="Your Email" />
            </div>
            <div className="form-group">
              <label className="form-label">Message</label>
              <textarea className="form-textarea" rows="5" placeholder="Your Message"></textarea>
            </div>
            <button type="submit" className="contact-button">Send Message</button>
          </form>
        </div>
      </div>
    </section>
   
   
   </>
  );
};

export default Contact;

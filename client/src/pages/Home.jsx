import React from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import "../styles/home.css";
import hero from "../assets/hero.jpg";
const Home = () => {
  return (
   <>
   
   <Navbar />

    <div className="home-container">
    

      {/* Hero Section */}
      <section className="hero">
        <div className="container">
         <div className="hero-main">
         <div className="hero-content">
            <h1>Design Your Perfect Custom T-shirt</h1>
            <p>Express yourself with our easy-to-use T-shirt design tool. Upload your artwork, add text, or choose from our library of designs - and get your custom creation delivered to your. Lorem ipsum dolor sit, amet consectetur adipisicing elit. At tempore praesentium voluptates facilis suscipit, totam amet accusamus doloremque similique quod consectetur ab natus vel iure expedita vero omnis quos autem.</p>
            <Link to="/design" className="primary-button">Start Designing Now</Link>
          </div>
          <div className="hero-image">
            <img src={hero} alt="T-shirt customization preview" />
          </div>
        </div>
         </div>
      </section>

      {/* Features Section */}
      <section className="features">
        <div className="container">
          <div className="section-title">
            <h2>Why Choose CustomTees?</h2>
            <p>We make creating custom apparel easy, affordable, and fun for everyone.</p>
          </div>
          <div className="feature-grid">
            <div className="feature-card">
              <div className="feature-icon">🎨</div>
              <h3>Easy Design Tool</h3>
              <p>Our intuitive design tool makes it simple to create professional-looking custom apparel in minutes.</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">👕</div>
              <h3>Premium Quality</h3>
              <p>We use high-quality materials and printing techniques to ensure your designs look amazing and last long.</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">🚚</div>
              <h3>Fast Delivery</h3>
              <p>Production in just 2-3 business days with expedited shipping options available nationwide.</p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="how-it-works">
        <div className="container">
          <div className="section-title">
            <h2>How It Works</h2>
            <p>Creating your custom t-shirt is quick and easy with our simple 3-step process.</p>
          </div>
          <div className="steps">
            <div className="step">
              <div className="step-number">1</div>
              <h3>Design</h3>
              <p>Use our online tool to create your design. Upload images, add text, or browse our design library.</p>
            </div>
            <div className="step">
              <div className="step-number">2</div>
              <h3>Preview</h3>
              <p>See exactly how your design will look with our 3D preview tool before you order.</p>
            </div>
            <div className="step">
              <div className="step-number">3</div>
              <h3>Order</h3>
              <p>Choose your quantity, sizes, and place your order. We'll handle the rest!</p>
            </div>
          </div>
        </div>
      </section>

      {/* Customer Reviews */}
      <section className="testimonials">
        <div className="container">
          <div className="section-title">
            <h2>Customer Reviews</h2>
            <p>Don't just take our word for it. Here's what our customers have to say.</p>
          </div>
          <div className="testimonial-grid">
            <div className="testimonial-card">
              <p className="testimonial-text">"The design process was so easy and the quality of the shirts exceeded my expectations. My team loved them!"</p>
              <div className="testimonial-author">
                <div className="author-info">
                  <h4>Sarah Johnson</h4>
                  <p>Small Business Owner</p>
                </div>
              </div>
            </div>
            <div className="testimonial-card">
              <p className="testimonial-text">"Ordered custom shirts for my brother's bachelor party and they were a huge hit! Great quality and super fast shipping."</p>
              <div className="testimonial-author">
                <div className="author-info">
                  <h4>Michael Reynolds</h4>
                  <p>Satisfied Customer</p>
                </div>
              </div>
            </div>
            <div className="testimonial-card">
              <p className="testimonial-text">"The customer service was outstanding and they helped me perfect my design. Will definitely order again!"</p>
              <div className="testimonial-author">
                <div className="author-info">
                  <h4>Emily Chen</h4>
                  <p>Event Planner</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="cta-section">
        <div className="container">
          <h2>Ready to get Products</h2>
          <p>Discover the perfect T-shirt for every occasion! Browse our collection, find your style, and Shop Now for the best deals. Don't wait—your next favorite tee is just a click away!</p>
          <Link to="/productpage" className="secondary-button">Shop Now</Link>
        </div>
      </section>
    </div>

    
    <footer >
      <div className="container ">
        <div className="footer-grid">
          <div className="footer-column">
            <h3 >CustomTees</h3>
            <ul className="footer-links">
              <li><a href="#" className="hover:underline">About Us</a></li>
              <li><a href="#" className="hover:underline">Our Process</a></li>
              <li><a href="#" className="hover:underline">Testimonials</a></li>
              <li><a href="#" className="hover:underline">Blog</a></li>
              <li><a href="#" className="hover:underline">Careers</a></li>
            </ul>
          </div>
          <div className="footer-column">
            <h3 >Products</h3>
            <ul className="footer-links">
              <li><a href="#" className="hover:underline">T-Shirts</a></li>
              <li><a href="#" className="hover:underline">Hoodies</a></li>
              <li><a href="#" className="hover:underline">Tank Tops</a></li>
              <li><a href="#" className="hover:underline">Long Sleeves</a></li>
              <li><a href="#" className="hover:underline">Accessories</a></li>
            </ul>
          </div>
          <div className="footer-column">
            <h3 >Help</h3>
            <ul className="footer-links">
              <li><a href="#" className="hover:underline">FAQs</a></li>
              <li><a href="#" className="hover:underline">Sizing Guide</a></li>
              <li><a href="#" className="hover:underline">Design Tips</a></li>
              <li><a href="#" className="hover:underline">Shipping Info</a></li>
              <li><a href="#" className="hover:underline">Returns Policy</a></li>
            </ul>
          </div>
          <div className="footer-column">
            <h3 >Contact Us</h3>
            <ul className="footer-links">
              <li><a href="#" className="hover:underline">Email Us</a></li>
              <li><a href="#" className="hover:underline">Live Chat</a></li>
              <li><a href="#" className="hover:underline">1-800-CUSTOM-T</a></li>
              <li><a href="#" className="hover:underline">Support Hours</a></li>
              <li><a href="#" className="hover:underline">Bulk Orders</a></li>
            </ul>
          </div>
        </div>
        <div  className="footer-bottom">
          <p>&copy; 2025 CustomTees. All rights reserved.</p>
           <div className="footera">
           <a className="footeran" href="/dashboard">Dashboard</a>
           </div>
        </div>
        
      </div>
    </footer>
 
    </>
  );
};

export default Home;

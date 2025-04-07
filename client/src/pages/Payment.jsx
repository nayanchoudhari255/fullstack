import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "../styles/Payment.css";
import visa from "../assets/visa.png";
import mastercard from "../assets/mastercard.png";
import amex from "../assets/amex.png";
import discover from "../assets/discover.png";
import Navbar from "../components/Navbar";

const Payment = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const item = location.state?.item || null;
  
  // Payment states
  const [paymentDetails, setPaymentDetails] = useState({
    cardNumber: "",
    expiration: "",
    nameOnCard: "",
    cvv: "",
    phoneNumber: ""
  });

  // OTP states
  const [otpMode, setOtpMode] = useState(false);
  const [generatedOTP, setGeneratedOTP] = useState('');
  const [userEnteredOTP, setUserEnteredOTP] = useState('');
  const [otpError, setOtpError] = useState('');

  // Handle input changes for payment details
  const handleChange = (e) => {
    setPaymentDetails({ 
      ...paymentDetails, 
      [e.target.name]: e.target.value 
    });
  };

  // Validate payment details before OTP generation
  const handleInitiatePayment = (e) => {
    e.preventDefault();
    
    // Basic validation
    if (!paymentDetails.phoneNumber) {
      alert("Please enter your phone number for OTP verification");
      return;
    }

    // Simulate OTP generation (in real scenario, this would be server-side)
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    setGeneratedOTP(otp);
    
    // Switch to OTP verification mode
    setOtpMode(true);

    // In a real app, you would call an API to send OTP to phone number
    alert(`OTP ${otp} generated for ${paymentDetails.phoneNumber}`);
  };

  // Verify OTP and complete payment
  const handleOTPVerification = (e) => {
    e.preventDefault();
    
    if (userEnteredOTP === generatedOTP) {
      // OTP Verified - Complete Payment
      alert("Payment successful! 🎉");
      navigate("/");
    } else {
      // Incorrect OTP
      setOtpError("Incorrect OTP. Please try again.");
      setUserEnteredOTP('');
    }
  };

  // Render payment details form
  const renderPaymentDetailsForm = () => (
    <form onSubmit={handleInitiatePayment}>
      <div className="input-group">
        <label>Credit Card Number</label>
        <input
          type="text"
          name="cardNumber"
          placeholder="Enter card number"
          value={paymentDetails.cardNumber}
          onChange={handleChange}
          required
        />
      </div>

      <div className="input-row">
        <div className="input-group">
          <label>Expiration</label>
          <input
            type="text"
            name="expiration"
            placeholder="MM / YY"
            value={paymentDetails.expiration}
            onChange={handleChange}
            required
          />
        </div>
        <div className="input-group">
          <label>CVV</label>
          <input
            type="password"
            name="cvv"
            placeholder="CVV"
            value={paymentDetails.cvv}
            onChange={handleChange}
            required
          />
        </div>
      </div>

      <div className="input-group">
        <label>Name on Card</label>
        <input
          type="text"
          name="nameOnCard"
          placeholder="Enter name"
          value={paymentDetails.nameOnCard}
          onChange={handleChange}
          required
        />
      </div>

      <div className="input-group">
        <label>Phone Number (for OTP)</label>
        <input
          type="tel"
          name="phoneNumber"
          placeholder="Enter phone number"
          value={paymentDetails.phoneNumber}
          onChange={handleChange}
          required
        />
      </div>

      <button type="submit" className="btn-place-order">
        Proceed to Payment
      </button>
    </form>
  );

  // Render OTP verification form
  const renderOTPVerificationForm = () => (
    <form onSubmit={handleOTPVerification}>
      <div className="input-group">
        <label>Enter OTP</label>
        <input
          type="text"
          placeholder="6-digit OTP"
          value={userEnteredOTP}
          onChange={(e) => setUserEnteredOTP(e.target.value)}
          maxLength={6}
          required
        />
      </div>

      {otpError && <div className="error-message">{otpError}</div>}

      <button type="submit" className="btn-verify-otp">
        Verify OTP
      </button>

      <div className="otp-info">
        OTP has been sent to {paymentDetails.phoneNumber}
      </div>
    </form>
  );

  return (
    <>
      <Navbar/>
      <div className="payment-container">
        <h2>Payment</h2>

        {item ? (
          <div className="payment-form">
            <h3>Payment Method</h3>
            <div className="credit-card-section">
              <div className="card-header">
                <input type="radio" checked readOnly /> 
                <label>Credit Card</label>
                <div className="card-icons">
                  <img src={visa} alt="Visa" />
                  <img src={mastercard} alt="MasterCard" />
                  <img src={amex} alt="Amex" />
                  <img src={discover} alt="Discover" />
                </div>
              </div>

              {!otpMode 
                ? renderPaymentDetailsForm() 
                : renderOTPVerificationForm()
              }
            </div>
          </div>
        ) : (
          <p>No item found for payment.</p>
        )}
      </div>
    </>
  );
};

export default Payment;
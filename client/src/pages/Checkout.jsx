import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "../styles/Checkout.css";

const Checkout = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const item = location.state?.item || null;

  const handlePayment = () => {
    alert("Payment successful! 🎉");
    navigate("/");
  };

  return (
    <div className="checkout-container">
      <h2>Payment</h2>

      {item ? (
        <div className="checkout-item">
          <h3>Order Summary</h3>
          <img src={item.styledImage} alt="T-shirt" className="checkout-tshirt" />
          
          <p><strong>Upper Text:</strong> {item.text?.upper || "N/A"}</p>
          <p><strong>Lower Text:</strong> {item.text?.lower || "N/A"}</p>
          <p><strong>Color:</strong> {item.text.color}</p>

          <button onClick={handlePayment} className="btn-pay">Proceed to Payment</button>
        </div>
      ) : (
        <p>No item found for checkout.</p>
      )}
    </div>
  );
};

export default Checkout;

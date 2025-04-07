import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import '../styles/Cart.css';
import Navbar from "../components/Navbar";

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const storedCart = localStorage.getItem("cart");
    setCartItems(storedCart ? JSON.parse(storedCart) : []);
  }, []);

  const handleRemoveItem = (id) => {
    const updatedCart = cartItems.filter((item) => item.id !== id);
    setCartItems(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  const handleBuyNow = (item) => {
    navigate("/payment", { state: { item } });
  };

  return (
    <> 
    <Navbar/>
    <div className="cart-container">
      <h2>Your Cart</h2>

      {cartItems.length > 0 ? (
        <div className="cart-grid">
          {cartItems.map((item) => (
            <div key={item.id} className="cart-item">
              <img src={item.styledImage} alt="Styled T-shirt" className="cart-image" />

              <div className="cart-details">
                <p><strong>Upper Text:</strong> {item.text?.upper || "N/A"}</p>
                <p><strong>Lower Text:</strong> {item.text?.lower || "N/A"}</p>
                <p><strong>Color:</strong> <span style={{ color: item.text.color }}>{item.text.color}</span></p>
              </div>

              <div className="cart-actions">
                <button onClick={() => handleRemoveItem(item.id)} className="btn-remove">Remove</button>
                <button onClick={() => handleBuyNow(item)} className="btn-buy-now">Buy Now</button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p>Your cart is empty.</p>
      )}
      
    </div>
    </>
  );
};

export default Cart;

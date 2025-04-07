import React from "react";
import Navbar from "../components/Navbar";
import TShirtCustomizer from "./TshirtCustomizer";


const Product = () => {
  return (
    <div className="product-container">
      <Navbar />
      <div className="customizer-section">
      
        <TShirtCustomizer />
      </div>
    </div>
  );
};

export default Product;






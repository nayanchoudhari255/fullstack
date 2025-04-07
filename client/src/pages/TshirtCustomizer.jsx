import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  initCanvas,
  updateTshirtBackground,
  addImageToCanvas,
  updateText,
} from "../utils/fiber";

import tshirtWhite from "../assets/images/white.jpg";
import tshirtBlack from "../assets/images/black.jpg";
import tshirtBlue from "../assets/images/blue.jpg";
import tshirtRed from "../assets/images/red.jpg";


import '../styles/TshirtCustomizer.css'


const TshirtCustomizer = () => {
  const navigate = useNavigate();
  const canvasRef = useRef(null);
  const [canvas, setCanvas] = useState(null);
  const [tshirtImage, setTshirtImage] = useState(tshirtWhite);
  const [textUpper, setTextUpper] = useState("Text Here");
  const [textLower, setTextLower] = useState("Text Here");
  const [textSize, setTextSize] = useState(30);
  const [textColor, setTextColor] = useState("#000000");

  useEffect(() => {
    if (canvasRef.current) {
      const newCanvas = initCanvas(canvasRef);
      setCanvas(newCanvas);
      updateTshirtBackground(newCanvas, tshirtImage);
    }
  }, []);

  const handleTshirtChange = (image) => {
    setTshirtImage(image);
    if (canvas) updateTshirtBackground(canvas, image);
  };

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => addImageToCanvas(canvas, e.target.result);
      reader.readAsDataURL(file);
    }
  };

  const handleTextUpdate = () => {
    if (canvas) updateText(canvas, textUpper, textLower, textSize, textColor);
  };

  const handleDownloadImage = () => {
    if (!canvas) return;
    const dataURL = canvas.toDataURL("image/png");
    const link = document.createElement("a");
    link.href = dataURL;
    link.download = "custom-tshirt.png";
    link.click();
  };

  const handleAddToCart = () => {
    if (!canvas) return;

    const styledImage = canvas.toDataURL("image/png");

    const cartItem = {
      id: Date.now(),
      tshirtImage,
      styledImage,
      text: {
        upper: textUpper,
        lower: textLower,
        color: textColor,
        size: textSize,
      },
    };

    const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
    const updatedCart = [...storedCart, cartItem];

    localStorage.setItem("cart", JSON.stringify(updatedCart));
    alert("Styled T-shirt added to cart!");
  };

  return (
    <div className="customizer-container">
      <div className="canvas-section">
        <canvas ref={canvasRef} id="tshirt-canvas"></canvas>
      </div>

      <div className="settings-section">
        <h3>Customize Your T-shirt</h3>

        <div className="tshirt-colors">
          <h4>Change T-shirt Color</h4>
          <div className="color-options">
            {[tshirtWhite, tshirtBlack, tshirtBlue, tshirtRed].map((color, index) => (
              <img
                key={index}
                src={color}
                alt="T-shirt Color"
                onClick={() => handleTshirtChange(color)}
                className={tshirtImage === color ? "selected" : ""}
              />
            ))}
          </div>
        </div>

        <div className="image-upload">
          <h4>Upload Image</h4>
          <input type="file" onChange={handleImageUpload} />
        </div>

        <div className="text-settings">
          <h4>Text Options</h4>
          <input type="text" value={textUpper} onChange={(e) => setTextUpper(e.target.value)} placeholder="Upper Text" />
          <input type="text" value={textLower} onChange={(e) => setTextLower(e.target.value)} placeholder="Lower Text" />

          <h4>Text Size</h4>
          <input type="range" min="10" max="50" value={textSize} onChange={(e) => setTextSize(e.target.value)} />

          <h4>Text Color</h4>
          <input type="color" value={textColor} onChange={(e) => setTextColor(e.target.value)} />

          <button className="applytxt" onClick={handleTextUpdate}>Apply Text</button>
        </div>

        <div className="actions">
          <button onClick={handleDownloadImage}>Download</button>
          <button onClick={handleAddToCart}>Add to Cart</button>
          <button onClick={() => navigate("/cart")}>View Cart</button>
        </div>
      </div>
    </div>
  );
};

export default TshirtCustomizer;



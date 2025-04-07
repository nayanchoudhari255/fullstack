import React, { useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, useTexture } from "@react-three/drei";
import * as THREE from "three";
import html2canvas from "html2canvas";
import "../styles/customizer.css";

const TshirtModel = ({ color, design, text }) => {
  const meshRef = useRef();
  const texture = design ? useTexture(design) : null; // ✅ Use inside Canvas

  useFrame(() => {
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.005;
    }
  });

  return (
    <mesh ref={meshRef} scale={2}>
      <sphereGeometry args={[1, 32, 32]} />
      <meshStandardMaterial color={color} map={texture} />
    </mesh>
  );
};

const TshirtCustomizer = () => {
  const [color, setColor] = useState("#ffffff");
  const [text, setText] = useState("Your Design");
  const [design, setDesign] = useState(null);

  const handleColorChange = (e) => setColor(e.target.value);
  const handleTextChange = (e) => setText(e.target.value);
  
  const handleDesignUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => setDesign(event.target.result);
      reader.readAsDataURL(file);
    }
  };

  const handleDownload = () => {
    html2canvas(document.querySelector(".canvas-container")).then((canvas) => {
      const link = document.createElement("a");
      link.href = canvas.toDataURL("image/png");
      link.download = "custom-tshirt.png";
      link.click();
    });
  };

  return (
    <div className="customizer-container">
      <h2>Customize Your T-Shirt</h2>
      
      {/* 3D Canvas */}
      <div className="canvas-container">
        <Canvas className="canvas">
          <ambientLight intensity={0.5} />
          <directionalLight position={[2, 2, 2]} />
          <OrbitControls enableZoom={true} />
          <TshirtModel color={color} design={design} text={text} />
        </Canvas>
      </div>
      
      {/* Controls */}
      <div className="controls">
        <label>Choose Color:</label>
        <input type="color" value={color} onChange={handleColorChange} />

        <label>Enter Text:</label>
        <input type="text" value={text} onChange={handleTextChange} />

        <label>Upload Design:</label>
        <input type="file" accept="image/*" onChange={handleDesignUpload} />

        <button className="download-btn" onClick={handleDownload}>Download T-Shirt</button>
      </div>
    </div>
  );
};

export default TshirtCustomizer;



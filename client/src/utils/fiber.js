import { fabric } from "fabric";

// Initialize Fabric.js Canvas
export const initCanvas = (canvasRef) => {
  if (!canvasRef.current) return null;

  const canvas = new fabric.Canvas(canvasRef.current, {
    width: 400,
    height: 400,
    backgroundColor: "transparent",
  });

  return canvas;
};

// Update the T-shirt Background
export const updateTshirtBackground = (canvas, image) => {
  fabric.Image.fromURL(image, (img) => {
    img.set({
      scaleX: canvas.width / img.width,
      scaleY: canvas.height / img.height,
      selectable: false,
      evented: false,
    });
    canvas.setBackgroundImage(img, canvas.renderAll.bind(canvas));
  });
};

// Add Image to Canvas
export const addImageToCanvas = (canvas, imageURL) => {
  fabric.Image.fromURL(imageURL, (img) => {
    img.scaleToWidth(200);
    img.scaleToHeight(200);
    img.set({
      left: 100,
      top: 100,
      selectable: true,
    });
    canvas.add(img);
  });
};

// Update Text on the T-shirt
export const updateText = (canvas, textUpper, textLower, textSize, textColor) => {
  canvas.getObjects().forEach((obj) => {
    if (obj.type === "text") {
      canvas.remove(obj);
    }
  });

  const textProps = {
    fontFamily: "Arial",
    fontSize: textSize,
    fill: textColor,
    selectable: true,
  };

  const upperText = new fabric.Text(textUpper, { ...textProps, top: 50, left: 100 });
  const lowerText = new fabric.Text(textLower, { ...textProps, top: 300, left: 100 });

  canvas.add(upperText, lowerText);
};

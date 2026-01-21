import { useEffect, useRef, useState } from "react";
import QRCode from "qrcode";
import { saveAs } from "file-saver";
import "./App.css";

const App = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const [text, setText] = useState("https://tool.nosirjonov.uz");
  const [qrColor, setQrColor] = useState("#000000");
  const [bgColor, setBgColor] = useState("#ffffff");
  const [size, setSize] = useState(350);


  useEffect(() => {
    
  const renderQR = async () => {
    if (!canvasRef.current) return;
    await QRCode.toCanvas(canvasRef.current, text || " ", {
      width: size,
      margin: 2,
      color: {
        dark: qrColor,
        light: bgColor,
      },
      errorCorrectionLevel: "H",
    });
  };
    renderQR();
    
  }, [text, qrColor, bgColor, size]);

  const downloadQR = () => {
    if (!canvasRef.current) return;
    canvasRef.current.toBlob((blob) => {
      if (blob) saveAs(blob, "qr-code.png");
    });
  };

  return (
    <div className="container">
      {/* Chap panel */}
      <div className="panel left">
        <h1>QR Code Generator</h1>
        <p className="subtitle">Create custom QR Codes with colors and logos.</p>

        <label className="label">URL yoki matn</label>
        <input
          className="input"
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
        />

        <div className="grid">
          <div>
            <label className="label">QR rangi</label>
            <input
              className="input"
              type="color"
              value={qrColor}
              onChange={(e) => setQrColor(e.target.value)}
            />
          </div>
          <div>
            <label className="label">Fon rangi</label>
            <input
              className="input"
              type="color"
              value={bgColor}
              onChange={(e) => setBgColor(e.target.value)}
            />
          </div>
        </div>

        <label className="label">O‘lcham: {size}px</label>
        <input
          className="range"
          type="range"
          min={150}
          max={800}
          step={10}
          value={size}
          onChange={(e) => setSize(Number(e.target.value))}
        />

        <button className="btn" onClick={downloadQR}>
          Download PNG
        </button>
      </div>

      {/* O‘ng panel */}
      <div className="panel right">
        <h2>Live Preview</h2>
        <div className="preview">
          <canvas ref={canvasRef}></canvas>
        </div>
      </div>
    </div>
  );
};

export default App;
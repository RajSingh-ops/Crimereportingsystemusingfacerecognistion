import React, { useRef, useEffect } from "react";

function WebcamCapture() {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);

  useEffect(() => {
    navigator.mediaDevices.getUserMedia({ video: true })
      .then(stream => {
        videoRef.current.srcObject = stream;
      });
  }, []);

  const captureAndSend = async () => {
    const context = canvasRef.current.getContext("2d");
    context.drawImage(videoRef.current, 0, 0, 640, 480);
    canvasRef.current.toBlob(async (blob) => {
      const formData = new FormData();
      formData.append("file", blob, "capture.jpg");

      const response = await fetch("http://localhost:8000/verify", {
        method: "POST",
        body: formData
      });

      const result = await response.json();
      alert(result.match ? `Criminal Detected: ${result.criminal}` : "No match");
    }, "image/jpeg");
  };

  return (
    <div>
      <video ref={videoRef} width="640" height="480" autoPlay />
      <canvas ref={canvasRef} width="640" height="480" style={{ display: "none" }} />
      <br />
      <button onClick={captureAndSend}>Capture & Verify</button>
    </div>
  );
}

export default WebcamCapture;

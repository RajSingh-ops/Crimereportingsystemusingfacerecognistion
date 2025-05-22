import React, { useRef, useState } from "react";
import Webcam from "react-webcam";
import axios from "axios";

const VerifyFace = () => {
  const webcamRef = useRef(null);
  const [result, setResult] = useState(null);

  const captureAndSend = async () => {
    const imageSrc = webcamRef.current.getScreenshot();
    const blob = await (await fetch(imageSrc)).blob();
    const file = new File([blob], "capture.jpg", { type: "image/jpeg" });

    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await axios.post("http://127.0.0.1:8000/verify", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setResult(response.data);
    } catch (err) {
      console.error("Error uploading image:", err);
    }
  };

  return (
    <div style={{ textAlign: "center" }}>
      <h2>Verify Face (Webcam)</h2>
      <Webcam
        audio={false}
        ref={webcamRef}
        screenshotFormat="image/jpeg"
        width={350}
      />
      <br />
      <button onClick={captureAndSend}>Capture & Detect</button>
      {result && (
        <div style={{ marginTop: "20px" }}>
          <p>Match: {result.match ? "Yes ✅" : "No ❌"}</p>
          {result.criminal && <p>Criminal: {result.criminal}</p>}
        </div>
      )}
    </div>
  );
};

export default VerifyFace;

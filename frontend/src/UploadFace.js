import React, { useState } from "react";
import axios from "axios";
import "./UploadFace.css";

function UploadFace() {
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState("");

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
    setMessage("");
  };

  const handleUpload = async () => {
    if (!file) {
      setMessage("❗ Please select a file.");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await axios.post("http://127.0.0.1:8000/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      setMessage(`${response.data.message} (${response.data.filename || response.data.existing_file})`);
    } catch (error) {
      console.error("Upload failed:", error);
      setMessage("❌ Upload failed.");
    }
  };

  return (
    <div className="upload-container">
      <h2>Upload Criminal Face</h2>
      <input type="file" onChange={handleFileChange} accept="image/*" />
      <button onClick={handleUpload}>Upload</button>
      <p>{message}</p>
    </div>
  );
}

export default UploadFace;

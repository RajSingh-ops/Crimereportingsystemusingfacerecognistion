import React, { useState } from "react";
import axios from "axios";
import "./ImageUpload.css";

const ImageUpload = () => {
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) {
      setMessage("Please select a file first.");
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
      setMessage(`✅ ${response.data.message}: ${response.data.filename}`);
    } catch (error) {
      console.error(error);
      setMessage("❌ Upload failed.");
    }
  };

  return (
    <div className="upload-container">
      <h2>Upload Criminal Face</h2>
      <form onSubmit={handleSubmit}>
        <input type="file" onChange={handleChange} accept="image/*" />
        <button type="submit">Upload</button>
      </form>
      <p>{message}</p>
    </div>
  );
};

export default ImageUpload;

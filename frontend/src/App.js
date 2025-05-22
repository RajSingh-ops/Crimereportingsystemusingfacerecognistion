import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import UploadFace from "./UploadFace";
import VerifyFace from "./VerifyFace";

function App() {
  return (
    <Router>
      <nav style={{ textAlign: "center", margin: "20px" }}>
        <Link to="/" style={{ marginRight: "20px" }}>Upload Face</Link>
        <Link to="/verify">Verify Face</Link>
      </nav>
      <Routes>
        <Route path="/" element={<UploadFace />} />
        <Route path="/verify" element={<VerifyFace />} />
      </Routes>
    </Router>
  );
}

export default App;

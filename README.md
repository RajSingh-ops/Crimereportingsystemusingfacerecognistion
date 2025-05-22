# 🕵️‍♂️ Crime Reporting System Using Face Recognition

A real-time web-based solution that uses facial recognition to identify known criminals from a webcam or uploaded image.  
Developed using **React.js** for frontend and **FastAPI** + **DeepFace** + **OpenCV** for backend processing.

---

## ✅ Features

- 🎥 Capture and analyze faces from a webcam in real-time
- 🖼️ Upload image files for criminal face verification
- 🚨 Detect and flag criminals from a known dataset
- 🧠 AI-powered face recognition using DeepFace
- 🔄 Upload new faces to the criminal database

---

## 🛠️ Tech Stack

### Frontend:
- ⚛️ React.js  
- 📦 Axios  
- 📸 React Webcam  

### Backend:
- 🐍 FastAPI  
- 🧠 DeepFace (face recognition engine)  
- 👁️ OpenCV (webcam handling)  
- 🔧 Uvicorn  
- 🗃️ Python-Multipart (for image upload)

---

## 📁 Folder Structure

```
CrimeReportingSystem/
├── backend/
│   ├── app.py
│   ├── requirements.txt
│   └── known_faces/
├── frontend/
│   └── src/
│       ├── App.js
│       ├── UploadFace.js
│       └── styles.css
```

---

## 🚀 Getting Started

### 🔙 Backend Setup

```bash
cd backend
pip install -r requirements.txt
uvicorn app:app --reload
```

Runs the API at: `http://127.0.0.1:8000`

---

### 🔜 Frontend Setup

```bash
cd frontend
npm install axios react-webcam
npm start
```

Runs the app at: `http://localhost:3000`

---

## 🔌 API Endpoints

- `POST /verify` → Verify an image against known criminal faces  
- `POST /upload` → Upload new face to `known_faces/` directory  

---

## 👨‍💻 Team Members

- Raj Singh — `2301330100160`  
- Naman Pundir — `2301330100130`  
- Vishal — `2301330100224`  

---

## ⚖️ License

📚 For educational and academic use only.

from fastapi import FastAPI, UploadFile, File
from fastapi.middleware.cors import CORSMiddleware
from deepface import DeepFace
import os
import shutil

app = FastAPI()

# Allow React or any frontend to access this API
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Or replace "*" with your React app's origin for security
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Directory to store known criminal images
KNOWN_FACES_DIR = "known_faces"
os.makedirs(KNOWN_FACES_DIR, exist_ok=True)


@app.post("/upload")
async def upload_face(file: UploadFile = File(...)):
    temp_path = "temp_upload.jpg"

    # Save uploaded file temporarily
    with open(temp_path, "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)

    # Check against known faces
    for known_file in os.listdir(KNOWN_FACES_DIR):
        known_path = os.path.join(KNOWN_FACES_DIR, known_file)
        result = DeepFace.verify(
            img1_path=temp_path,
            img2_path=known_path,
            enforce_detection=False
        )
        if result["verified"]:
            os.remove(temp_path)
            return {
                "message": "Duplicate face detected",
                "existing_file": known_file
            }

    # Save new face since it doesn't match any known
    save_path = os.path.join(KNOWN_FACES_DIR, file.filename)
    shutil.move(temp_path, save_path)

    return {
        "message": "New face uploaded and saved",
        "filename": file.filename
    }



# ✅ Route 2: Verify a face against known criminals
@app.post("/verify")
async def verify_face(file: UploadFile = File(...)):
    temp_path = "temp.jpg"

    # Save the uploaded file temporarily
    with open(temp_path, "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)

    # Compare with all known faces
    for known_image in os.listdir(KNOWN_FACES_DIR):
        known_path = os.path.join(KNOWN_FACES_DIR, known_image)

        result = DeepFace.verify(
            img1_path=temp_path,
            img2_path=known_path,
            enforce_detection=False
        )

        if result["verified"]:
            os.remove(temp_path)
            return {"match": True, "criminal": known_image}

    os.remove(temp_path)
    return {"match": False}


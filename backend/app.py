from fastapi import FastAPI, UploadFile, File
from fastapi.middleware.cors import CORSMiddleware
from deepface import DeepFace
import os
import shutil

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

BASE_DIR = os.path.dirname(os.path.abspath(__file__))
KNOWN_FACES_DIR = os.path.join(BASE_DIR, "known_faces")
os.makedirs(KNOWN_FACES_DIR, exist_ok=True)

@app.post("/upload")
async def upload_face(file: UploadFile = File(...)):
    temp_path = os.path.join(BASE_DIR, "temp_upload.jpg")

    with open(temp_path, "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)

    try:
        for known_file in os.listdir(KNOWN_FACES_DIR):
            if not known_file.lower().endswith(('.jpg', '.jpeg', '.png', '.webp')):
                continue
            known_path = os.path.join(KNOWN_FACES_DIR, known_file)
            
            try:
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
            except Exception as e:
                print(f"Error verifying {known_file}: {e}")
                continue

        save_path = os.path.join(KNOWN_FACES_DIR, file.filename)
        shutil.move(temp_path, save_path)
        return {
            "message": "New face uploaded and saved",
            "filename": file.filename
        }
    except Exception as e:
        if os.path.exists(temp_path):
            os.remove(temp_path)
        raise e

@app.post("/verify")
async def verify_face(file: UploadFile = File(...)):
    temp_path = os.path.join(BASE_DIR, "temp.jpg")

    with open(temp_path, "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)

    try:
        for known_image in os.listdir(KNOWN_FACES_DIR):
            if not known_image.lower().endswith(('.jpg', '.jpeg', '.png', '.webp')):
                continue
            known_path = os.path.join(KNOWN_FACES_DIR, known_image)

            try:
                result = DeepFace.verify(
                    img1_path=temp_path,
                    img2_path=known_path,
                    enforce_detection=False
                )
                if result["verified"]:
                    os.remove(temp_path)
                    return {"match": True, "criminal": known_image}
            except Exception as e:
                print(f"Error verifying {known_image}: {e}")
                continue

        os.remove(temp_path)
        return {"match": False}
    except Exception as e:
        if os.path.exists(temp_path):
            os.remove(temp_path)
        raise e

from fastapi import FastAPI, UploadFile, File, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from PIL import Image
import io
import torch
import torchvision.transforms as transforms
from pathlib import Path
import timm

from disease_db import get_disease_info

app = FastAPI(title="CropGuard API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

MODEL_PATH = Path(__file__).parent / "models" / "cropguard_best.pth"

CLASSES = [
    "Apple___Apple_scab",
    "Apple___Black_rot",
    "Apple___Cedar_apple_rust",
    "Apple___healthy",
    "Blueberry___healthy",
    "Cherry___Powdery_mildew",
    "Cherry___healthy",
    "Corn___Cercospora_leaf_spot",
    "Corn___Common_rust",
    "Corn___Northern_Leaf_Blight",
    "Corn___healthy",
    "Grape___Black_rot",
    "Grape___Esca",
    "Grape___Leaf_blight",
    "Grape___healthy",
    "Orange___Haunglongbing",
    "Peach___Bacterial_spot",
    "Peach___healthy",
    "Pepper___Bacterial_spot",
    "Pepper___healthy",
    "Potato___Early_blight",
    "Potato___Late_blight",
    "Potato___healthy",
    "Raspberry___healthy",
    "Soybean___healthy",
    "Squash___Powdery_mildew",
    "Strawberry___Leaf_scorch",
    "Strawberry___healthy",
    "Tomato___Bacterial_spot",
    "Tomato___Early_blight",
    "Tomato___Late_blight",
    "Tomato___Leaf_Mold",
    "Tomato___Septoria_leaf_spot",
    "Tomato___Spider_mites",
    "Tomato___Target_Spot",
    "Tomato___Tomato_Yellow_Leaf_Curl_Virus",
    "Tomato___Tomato_mosaic_virus",
    "Tomato___healthy",
]

device = torch.device("cuda" if torch.cuda.is_available() else "cpu")
model = None


def load_model():
    if not MODEL_PATH.exists():
        return None

    model = timm.create_model("efficientnet_b0", pretrained=False, num_classes=38)
    model.load_state_dict(
        torch.load(MODEL_PATH, map_location=device, weights_only=False)
    )
    model = model.to(device)
    model.eval()
    return model


def preprocess_image(image: Image.Image) -> torch.Tensor:
    transform = transforms.Compose(
        [
            transforms.Resize((224, 224)),
            transforms.ToTensor(),
            transforms.Normalize([0.485, 0.456, 0.406], [0.229, 0.224, 0.225]),
        ]
    )
    return transform(image)


@app.get("/")
def root():
    return {"message": "CropGuard API is running", "status": "healthy"}


@app.on_event("startup")
async def startup_event():
    global model
    model = load_model()
    if model is None:
        print("Warning: Model not loaded. Please check model path.")
    else:
        print("Model loaded successfully!")


@app.post("/predict")
async def predict(file: UploadFile = File(...)):
    global model

    if model is None:
        if not MODEL_PATH.exists():
            raise HTTPException(
                status_code=500, detail=f"Model file not found at {MODEL_PATH}"
            )
        model = load_model()
        if model is None:
            raise HTTPException(status_code=500, detail="Failed to load model")

    contents = await file.read()
    image = Image.open(io.BytesIO(contents)).convert("RGB")

    input_tensor = preprocess_image(image).unsqueeze(0).to(device)

    with torch.no_grad():
        outputs = model(input_tensor)
        probabilities = torch.nn.functional.softmax(outputs[0], dim=0)
        top3 = torch.topk(probabilities, 3)

    predicted_class = CLASSES[top3.indices[0].item()]
    confidence_val = top3.values[0].item() * 100

    disease_info = get_disease_info(predicted_class)

    return JSONResponse(
        {
            "disease": disease_info["name"],
            "confidence": round(confidence_val, 1),
            "severity": disease_info["severity"],
            "cause": disease_info["cause"],
            "precautions": disease_info["precautions"],
            "treatment": disease_info["treatment"],
            "top3": [
                {"label": CLASSES[i], "confidence": round(p.item() * 100, 1)}
                for i, p in zip(top3.indices, top3.values)
            ],
        }
    )


@app.get("/classes")
def get_classes():
    return {"classes": CLASSES}

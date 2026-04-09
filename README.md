# 🌿 CropGuard – AI-Powered Plant Disease Detection

CropGuard is an AI-powered plant disease detection system that identifies plant diseases from leaf images using deep learning. It helps farmers, researchers, and gardeners quickly diagnose plant health issues and take corrective actions.

---

## Features

- **Instant Disease Detection**  
  Upload a leaf image and get real-time disease prediction.

- **38 Disease Classes**  
  Covers 14 crop types with multiple disease categories.

- **Confidence Scores**  
  Displays top 3 predictions with accuracy percentages.

- **Severity Assessment**  
  Categorizes disease as:
  - None
  - Low
  - Medium
  - High

- **Treatment Recommendations**  
  Suggests both organic and chemical treatments.

- **Prevention Tips**  
  Helps prevent disease spread.

- **Multi-language Support**  
  Available in English and Hindi.

---

## Model Information

- **Architecture:** EfficientNet-B0  
- **Input Size:** 224x224 RGB images  
- **Dataset:** PlantVillage  
- **Classes:** 38  

---

## Tech Stack

### Backend
- FastAPI
- PyTorch
- TorchVision
- TIMM
- Pillow

### Frontend
- Next.js 16
- React 19
- Tailwind CSS 4

---

## Supported Crops & Diseases

| Crop       | Diseases |
|------------|---------|
| Apple      | Apple Scab, Black Rot, Cedar Apple Rust, Healthy |
| Blueberry  | Healthy |
| Cherry     | Powdery Mildew, Healthy |
| Corn       | Cercospora Leaf Spot, Common Rust, Northern Leaf Blight, Healthy |
| Grape      | Black Rot, Esca, Leaf Blight, Healthy |
| Orange     | Huanglongbing (Citrus Greening) |
| Peach      | Bacterial Spot, Healthy |
| Pepper     | Bacterial Spot, Healthy |
| Potato     | Early Blight, Late Blight, Healthy |
| Raspberry  | Healthy |
| Soybean    | Healthy |
| Squash     | Powdery Mildew |
| Strawberry | Leaf Scorch, Healthy |
| Tomato     | Bacterial Spot, Early Blight, Late Blight, Leaf Mold, Septoria Leaf Spot, Spider Mites, Target Spot, Tomato Yellow Leaf Curl Virus, Tomato Mosaic Virus, Healthy |

---

## Installation

### Prerequisites
- Python 3.11+
- Node.js 18+
- npm or yarn

---

## Backend Setup

```bash
cd backend
pip install -r requirements.txt
```

## Frontend Setup

```bash
cd frontend
npm install
```

## Start Backend Server

```bash
cd backend
uvicorn main:app --reload --port 8000
```
Backend runs at: http://localhost:8000

## Start Frontend Server

```bash
cd frontend
npm run dev
```
Frontend runs at: http://localhost:3000



## API Documentation
 Health Check
 GET /

```json
{
  "message": "CropGuard API is running",
  "status": "healthy"
}
```

## Predict Disease

POST /predict

Content-Type: multipart/form-data
Body: file (image)

Response:

```json
{
  "disease": "Tomato Late Blight",
  "confidence": 94.7,
  "severity": "High",
  "cause": "Caused by oomycete Phytophthora infestans...",
  "precautions": [
    "Avoid overhead irrigation",
    "Remove and destroy infected plant debris"
  ],
  "treatment": "Spray with mancozeb or copper-based fungicide...",
  "top3": [
    {"label": "Tomato___Late_blight", "confidence": 94.7},
    {"label": "Tomato___Early_blight", "confidence": 3.2},
    {"label": "Potato___Late_blight", "confidence": 2.1}
  ]
}
```

## Get Classes
GET /classes

```json
{
  "classes": [
    "Apple___Apple_scab",
    "Apple___Black_rot"
  ]
}
```

## Project Structure

```
CropGuard/
├── backend/
│   ├── main.py
│   ├── disease_db.py
│   ├── requirements.txt
│   ├── Dockerfile
│   └── models/
│       └── cropguard_best.pth
│
├── frontend/
│   ├── src/app/
│   │   ├── page.tsx
│   │   ├── layout.tsx
│   │   ├── globals.css
│   │   ├── login/page.tsx
│   │   ├── signup/page.tsx
│   │   ├── about/page.tsx
│   │   ├── contact/page.tsx
│   │   └── components/
│   │       ├── Header.tsx
│   │       └── LanguageContext.tsx
│   ├── package.json
│   └── next.config.ts
│
└── README.md

```

## Docker Deployment
```
cd backend
docker build -t cropguard-backend .
docker run -p 8000:8000 cropguard-backend
```






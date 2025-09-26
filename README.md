Absolutely! I can convert what you wrote into a **complete, ready-to-use README + curl examples** for both **local and cloud Render endpoints**, which you can directly use in your GitHub repo. Here's the full polished version:

---

# AI Health Profiler

A backend-focused health survey profiling app that ingests survey data (text or image), extracts answers using OCR/AI, computes risk factors, and generates personalized recommendations.

---

## Tech Stack

* **Backend:** Node.js + Express – REST API for OCR, factor extraction, risk scoring, and recommendations.
* **AI/ML:** Gemini API (`@google/genai`) – OCR from images and AI text parsing.

> Frontend (React + Vite) is optional and not required for submission.

---

## Folder Structure

```
ai-health-profiler/
├── README.md
├── package.json
├── .gitignore
├── backend/
│   ├── package.json
│   ├── server.js
│   ├── .env
│   ├── src/
│   │   ├── app.js
│   │   ├── routes/
│   │   │   ├── ocr.routes.js
│   │   │   ├── factors.routes.js
│   │   │   ├── risk.routes.js
│   │   │   └── recommend.routes.js
│   │   ├── controllers/
│   │   ├── services/
│   │   └── utils/
│   └── tests/
└── docs/
    ├── API.md
    ├── SAMPLE_REQUESTS.md
    └── demo_instructions.md
```

---

## How It Works

1. **Input**: Users provide answers via JSON (text input) or upload a scanned survey form (image).
2. **OCR / Parsing**:

   * Images → OCR → Plain text
   * Text → Parsed into structured JSON with validation and missing field detection
3. **Factor Extraction**: Converts answers into risk factors (e.g., smoking → "high risk").
4. **Risk Classification**: Computes risk score and level based on factors.
5. **Recommendations**: Generates actionable guidance.

---

## Running the Project

### Backend (Node.js + Express)

```bash
cd backend
npm install
```

1. Create `.env`:

```env
GEMINI_API_KEY=your_gemini_api_key_here
PORT=5000
```

2. Start the backend:

```bash
node server.js
```

> Backend runs on `http://localhost:5000` by default.

3. **Cloud version (Render)**:

Use your deployed URL, e.g.:
`https://plum-ai-health-2.onrender.com`

---

## Sample `curl` Requests

### **Localhost**

#### 1. OCR from Text Input

```bash
curl -X POST http://localhost:5000/ocr \
-H "Content-Type: application/json" \
-d '{
  "text": "Age: 35\nSmoker: yes\nExercise: often\nDiet: balanced"
}'
```

#### 2. OCR from Image Upload

```bash
curl -X POST http://localhost:5000/ocr \
-F "file=@./backend/uploads/sample.png"
```

#### 3. Factor Extraction

```bash
curl -X POST http://localhost:5000/factors \
-H "Content-Type: application/json" \
-d '{
  "answers": {
    "age": 35,
    "smoker": true,
    "exercise": "often",
    "diet": "balanced"
  }
}'
```

#### 4. Risk Scoring

```bash
curl -X POST http://localhost:5000/risk \
-H "Content-Type: application/json" \
-d '{
  "factors": ["smoking", "high_blood_pressure"]
}'
```

#### 5. Recommendations

```bash
curl -X POST http://localhost:5000/recommend \
-H "Content-Type: application/json" \
-d '{
  "risk_level": "high",
  "factors": ["smoking", "high_blood_pressure"]
}'
```

---

### **Cloud (Render Deployment)**

Replace `http://localhost:5000` with your deployed URL (`https://plum-ai-health-2.onrender.com`):

```bash
curl -X POST https://plum-ai-health-2.onrender.com/ocr \
-H "Content-Type: application/json" \
-d '{
  "text": "Age: 35\nSmoker: yes\nExercise: often\nDiet: balanced"
}'
```

```bash
curl -X POST https://plum-ai-health-2.onrender.com/ocr \
-F "file=@./backend/uploads/sample.png"
```

```bash
curl -X POST https://plum-ai-health-2.onrender.com/factors \
-H "Content-Type: application/json" \
-d '{
  "answers": {
    "age": 35,
    "smoker": true,
    "exercise": "often",
    "diet": "balanced"
  }
}'
```

```bash
curl -X POST https://plum-ai-health-2.onrender.com/risk \
-H "Content-Type: application/json" \
-d '{
  "factors": ["smoking", "high_blood_pressure"]
}'
```

```bash
curl -X POST https://plum-ai-health-2.onrender.com/recommend \
-H "Content-Type: application/json" \
-d '{
  "risk_level": "high",
  "factors": ["smoking", "high_blood_pressure"]
}'
```

---

## Architecture Overview

```
          ┌───────────────┐
          │   Client      │ (Optional: Postman/curl)
          └──────┬────────┘
                 │ HTTP requests
                 ▼
          ┌───────────────┐
          │   Backend     │ Node.js + Express
          └──────┬────────┘
                 │ AI calls (Gemini)
                 ▼
          ┌───────────────┐
          │   Gemini API  │ OCR & Parsing
          └───────────────┘
```

* Backend handles JSON parsing, OCR, risk factor computation, and recommendations.
* Frontend is optional; Postman or curl can fully test endpoints.

---

## Notes

* Ensure `.env` has your Gemini API key.
* For cloud deployment, make sure **CORS** is enabled for your frontend or testing origin.
* Both text and image inputs are supported by `/ocr`.
* Factor extraction, risk scoring, and recommendations endpoints expect **JSON payloads**.

---

## License

MIT

---

I can also **create a ready-to-paste version with ngrok instructions for local demo** and working Render URL curl examples so that it’s fully submission-ready.

Do you want me to do that next?

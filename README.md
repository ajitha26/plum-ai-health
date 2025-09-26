
---

# AI Health Profiler

A full-stack health survey profiling app that ingests survey data (text or image), extracts answers using OCR/AI, computes risk factors, and generates personalized recommendations.

---

## Tech Stack

* **Frontend:** React (Vite) – fast UI with JSX components and Axios for API calls.
* **Backend:** Node.js + Express – REST API for OCR, factor extraction, risk scoring, and recommendations.
* **AI/ML:** Gemini API (`@google/genai`) – OCR from images and AI text parsing.

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
├── frontend/                 
│   ├── package.json
│   ├── vite.config.js
│   ├── index.html
│   ├── .env
│   └── src/
│       ├── main.jsx
│       ├── App.jsx
│       ├── components/
│       │   ├── FormUpload.jsx
│       │   ├── OCRPreview.jsx
│       │   ├── RiskReport.jsx
│       │   └── Recommendations.jsx
│       ├── services/
│       │   └── api.js        
│       └── styles/
│           └── app.css
└── docs/
    ├── API.md
    ├── SAMPLE_REQUESTS.md
    └── demo_instructions.md
```

**Backend Folder Details**

```
backend/src/
├── controllers/      # Handles HTTP requests & responses
├── services/         # Core logic, API calls, computations
├── routes/           # Defines endpoints and maps to controllers
└── utils/            # Helper functions, validators, formatters
```

---

## How It Works

1. **Form Input / Image Upload**
   Users can fill in a form with age, smoker status, exercise, and diet or upload a scanned survey form (image).

2. **OCR / Parsing**

   * If an image is uploaded, Gemini AI extracts plain text.
   * Text is parsed into structured JSON with answers and missing field validation.

3. **Factor Extraction**
   Converts answers into risk factors (e.g., smoking → "high risk").

4. **Risk Classification**
   Computes risk score and level based on the factors.

5. **Recommendations**
   Generates actionable, non-diagnostic guidance for the user.

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
```

2. Start the backend:

```bash
node server.js
```

> Backend runs on port `5000` by default.

---

### Frontend (Vite + React)

```bash
cd frontend
npm install
```

1. Create `.env`:

```env
VITE_API_BASE_URL=http://localhost:5000
```

2. Start the frontend:

```bash
npm run dev
```

> Frontend runs at `http://localhost:5173` by default.

---

## Usage

1. Open the frontend URL in a browser.
2. Fill in the form or upload an image.
3. Click **Run Full Analysis**.
4. Output displayed:

   * Parsed answers
   * Risk factors
   * Risk level & score
   * Recommendations

---

## Architecture Overview

```
          ┌───────────────┐
          │   Frontend    │
          │  React + Vite │
          └──────┬────────┘
                 │ Axios API calls
                 ▼
          ┌───────────────┐
          │   Backend     │
          │ Node.js +     │
          │ Express       │
          └──────┬────────┘
                 │ AI calls (Gemini)
                 ▼
          ┌───────────────┐
          │   Gemini API  │
          │ OCR & Parsing │
          └───────────────┘
```

* Frontend communicates with backend via Axios.
* Backend uses Gemini API for OCR and parsing.
* Backend computes factors, risk, and recommendations.

---

## Sample `curl` Requests

### 1. OCR from Text Input

```bash
curl -X POST http://localhost:5000/ocr \
-H "Content-Type: application/json" \
-d '{
  "text": "Age: 35\nSmoker: yes\nExercise: often\nDiet: balanced"
}'
```

### 2. OCR from Image Upload

```bash
curl -X POST http://localhost:5000/ocr \
-F "file=@./backend/uploads/sample.png"
```

### 3. Factor Extraction

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

### 4. Risk Scoring

```bash
curl -X POST http://localhost:5000/risk \
-H "Content-Type: application/json" \
-d '{
  "factors": ["smoking", "high_blood_pressure"]
}'
```

### 5. Recommendations

```bash
curl -X POST http://localhost:5000/recommend \
-H "Content-Type: application/json" \
-d '{
  "risk_level": "high",
  "factors": ["smoking", "high_blood_pressure"]
}'
```

> You can also test these endpoints in Postman using the same payloads.

---

## Notes

* Ensure Gemini API key is in backend `.env`.
* Run both frontend and backend concurrently.
* Frontend communicates with backend via Axios (`src/services/api.js`).

---

## License

MIT

---



Do you want me to add that?





# AI Health Profiler

A full-stack health survey profiling app that ingests survey data (text or image), extracts answers using OCR/AI, computes risk factors, and generates personalized recommendations.

---

## Tech Stack

- **Frontend:** React (Vite) – modern, fast UI with JSX components and Axios for API calls.  
- **Backend:** Node.js + Express – REST API for OCR, factor extraction, risk scoring, and recommendations.  
- **AI/ML:** Gemini API (`@google/genai`) – OCR from images and AI text parsing.

---

## Folder Structure (YAML)

```yaml
ai-health-profiler:
  README.md
  package.json
  .gitignore
  backend:
    package.json
    server.js
    .env
    src:
      app.js
      routes:
        ocr.routes.js
        factors.routes.js
        risk.routes.js
        recommend.routes.js
      controllers:
        ocr.controller.js
        factors.controller.js
        risk.controller.js
        recommend.controller.js
      services:
        ocr.service.js
        parser.service.js
        factor.service.js
        risk.service.js
        recommend.service.js
      utils:
        validator.js
        responseFormatter.js
    tests:
      ocr.test.js
      risk.test.js
      recommend.test.js
  frontend:
    package.json
    vite.config.js
    index.html
    .env
    src:
      main.jsx
      App.jsx
      components:
        FormUpload.jsx
        OCRPreview.jsx
        RiskReport.jsx
        Recommendations.jsx
      services:
        api.js
      styles:
        app.css
  docs:
    API.md
    SAMPLE_REQUESTS.md
    demo_instructions.md
````

**Backend Folder Details**

```yaml
backend/src:
  controllers/      # Handles HTTP requests & responses
  services/         # Core logic, API calls, computations
  routes/           # Defines endpoints and maps to controllers
  utils/            # Helper functions, validators, formatters
```

---

## How It Works

1. **Form Input / Image Upload**
   Users can fill a form with age, smoker status, exercise, and diet details **or upload a scanned survey form** (image).

2. **OCR / Parsing**

   * If an image is uploaded, Gemini AI extracts plain text.
   * Text is parsed into structured JSON with answers and missing field validation.

3. **Factor Extraction**

   * Converts answers into risk factors (e.g., smoking → "high risk").

4. **Risk Classification**

   * Computes risk score and level based on factors.

5. **Recommendations**

   * Generates actionable, non-diagnostic guidance for the user.

---

## Running the Project

### Backend (Node.js + Express)

```bash
cd backend
npm install
```

1. Create `.env` file:

```env
GEMINI_API_KEY=your_gemini_api_key_here
```

2. Start the backend server:

```bash
node server.js
```

> The backend runs on port `5000` by default.

---

### Frontend (Vite + React)

```bash
cd frontend
npm install
```

1. Create `.env` file (optional):

```env
VITE_API_BASE_URL=http://localhost:5000
```

2. Start the frontend development server:

```bash
npm run dev
```

> The frontend runs at `http://localhost:5173` by default.

---

## Usage

1. Open the frontend URL in a browser.
2. Fill in the form fields or upload an image.
3. Click **Run Full Analysis**.
4. The app will display:

   * Parsed answers
   * Risk factors
   * Risk level & score
   * Recommendations

---

## Architecture Overview

```text
Frontend (React) <--Axios--> Backend (Node.js/Express) <--Gemini API--> AI OCR & Parsing
Frontend displays parsed answers, risk factors, and recommendations
```

---

## Notes

* Backend must have a valid Gemini API key in `.env`.
* Both frontend and backend must run concurrently for full functionality.
* Frontend communicates with backend via Axios API wrapper (`src/services/api.js`).

---

## License

MIT

```

This is **ready to copy into your README.md**.  

If you want, I can also **add a visual folder tree diagram** instead of YAML—it looks cleaner on GitHub. Do you want me to do that?
```


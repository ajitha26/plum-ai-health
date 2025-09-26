Here’s a ready-to-use `README.md` you can drop directly into your project:

```markdown
# AI Health Profiler

A full-stack health survey profiling app that ingests survey data (text or image), extracts answers using OCR/AI, computes risk factors, and generates personalized recommendations.  

---

## Tech Stack

- **Frontend:** React (Vite) – fast, modern UI with JSX components and Axios for API calls.  
- **Backend:** Node.js + Express – REST API for OCR, factor extraction, risk scoring, and recommendations.  
- **AI/ML:** Gemini API (`@google/genai`) – OCR from images and AI text parsing.  

---

## Folder Structure

```

ai-health-profiler/
│── README.md
│── package.json
│── .gitignore
│
├── backend/                  # Node.js + Express backend
│   │── package.json
│   │── server.js             # Entry point
│   │── .env                  # API keys (Gemini, Supabase, etc.)
│   │
│   ├── src/
│   │   ├── app.js            # Express app setup
│   │   ├── routes/           # Endpoint definitions
│   │   ├── controllers/      # Handles HTTP requests/responses
│   │   ├── services/         # Core logic, API calls, computations
│   │   └── utils/            # Validators, formatters, helpers
│   │
│   └── tests/                # Unit & integration tests
│
├── frontend/                  # Vite + React frontend
│   │── package.json
│   │── vite.config.js
│   │── index.html
│   │── .env                   # Frontend environment variables
│   │
│   ├── src/
│   │   ├── main.jsx
│   │   ├── App.jsx
│   │   ├── components/        # React components
│   │   ├── services/          # Axios wrapper for API calls
│   │   └── styles/            # CSS
│
└── docs/                     # Documentation
├── API.md
├── SAMPLE\_REQUESTS.md
└── demo\_instructions.md

````

---

## How It Works

1. **Form Input / Image Upload**  
   Users can fill a form with age, smoker status, exercise, and diet details **or upload a scanned survey form** (image).  

2. **OCR / Parsing**  
   - If an image is uploaded, Gemini AI extracts plain text.  
   - Text is parsed into structured JSON with answers and missing field validation.  

3. **Factor Extraction**  
   - Converts answers into risk factors (e.g., smoking → "high risk").  

4. **Risk Classification**  
   - Computes risk score and level based on factors.  

5. **Recommendations**  
   - Generates actionable, non-diagnostic guidance for the user.  

---

## Running the Project

### Backend (Node.js + Express)

```bash
cd backend
npm install
````

1. Create `.env` file:

```
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

```
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

## Notes

* Backend must have a valid Gemini API key in `.env`.
* Both frontend and backend must run concurrently for full functionality.
* Frontend communicates with backend via Axios API wrapper (`src/services/api.js`).

---

## License

MIT

```

---

If you want, I can also **add a small ASCII diagram showing how data flows from frontend → backend → AI → frontend**, which makes the README visually clearer for reviewers.  

Do you want me to do that?
```

import React, { useState } from "react";
import api from "../services/api";
import "../styles/app.css"; // import CSS

export default function FormUpload() {
  const [age, setAge] = useState("");
  const [smoker, setSmoker] = useState("");
  const [exercise, setExercise] = useState("");
  const [diet, setDiet] = useState("");
  const [file, setFile] = useState(null);

  const [ocrResult, setOcrResult] = useState(null);
  const [factors, setFactors] = useState(null);
  const [risk, setRisk] = useState(null);
  const [recommend, setRecommend] = useState(null);

  const handleRunFull = async () => {
    try {
      let ocrRes;
      if (file) {
        const formData = new FormData();
        formData.append("file", file);
        ocrRes = await api.post("/ocr", formData, true);
      } else {
        const textInput = `Age: ${age}\nSmoker: ${smoker}\nExercise: ${exercise}\nDiet: ${diet}`;
        ocrRes = await api.post("/ocr", { text: textInput });
      }

      if (ocrRes.status === "incomplete_profile") {
        alert("Incomplete profile: " + ocrRes.reason);
        return;
      }

      setOcrResult(ocrRes.answers || {});

      const factorsRes = await api.post("/factors", { answers: ocrRes.answers });
      setFactors(factorsRes.factors || []);

      const riskRes = await api.post("/risk", { factors: factorsRes.factors });
      setRisk(riskRes || null);

      const recommendRes = await api.post("/recommend", {
        risk_level: riskRes.risk_level,
        factors: factorsRes.factors,
      });
      setRecommend(recommendRes || null);
    } catch (err) {
      console.error(err);
      alert("Error running analysis");
    }
  };

  return (
    <div className="container">
      <h2>Health Survey Form</h2>

      <div className="form-group">
        <label>Age</label>
        <input type="number" value={age} onChange={(e) => setAge(e.target.value)} />
      </div>

      <div className="form-group">
        <label>Smoker</label>
        <select value={smoker} onChange={(e) => setSmoker(e.target.value)}>
          <option value="">Select</option>
          <option value="yes">Yes</option>
          <option value="no">No</option>
        </select>
      </div>

      <div className="form-group">
        <label>Exercise</label>
        <input type="text" value={exercise} onChange={(e) => setExercise(e.target.value)} />
      </div>

      <div className="form-group">
        <label>Diet</label>
        <input type="text" value={diet} onChange={(e) => setDiet(e.target.value)} />
      </div>

      <div className="form-group">
        <label>Upload Form (Optional)</label>
        <input type="file" onChange={(e) => setFile(e.target.files[0])} />
      </div>

      <button onClick={handleRunFull}>Run Full Analysis</button>

      {ocrResult && (
        <div className="result-section">
          <h3>Answers</h3>
          <p>Age: {ocrResult.age ?? "N/A"}</p>
          <p>Smoker: {ocrResult.smoker !== null ? (ocrResult.smoker ? "Yes" : "No") : "N/A"}</p>
          <p>Exercise: {ocrResult.exercise ?? "N/A"}</p>
          <p>Diet: {ocrResult.diet ?? "N/A"}</p>
        </div>
      )}

      {factors && factors.length > 0 && (
        <div className="result-section">
          <h3>Risk Factors</h3>
          <ul>
            {factors.map((f, i) => (
              <li key={i}>{f}</li>
            ))}
          </ul>
        </div>
      )}

      {risk && (
        <div className="result-section">
          <h3>Risk Level</h3>
          <p>Level: {risk.risk_level}</p>
          <p>Score: {risk.score}</p>
          <p>Rationale: {risk.rationale.join(", ")}</p>
        </div>
      )}

      {recommend && recommend.recommendations && (
        <div className="result-section">
          <h3>Recommendations</h3>
          <ul>
            {recommend.recommendations.map((r, i) => (
              <li key={i}>{r}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

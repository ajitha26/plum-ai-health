import React, { useState } from "react";
import api from "../services/api";
import "../styles/app.css";

export default function FormUpload() {
  const [age, setAge] = useState("");
  const [smoker, setSmoker] = useState("");
  const [exercise, setExercise] = useState("");
  const [diet, setDiet] = useState("");
  const [file, setFile] = useState(null);

  const [ocrResult, setOcrResult] = useState(null);

  const handleRunFull = async () => {
    try {
      let ocrRes;
      if (file) {
        const formData = new FormData();
        formData.append("file", file);
        const response = await api.post("/ocr", formData, true);
        ocrRes = response;
      } else {
        const textInput = `Age: ${age}\nSmoker: ${smoker}\nExercise: ${exercise}\nDiet: ${diet}`;
        const response = await api.post("/ocr", { text: textInput });
        ocrRes = response;
      }

      if (ocrRes.status === "incomplete_profile") {
        alert("Incomplete profile: " + ocrRes.reason);
        return;
      }

      setOcrResult(ocrRes.answers || {});
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
        <select value={diet} onChange={(e) => setDiet(e.target.value)}>
          <option value="">Select</option>
          <option value="Nutritious">Nutritious</option>
          <option value="Junk Food">Junk Food</option>
          <option value="Mixed">Mixed</option>
        </select>
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
    </div>
  );
}

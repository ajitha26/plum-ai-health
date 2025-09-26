<div className="container">
  <div className="form-section">
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
      <select value={exercise} onChange={(e) => setExercise(e.target.value)}>
        <option value="">Select</option>
        <option value="none">None</option>
        <option value="rarely">Rarely</option>
        <option value="regularly">Regularly</option>
      </select>
    </div>

    <div className="form-group">
      <label>Diet</label>
      <select value={diet} onChange={(e) => setDiet(e.target.value)}>
        <option value="">Select</option>
        <option value="nutritious">Nutritious</option>
        <option value="balanced">Balanced</option>
        <option value="high sugar">High Sugar</option>
        <option value="junk food">Junk Food</option>
        <option value="high fat">High Fat</option>
      </select>
    </div>

    <div className="form-group">
      <label>Upload Form (Optional)</label>
      <input type="file" onChange={(e) => setFile(e.target.files[0])} />
    </div>

    <button onClick={handleRunFull}>Run Full Analysis</button>
  </div>

  {ocrResult && (
    <div className="result-section">
      <h3>Answers</h3>
      <p>Age: {ocrResult.age ?? "N/A"}</p>
      <p>Smoker: {ocrResult.smoker !== null ? (ocrResult.smoker ? "Yes" : "No") : "N/A"}</p>
      <p>Exercise: {ocrResult.exercise ?? "N/A"}</p>
      <p>Diet: {ocrResult.diet ?? "N/A"}</p>

      {factors && factors.length > 0 && (
        <>
          <h3>Risk Factors</h3>
          <ul>{factors.map((f, i) => <li key={i}>{f}</li>)}</ul>
        </>
      )}

      {risk && (
        <>
          <h3>Risk Level</h3>
          <p>Level: {risk.risk_level}</p>
          <p>Score: {risk.score}</p>
          <p>Rationale: {risk.rationale.join(", ")}</p>
        </>
      )}

      {recommend && recommend.recommendations && (
        <>
          <h3>Recommendations</h3>
          <ul>{recommend.recommendations.map((r, i) => <li key={i}>{r}</li>)}</ul>
        </>
      )}
    </div>
  )}
</div>

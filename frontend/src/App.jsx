import React, { useState } from "react";
import FormUpload from "./components/FormUpload";
import OCRPreview from "./components/OCRPreview";
import RiskReport from "./components/RiskReport";
import Recommendations from "./components/Recommendations";

export default function App() {
  const [ocrResult, setOcrResult] = useState(null);
  const [factors, setFactors] = useState(null);
  const [risk, setRisk] = useState(null);
  const [recommend, setRecommend] = useState(null);

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">AI Health Profiler</h1>

      {/* Input / Upload */}
      <FormUpload
        setOcrResult={setOcrResult}
        setFactors={setFactors}
        setRisk={setRisk}
        setRecommend={setRecommend}
      />

      {/* Step 1 - OCR/Text Parse */}
      {ocrResult && <OCRPreview result={ocrResult} />}

      {/* Step 2 & 3 */}
      {factors && risk && <RiskReport factors={factors} risk={risk} />}

      {/* Step 4 */}
      {recommend && <Recommendations recommend={recommend} />}
    </div>
  );
}

import React from "react";

export default function RiskReport({ factors, risk }) {
  return (
    <div className="mb-4 p-4 border rounded bg-yellow-50">
      <h2 className="font-bold mb-2">Step 2 & 3: Risk Profile</h2>
      <p><strong>Factors:</strong> {factors.factors?.join(", ")}</p>
      <p><strong>Risk Level:</strong> {risk.risk_level}</p>
      <p><strong>Score:</strong> {risk.score}</p>
      <p><strong>Rationale:</strong> {risk.rationale?.join(", ")}</p>
    </div>
  );
}

import React from "react";

export default function OCRPreview({ result }) {
  return (
    <div className="mb-4 p-4 border rounded bg-gray-50">
      <h2 className="font-bold mb-2">Step 1: Parsed Answers</h2>
      <pre className="text-sm">{JSON.stringify(result, null, 2)}</pre>
    </div>
  );
}

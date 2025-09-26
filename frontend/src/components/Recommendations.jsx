import React from "react";

export default function Recommendations({ recommend }) {
  return (
    <div className="p-4 border rounded bg-green-50">
      <h2 className="font-bold mb-2">Step 4: Recommendations</h2>
      <ul className="list-disc ml-5">
        {recommend.recommendations?.map((rec, i) => (
          <li key={i}>{rec}</li>
        ))}
      </ul>
      <p className="mt-2 text-sm text-gray-600">Status: {recommend.status}</p>
    </div>
  );
}

import { useState } from "react";

export default function App() {
  const [address, setAddress] = useState("");
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState(null);

  const handleSearch = async () => {
    setLoading(true);
    // This is where API or logic will go
    setTimeout(() => {
      setResults({
        compsFound: 4,
        warnings: ["Near busy road", "No garage"],
        moa: "$385,000",
      });
      setLoading(false);
    }, 1200);
  };

  return (
    <div className="p-6 max-w-xl mx-auto text-center">
      <h1 className="text-3xl font-bold mb-4">Flipur ARV Calculator</h1>
      <input
        type="text"
        placeholder="Enter property address"
        value={address}
        onChange={(e) => setAddress(e.target.value)}
        className="border p-2 rounded w-full mb-3"
      />
      <button
        onClick={handleSearch}
        disabled={!address}
        className="bg-purple-600 text-white px-4 py-2 rounded disabled:opacity-50"
      >
        {loading ? "Analyzing..." : "Analyze"}
      </button>

      {results && (
        <div className="mt-6 text-left">
          <p>📊 Comps Found: {results.compsFound}</p>
          <p>⚠️ Warnings: {results.warnings.join(", ")}</p>
          <p>💰 Recommended MAO: {results.moa}</p>
        </div>
      )}
    </div>
  );
}

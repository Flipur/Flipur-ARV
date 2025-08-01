import React, { useState } from "react";

export default function App() {
  const [address, setAddress] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const ZILLOW_API_KEY = "62db0e789a581e70d84fe7e6fc1b0ef1"; // Your Browser Token

  const handleAnalyze = async () => {
    setLoading(true);
    setResult(null);
    try {
      // 1. Fetch Property Details
      const { data: searchResult } = await window.axios.get(
        `https://api.bridgedataoutput.com/api/v2/zestimates_v2/search`,
        {
          params: {
            access_token: ZILLOW_API_KEY,
            address,
          },
        }
      );

      if (!searchResult.bundle?.length) {
        throw new Error("No property data found.");
      }

      const property = searchResult.bundle[0];
      const zpid = property.zpid;

      // 2. Fetch Comparable Properties
      const { data: compsResult } = await window.axios.get(
        `https://api.bridgedataoutput.com/api/v2/zestimates_v2/property/${zpid}/comps`,
        {
          params: {
            access_token: ZILLOW_API_KEY,
            count: 5,
          },
        }
      );

      const comps = compsResult.bundle;

      if (!comps?.length) {
        throw new Error("No comps available for this property.");
      }

      // 3. Flipur Comping Logic
      const arv = comps.reduce((acc, comp) => acc + comp.zestimate, 0) / comps.length;

      const MAO =
        arv -
        0.1 * arv - // hard money/closing
        0.07 * arv - // dispo/realtor
        50000;

      // 4. Warnings
      const warnings = [];
      if (property.lotSize < 4000) warnings.push("Small lot");
      if (property.parkingType === "None") warnings.push("No garage");
      if (property.address.includes("Rd")) warnings.push("Near busy road");

      setResult({
        compsFound: comps.length,
        warnings,
        mao: Math.round(MAO).toLocaleString(),
      });
    } catch (error) {
      console.error("Analysis error:", error);
      setResult({ error: error.message || "Could not retrieve property data." });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: "2rem", fontFamily: "Arial" }}>
      <h1>Flipur ARV Calculator</h1>
      <input
        value={address}
        onChange={(e) => setAddress(e.target.value)}
        placeholder="Enter property address"
        style={{ marginRight: "10px", padding: "5px" }}
      />
      <button onClick={handleAnalyze} disabled={loading || !address.trim()}>
        {loading ? "Analyzing..." : "Analyze"}
      </button>

      {result && (
        <div style={{ marginTop: "20px" }}>
          {result.error ? (
            <p style={{ color: "red" }}>{result.error}</p>
          ) : (
            <>
              <p>📊 Comps Found: {result.compsFound}</p>
              <p>⚠️ Warnings: {result.warnings.join(", ") || "None"}</p>
              <p>💰 Recommended MAO: ${result.mao}</p>
            </>
          )}
        </div>
      )}
    </div>
  );
}

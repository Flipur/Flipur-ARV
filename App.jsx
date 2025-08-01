import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export default function FlipurARVCalculator() {
  const [address, setAddress] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="p-6 grid grid-cols-1 md:grid-cols-3 gap-6">
      {/* Search Bar */}
      <div className="md:col-span-3">
        <form onSubmit={handleSubmit} className="flex items-center gap-4">
          <Input
            placeholder="Enter property address..."
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />
          <Button type="submit">Analyze</Button>
        </form>
      </div>

      {submitted && (
        <>
          {/* ARV & MAO Summary */}
          <Card className="md:col-span-1">
            <CardContent className="space-y-4 p-4">
              <h2 className="text-xl font-bold">ARV & MAO Summary</h2>
              <div>
                <p>Suggested ARV: <strong>$525,000</strong></p>
                <label className="block text-sm">Override ARV</label>
                <Input placeholder="$525,000" />
              </div>
              <div>
                <p>Rehab Estimate: <strong>$60,000</strong></p>
                <p>MAO: <strong>$372,500</strong></p>
              </div>
              <div className="text-sm text-yellow-600">
                ⚠️ Warning: Lot smaller than average
              </div>
            </CardContent>
          </Card>

          {/* Comps Grid */}
          <Card className="md:col-span-2">
            <CardContent className="p-4">
              <h2 className="text-xl font-bold mb-4">Comparable Sales</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="border p-3 rounded-xl shadow">
                    <p><strong>123 Sample St</strong></p>
                    <p>0.4 mi · 3 bed · 2 bath</p>
                    <p>Sold: $510,000</p>
                    <p>DOM: 12</p>
                    <div className="text-sm text-green-600">✅ Good match</div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </>
      )}
    </div>
  );
}

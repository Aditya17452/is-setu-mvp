"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, ArrowRight, CheckCircle2 } from "lucide-react";
import AILoader, { SEARCH_STEPS } from "./AILoader";
import RecommendationReport from "./RecommendationReport";
import {
  exampleChips,
  queryToScenario,
  waterHeaterScenario,
} from "@/lib/demoData";
import type { StandardRecommendation } from "@/lib/demoData";

export default function QuickSearch() {
  const [query, setQuery] = useState("");
  const [phase, setPhase] = useState<"idle" | "loading" | "done">("idle");
  const [result, setResult] = useState<StandardRecommendation | null>(null);

  const handleSubmit = (q?: string) => {
    const searchQuery = (q ?? query).trim();
    if (!searchQuery) return;

    setPhase("loading");
    setQuery(searchQuery);
  };

  const handleLoaderComplete = () => {
    // Resolve query to scenario
    const normalized = query.toLowerCase().trim();
    const scenario = queryToScenario[normalized] ?? waterHeaterScenario;
    setResult(scenario);
    setPhase("done");
  };

  const handleReset = () => {
    setPhase("idle");
    setQuery("");
    setResult(null);
  };

  return (
    <div>
      <AnimatePresence mode="wait">
        {phase === "idle" && (
          <motion.div
            key="idle"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
          >
            {/* Search input */}
            <div
              style={{
                display: "flex",
                gap: 10,
                marginBottom: 16,
              }}
            >
              <div style={{ flex: 1, position: "relative" }}>
                <Search
                  size={18}
                  color="#9CA3AF"
                  style={{
                    position: "absolute",
                    left: 14,
                    top: "50%",
                    transform: "translateY(-50%)",
                  }}
                />
                <input
                  id="quick-search-input"
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
                  placeholder="e.g. 25 litre electric storage water heater for government hostel"
                  style={{
                    width: "100%",
                    padding: "13px 16px 13px 42px",
                    border: "2px solid #E5E7EB",
                    borderRadius: 10,
                    fontSize: "0.9rem",
                    color: "#1F2937",
                    outline: "none",
                    transition: "border-color 0.2s",
                    background: "white",
                    fontFamily: "Inter, sans-serif",
                  }}
                  onFocus={(e) => {
                    e.target.style.borderColor = "#2B5286";
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = "#E5E7EB";
                  }}
                />
              </div>
              <button
                onClick={() => handleSubmit()}
                disabled={!query.trim()}
                id="search-submit-btn"
                style={{
                  padding: "13px 24px",
                  background:
                    query.trim()
                      ? "linear-gradient(135deg, #1E3A5F 0%, #2B5286 100%)"
                      : "#E5E7EB",
                  color: query.trim() ? "white" : "#9CA3AF",
                  border: "none",
                  borderRadius: 10,
                  fontSize: "0.9rem",
                  fontWeight: 700,
                  cursor: query.trim() ? "pointer" : "not-allowed",
                  display: "flex",
                  alignItems: "center",
                  gap: 6,
                  transition: "all 0.2s",
                  whiteSpace: "nowrap",
                  boxShadow: query.trim() ? "0 2px 8px rgba(30,58,95,0.3)" : "none",
                }}
              >
                Find Standard
                <ArrowRight size={16} />
              </button>
            </div>

            {/* Example chips */}
            <div>
              <p
                style={{
                  fontSize: "0.75rem",
                  color: "#6B7280",
                  marginBottom: 10,
                  fontWeight: 600,
                  letterSpacing: "0.03em",
                }}
              >
                TRY AN EXAMPLE:
              </p>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                {exampleChips.map((chip) => (
                  <button
                    key={chip}
                    id={`chip-${chip.slice(0, 20).replace(/\s/g, "-")}`}
                    onClick={() => handleSubmit(chip)}
                    style={{
                      padding: "6px 14px",
                      border: "1px solid #BFDBFE",
                      borderRadius: 9999,
                      background: "#EFF6FF",
                      color: "#1D4ED8",
                      fontSize: "0.78rem",
                      fontWeight: 500,
                      cursor: "pointer",
                      transition: "all 0.15s",
                    }}
                    onMouseEnter={(e) => {
                      (e.target as HTMLButtonElement).style.background = "#DBEAFE";
                      (e.target as HTMLButtonElement).style.borderColor = "#93C5FD";
                    }}
                    onMouseLeave={(e) => {
                      (e.target as HTMLButtonElement).style.background = "#EFF6FF";
                      (e.target as HTMLButtonElement).style.borderColor = "#BFDBFE";
                    }}
                  >
                    {chip}
                  </button>
                ))}
              </div>
            </div>
          </motion.div>
        )}

        {phase === "loading" && (
          <motion.div
            key="loading"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div
              style={{
                padding: "12px 16px",
                background: "#EFF6FF",
                borderRadius: 8,
                border: "1px solid #BFDBFE",
                marginBottom: 24,
                fontSize: "0.82rem",
                color: "#1D4ED8",
              }}
            >
              <strong>Searching for: </strong>&ldquo;{query}&rdquo;
            </div>
            <AILoader
              steps={SEARCH_STEPS}
              onComplete={handleLoaderComplete}
              title="Finding the right standard…"
            />
          </motion.div>
        )}

        {phase === "done" && result && (
          <motion.div
            key="done"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                marginBottom: 20,
                flexWrap: "wrap",
                gap: 10,
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <CheckCircle2 size={18} color="#16A34A" />
                <span style={{ fontSize: "0.85rem", fontWeight: 600, color: "#15803D" }}>
                  Recommendation ready — {result.confidence}% confidence
                </span>
              </div>
              <button
                onClick={handleReset}
                id="new-search-btn"
                style={{
                  padding: "6px 14px",
                  background: "white",
                  border: "1px solid #D1D5DB",
                  borderRadius: 6,
                  fontSize: "0.78rem",
                  fontWeight: 600,
                  color: "#374151",
                  cursor: "pointer",
                }}
              >
                ← New search
              </button>
            </div>
            <RecommendationReport data={result} mode="search" />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

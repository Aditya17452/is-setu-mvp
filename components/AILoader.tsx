"use client";

import { motion } from "framer-motion";
import { CheckCircle2, Loader2, Circle } from "lucide-react";
import { useEffect, useState } from "react";

export interface LoadingStep {
  label: string;
  duration: number; // ms
}

interface AILoaderProps {
  steps: LoadingStep[];
  onComplete: () => void;
  title?: string;
}

export default function AILoader({ steps, onComplete, title = "Analyzing…" }: AILoaderProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [doneSteps, setDoneSteps] = useState<number[]>([]);

  useEffect(() => {
    let stepIndex = 0;

    const advance = () => {
      if (stepIndex >= steps.length) {
        setTimeout(onComplete, 400);
        return;
      }

      setCurrentStep(stepIndex);

      const timer = setTimeout(() => {
        setDoneSteps((prev) => [...prev, stepIndex]);
        stepIndex++;
        advance();
      }, steps[stepIndex].duration);

      return () => clearTimeout(timer);
    };

    advance();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const overallProgress = (doneSteps.length / steps.length) * 100;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      style={{
        background: "white",
        borderRadius: 16,
        padding: "40px 48px",
        boxShadow: "0 8px 40px rgba(30,58,95,0.12)",
        border: "1px solid #E5E7EB",
        maxWidth: 560,
        width: "100%",
        margin: "0 auto",
      }}
    >
      {/* Header */}
      <div style={{ textAlign: "center", marginBottom: 32 }}>
        <div
          style={{
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
            width: 56,
            height: 56,
            borderRadius: "50%",
            background: "linear-gradient(135deg, #1E3A5F 0%, #2B5286 100%)",
            marginBottom: 16,
            boxShadow: "0 4px 14px rgba(30,58,95,0.3)",
          }}
        >
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
          >
            <Loader2 size={26} color="white" />
          </motion.div>
        </div>
        <h3
          style={{
            fontSize: "1.15rem",
            fontWeight: 700,
            color: "#1E3A5F",
            marginBottom: 6,
          }}
        >
          {title}
        </h3>
        <p style={{ fontSize: "0.8rem", color: "#6B7280" }}>
          IS-Setu AI pipeline processing your request
        </p>
      </div>

      {/* Progress bar */}
      <div
        style={{
          background: "#E5E7EB",
          borderRadius: 9999,
          height: 6,
          marginBottom: 28,
          overflow: "hidden",
        }}
      >
        <motion.div
          style={{
            height: "100%",
            background: "linear-gradient(90deg, #1E3A5F 0%, #C9A227 100%)",
            borderRadius: 9999,
          }}
          initial={{ width: "0%" }}
          animate={{ width: `${overallProgress}%` }}
          transition={{ duration: 0.4, ease: "easeOut" }}
        />
      </div>

      {/* Steps */}
      <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
        {steps.map((step, idx) => {
          const isDone = doneSteps.includes(idx);
          const isActive = currentStep === idx && !isDone;

          return (
            <motion.div
              key={idx}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: idx * 0.05 }}
              className={`loading-step ${isDone ? "done" : isActive ? "active" : ""}`}
            >
              <div style={{ flexShrink: 0, width: 22 }}>
                {isDone ? (
                  <CheckCircle2 size={18} color="#16A34A" />
                ) : isActive ? (
                  <motion.div
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 0.8, repeat: Infinity }}
                  >
                    <Loader2
                      size={18}
                      color="#1E3A5F"
                      style={{
                        animation: "spin 1s linear infinite",
                      }}
                    />
                  </motion.div>
                ) : (
                  <Circle size={18} color="#D1D5DB" />
                )}
              </div>
              <span style={{ fontWeight: isActive ? 600 : isDone ? 500 : 400 }}>
                {step.label}
              </span>
            </motion.div>
          );
        })}
      </div>

      <p
        style={{
          marginTop: 24,
          fontSize: "0.72rem",
          color: "#9CA3AF",
          textAlign: "center",
        }}
      >
        Cross-referencing 23,613 standards — building your evidence trail
      </p>
    </motion.div>
  );
}

// Predefined step sets
export const SEARCH_STEPS: LoadingStep[] = [
  { label: "Understanding product requirements", duration: 600 },
  { label: "Searching 23,613 standards", duration: 700 },
  { label: "Mapping allied standards", duration: 600 },
  { label: "Checking certification requirements", duration: 500 },
  { label: "Verifying version & amendments", duration: 500 },
];

export const TENDER_STEPS: LoadingStep[] = [
  { label: "Extracting text from document", duration: 700 },
  { label: "Detecting technical specifications", duration: 600 },
  { label: "Cross-checking referenced standards", duration: 700 },
  { label: "Identifying outdated references", duration: 600 },
  { label: "Identifying specification gaps", duration: 500 },
];

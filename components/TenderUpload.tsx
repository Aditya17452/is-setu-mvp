"use client";

import { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import { motion, AnimatePresence } from "framer-motion";
import { Upload, File, CheckCircle2, Loader2 } from "lucide-react";
import AILoader, { TENDER_STEPS } from "./AILoader";
import TenderAuditReportView from "./TenderAuditReport";
import { tenderAuditReport } from "@/lib/demoData";

export default function TenderUpload() {
  const [phase, setPhase] = useState<"idle" | "uploaded" | "loading" | "done">("idle");
  const [fileName, setFileName] = useState<string>("");

  const onDrop = useCallback((acceptedFiles: File[]) => {
    if (acceptedFiles.length === 0) return;
    const file = acceptedFiles[0];
    setFileName(file.name);
    setPhase("uploaded");

    // Short pause then loading
    setTimeout(() => {
      setPhase("loading");
    }, 800);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "application/pdf": [".pdf"],
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document": [".docx"],
      "application/msword": [".doc"],
    },
    multiple: false,
    maxSize: 50 * 1024 * 1024, // 50MB
  });

  const handleReset = () => {
    setPhase("idle");
    setFileName("");
  };

  return (
    <div>
      <AnimatePresence mode="wait">
        {phase === "idle" && (
          <motion.div
            key="dropzone"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div
              {...getRootProps()}
              className={`dropzone ${isDragActive ? "active" : ""}`}
              style={{
                border: isDragActive
                  ? "2px dashed #2B5286"
                  : "2px dashed #D1D5DB",
                borderRadius: 14,
                padding: "56px 32px",
                textAlign: "center",
                cursor: "pointer",
                transition: "all 0.2s ease",
                background: isDragActive ? "#EFF6FF" : "#FAFAFA",
              }}
            >
              <input {...getInputProps()} />
              <div
                style={{
                  width: 64,
                  height: 64,
                  borderRadius: "50%",
                  background: isDragActive
                    ? "linear-gradient(135deg, #1E3A5F, #2B5286)"
                    : "#F3F4F6",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  margin: "0 auto 20px",
                  transition: "all 0.2s",
                  boxShadow: isDragActive
                    ? "0 4px 14px rgba(30,58,95,0.3)"
                    : "none",
                }}
              >
                <Upload
                  size={28}
                  color={isDragActive ? "#C9A227" : "#9CA3AF"}
                />
              </div>
              {isDragActive ? (
                <p style={{ fontSize: "1rem", fontWeight: 700, color: "#1E3A5F" }}>
                  Drop to analyze…
                </p>
              ) : (
                <>
                  <p
                    style={{
                      fontSize: "1rem",
                      fontWeight: 700,
                      color: "#374151",
                      marginBottom: 6,
                    }}
                  >
                    Drop tender document here
                  </p>
                  <p style={{ fontSize: "0.85rem", color: "#6B7280", marginBottom: 16 }}>
                    PDF, DOCX — up to 50MB
                  </p>
                  <button
                    style={{
                      padding: "8px 20px",
                      background: "#1E3A5F",
                      color: "white",
                      border: "none",
                      borderRadius: 6,
                      fontSize: "0.85rem",
                      fontWeight: 600,
                      cursor: "pointer",
                    }}
                  >
                    Browse files
                  </button>
                </>
              )}
            </div>

            {/* Demo hint */}
            <div
              style={{
                marginTop: 16,
                padding: "12px 16px",
                background: "#FFFBEB",
                border: "1px solid #FCD34D",
                borderRadius: 8,
                display: "flex",
                alignItems: "flex-start",
                gap: 8,
              }}
            >
              <span style={{ fontSize: "1rem" }}>💡</span>
              <div>
                <span
                  style={{
                    fontSize: "0.78rem",
                    fontWeight: 600,
                    color: "#92400E",
                  }}
                >
                  Demo mode:{" "}
                </span>
                <span style={{ fontSize: "0.78rem", color: "#78350F" }}>
                  Upload any PDF or DOCX file. IS-Setu will simulate analyzing a CPWD
                  electrical hostel tender (XLPE cables, LED luminaires, water heaters) — a
                  realistic multi-item procurement scenario.
                </span>
              </div>
            </div>
          </motion.div>
        )}

        {phase === "uploaded" && (
          <motion.div
            key="uploaded"
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 16,
              padding: "40px",
              background: "white",
              borderRadius: 14,
              border: "1px solid #E5E7EB",
            }}
          >
            <div
              style={{
                width: 56,
                height: 56,
                borderRadius: "50%",
                background: "#F0FDF4",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                border: "2px solid #86EFAC",
              }}
            >
              <File size={24} color="#16A34A" />
            </div>
            <div style={{ textAlign: "center" }}>
              <p style={{ fontWeight: 700, color: "#1E3A5F", marginBottom: 4 }}>
                {fileName}
              </p>
              <p style={{ fontSize: "0.8rem", color: "#6B7280" }}>
                File received — starting analysis…
              </p>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <motion.div animate={{ rotate: 360 }} transition={{ duration: 1, repeat: Infinity, ease: "linear" }}>
                <Loader2 size={16} color="#1E3A5F" />
              </motion.div>
              <span style={{ fontSize: "0.8rem", color: "#6B7280" }}>Initializing pipeline…</span>
            </div>
          </motion.div>
        )}

        {phase === "loading" && (
          <motion.div key="loading" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <AILoader
              steps={TENDER_STEPS}
              onComplete={() => setPhase("done")}
              title="Auditing Tender Document…"
            />
          </motion.div>
        )}

        {phase === "done" && (
          <motion.div key="done" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
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
                  Analysis complete — {tenderAuditReport.tenderRef}
                </span>
              </div>
              <button
                onClick={handleReset}
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
                ← Upload another
              </button>
            </div>
            <TenderAuditReportView data={tenderAuditReport} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

"use client";

import { motion, AnimatePresence } from "framer-motion";
import {
  CheckCircle2,
  AlertTriangle,
  XCircle,
  ChevronDown,
  FileText,
  ShieldCheck,
  AlertCircle,
} from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import type { TenderAuditReport, TenderLineItem } from "@/lib/demoData";
import RecommendationReport from "./RecommendationReport";
import type { StandardRecommendation } from "@/lib/demoData";

interface TenderReportProps {
  data: TenderAuditReport;
}

function StatusIcon({ status }: { status: TenderLineItem["status"] }) {
  if (status === "compliant")
    return <CheckCircle2 size={20} color="#16A34A" />;
  if (status === "outdated")
    return <AlertTriangle size={20} color="#D97706" />;
  return <XCircle size={20} color="#DC2626" />;
}

function StatusBadge({ status }: { status: TenderLineItem["status"] }) {
  if (status === "compliant")
    return <span className="badge-compliant">✅ Compliant</span>;
  if (status === "outdated")
    return <span className="badge-outdated">⚠️ Outdated Reference</span>;
  return <span className="badge-missing">❌ Missing IS Reference</span>;
}

function TenderLineCard({ item, index }: { item: TenderLineItem; index: number }) {
  const [expanded, setExpanded] = useState(false);

  const borderColor =
    item.status === "compliant"
      ? "#86EFAC"
      : item.status === "outdated"
      ? "#FCD34D"
      : "#FCA5A5";

  const bgColor =
    item.status === "compliant"
      ? "#F0FDF4"
      : item.status === "outdated"
      ? "#FFFBEB"
      : "#FEF2F2";

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      style={{
        border: `1px solid ${borderColor}`,
        borderLeft: `4px solid ${borderColor}`,
        borderRadius: 10,
        overflow: "hidden",
        background: "white",
        boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
      }}
    >
      {/* Line item header */}
      <div
        style={{
          padding: "18px 22px",
          background: bgColor,
          display: "flex",
          alignItems: "flex-start",
          justifyContent: "space-between",
          gap: 12,
          flexWrap: "wrap",
        }}
      >
        <div style={{ display: "flex", alignItems: "flex-start", gap: 12, flex: 1 }}>
          <StatusIcon status={item.status} />
          <div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 10,
                flexWrap: "wrap",
                marginBottom: 4,
              }}
            >
              <span
                style={{
                  fontSize: "0.72rem",
                  fontWeight: 700,
                  color: "#6B7280",
                  letterSpacing: "0.05em",
                }}
              >
                ITEM {item.itemNo}
              </span>
              <StatusBadge status={item.status} />
            </div>
            <h3
              style={{ fontSize: "0.95rem", fontWeight: 700, color: "#1E3A5F", marginBottom: 4 }}
            >
              {item.itemName}
            </h3>
            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 6,
                padding: "4px 10px",
                background: "rgba(0,0,0,0.05)",
                borderRadius: 4,
                fontFamily: "monospace",
                fontSize: "0.78rem",
                color: "#374151",
              }}
            >
              <FileText size={12} color="#6B7280" />
              <em>Tender says: &ldquo;{item.tenderText}&rdquo;</em>
            </div>
          </div>
        </div>
        <button
          onClick={() => setExpanded(!expanded)}
          style={{
            display: "flex",
            alignItems: "center",
            gap: 6,
            padding: "6px 14px",
            background: "white",
            border: "1px solid #D1D5DB",
            borderRadius: 6,
            fontSize: "0.78rem",
            fontWeight: 600,
            color: "#1E3A5F",
            cursor: "pointer",
          }}
        >
          <span>Details</span>
          <motion.div animate={{ rotate: expanded ? 180 : 0 }} transition={{ duration: 0.2 }}>
            <ChevronDown size={14} />
          </motion.div>
        </button>
      </div>

      {/* Finding bar */}
      <div
        style={{
          padding: "10px 22px",
          borderBottom: "1px solid #E5E7EB",
          background: "white",
          display: "flex",
          alignItems: "flex-start",
          gap: 8,
        }}
      >
        <AlertCircle size={14} color="#6B7280" style={{ marginTop: 2, flexShrink: 0 }} />
        <span style={{ fontSize: "0.82rem", color: "#4B5563", lineHeight: 1.5 }}>
          <strong>Finding: </strong>
          {item.finding}
        </span>
      </div>

      {/* Missing allied standards */}
      {item.missingAllied && item.missingAllied.length > 0 && (
        <div
          style={{
            padding: "10px 22px",
            background: "#FFFBEB",
            borderBottom: "1px solid #E5E7EB",
            display: "flex",
            alignItems: "center",
            gap: 8,
          }}
        >
          <AlertTriangle size={14} color="#D97706" />
          <span style={{ fontSize: "0.78rem", color: "#92400E" }}>
            <strong>Missing allied standards: </strong>
            {item.missingAllied.join(" · ")}
          </span>
        </div>
      )}

      {/* Certification */}
      <div
        style={{
          padding: "10px 22px",
          background: item.certification.scheme === "CRS" ? "#EFF6FF" : "#FFFBEB",
          borderBottom: "1px solid #E5E7EB",
          display: "flex",
          alignItems: "center",
          gap: 8,
        }}
      >
        <ShieldCheck
          size={14}
          color={item.certification.scheme === "CRS" ? "#1D4ED8" : "#D97706"}
        />
        <span style={{ fontSize: "0.78rem", color: "#374151" }}>
          <strong>Certification: </strong>
          {item.certification.required
            ? `${item.certification.scheme} mandatory — ${item.certification.qcoName}`
            : "No mandatory certification"}
        </span>
      </div>

      {/* Expanded detail: full recommendation */}
      <AnimatePresence>
        {expanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div style={{ padding: "24px 22px", background: "#FAFBFF" }}>
              <RecommendationReport
                data={item.recommendation as StandardRecommendation}
                mode="tender"
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default function TenderAuditReportView({ data }: TenderReportProps) {
  const handleExport = () => {
    toast("📄 Audit report export queued", {
      description: "PDF report generation would be triggered in production mode.",
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      style={{ display: "flex", flexDirection: "column", gap: 20 }}
    >
      {/* Report header */}
      <div
        style={{
          background: "linear-gradient(135deg, #1E3A5F 0%, #2B5286 100%)",
          borderRadius: 14,
          padding: "28px 32px",
          color: "white",
        }}
      >
        <div className="section-label" style={{ color: "rgba(255,255,255,0.6)", marginBottom: 8 }}>
          Tender Compliance Audit Report
        </div>
        <h2 style={{ fontSize: "1.2rem", fontWeight: 700, marginBottom: 4 }}>
          {data.tenderTitle}
        </h2>
        <p style={{ fontSize: "0.78rem", color: "rgba(255,255,255,0.6)", marginBottom: 20 }}>
          Document: {data.tenderRef} · Analyzed: {new Date(data.analyzedDate).toLocaleDateString("en-IN", { year: "numeric", month: "long", day: "numeric" })}
        </p>

        {/* Summary stats */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(140px, 1fr))",
            gap: 12,
          }}
        >
          {[
            { label: "Items Analyzed", value: data.totalItems, color: "white" },
            { label: "Outdated References", value: data.outdatedCount, color: "#FCD34D" },
            { label: "Missing References", value: data.missingCount, color: "#FCA5A5" },
            { label: "Fully Compliant", value: data.compliantCount, color: "#86EFAC" },
          ].map((stat) => (
            <div
              key={stat.label}
              style={{
                background: "rgba(255,255,255,0.1)",
                borderRadius: 8,
                padding: "12px 16px",
                backdropFilter: "blur(4px)",
              }}
            >
              <div
                style={{
                  fontSize: "1.8rem",
                  fontWeight: 800,
                  color: stat.color,
                  lineHeight: 1,
                }}
              >
                {stat.value}
              </div>
              <div style={{ fontSize: "0.72rem", color: "rgba(255,255,255,0.65)", marginTop: 4 }}>
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Summary bar */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "12px 20px",
          background: "white",
          border: "1px solid #E5E7EB",
          borderRadius: 10,
          flexWrap: "wrap",
          gap: 10,
        }}
      >
        <span style={{ fontSize: "0.82rem", color: "#4B5563" }}>
          <strong>{data.totalItems} items analyzed</strong> —{" "}
          <span style={{ color: "#D97706" }}>
            {data.outdatedCount} outdated standard{data.outdatedCount !== 1 ? "s" : ""}
          </span>{" "}
          ·{" "}
          <span style={{ color: "#DC2626" }}>
            {data.missingCount} missing reference{data.missingCount !== 1 ? "s" : ""}
          </span>{" "}
          ·{" "}
          <span style={{ color: "#16A34A" }}>
            {data.compliantCount} fully compliant
          </span>
        </span>
        <button
          onClick={handleExport}
          style={{
            padding: "6px 14px",
            background: "#1E3A5F",
            color: "white",
            border: "none",
            borderRadius: 6,
            fontSize: "0.78rem",
            fontWeight: 600,
            cursor: "pointer",
          }}
        >
          Export PDF Report
        </button>
      </div>

      {/* Line items */}
      <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
        {data.lineItems.map((item, idx) => (
          <TenderLineCard key={item.itemNo} item={item} index={idx} />
        ))}
      </div>
    </motion.div>
  );
}

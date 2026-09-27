"use client";

import { motion, AnimatePresence } from "framer-motion";
import {
  CheckCircle2,
  AlertTriangle,
  ChevronDown,
  BookOpen,
  ShieldCheck,
  FlaskConical,
  Info,
  Award,
  ClipboardList,
  Lightbulb,
  FileText,
  ThumbsUp,
  ThumbsDown,
  Edit3,
  History,
  AlertCircle,
} from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import type { StandardRecommendation, AlliedCategory } from "@/lib/demoData";

interface ReportProps {
  data: StandardRecommendation;
  mode?: "search" | "tender";
}

const CATEGORY_ICONS: Record<AlliedCategory, React.ReactNode> = {
  "Test Methods": <FlaskConical size={14} />,
  Safety: <ShieldCheck size={14} />,
  Installation: <BookOpen size={14} />,
  Terminology: <Info size={14} />,
  "Chemical Analysis": <FlaskConical size={14} />,
  Sampling: <ClipboardList size={14} />,
  Application: <Lightbulb size={14} />,
  Conductor: <FileText size={14} />,
};

const CATEGORY_CSS: Record<AlliedCategory, string> = {
  "Test Methods": "cat-test",
  Safety: "cat-safety",
  Installation: "cat-installation",
  Terminology: "cat-terminology",
  "Chemical Analysis": "cat-chemical",
  Sampling: "cat-sampling",
  Application: "cat-application",
  Conductor: "cat-conductor",
};

function ConfidenceRing({ value }: { value: number }) {
  const radius = 44;
  const circumference = 2 * Math.PI * radius;
  const strokeDash = (value / 100) * circumference;
  const color = value >= 90 ? "#16A34A" : value >= 75 ? "#D97706" : "#DC2626";

  return (
    <div
      style={{
        position: "relative",
        width: 110,
        height: 110,
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <svg width={110} height={110} style={{ transform: "rotate(-90deg)", position: "absolute" }}>
        <circle cx={55} cy={55} r={radius} fill="none" stroke="#E5E7EB" strokeWidth={8} />
        <motion.circle
          cx={55}
          cy={55}
          r={radius}
          fill="none"
          stroke={color}
          strokeWidth={8}
          strokeDasharray={circumference}
          initial={{ strokeDashoffset: circumference }}
          animate={{ strokeDashoffset: circumference - strokeDash }}
          transition={{ duration: 1.2, ease: "easeOut", delay: 0.3 }}
          strokeLinecap="round"
        />
      </svg>
      <div style={{ textAlign: "center", zIndex: 1 }}>
        <div
          style={{ fontSize: "1.5rem", fontWeight: 800, color, lineHeight: 1 }}
        >
          {value}%
        </div>
        <div style={{ fontSize: "0.6rem", color: "#6B7280", fontWeight: 600, marginTop: 2 }}>
          MATCH
        </div>
      </div>
    </div>
  );
}

function Accordion({
  title,
  icon,
  children,
  defaultOpen = false,
}: {
  title: string;
  icon?: React.ReactNode;
  children: React.ReactNode;
  defaultOpen?: boolean;
}) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div style={{ border: "1px solid #E5E7EB", borderRadius: 8, overflow: "hidden" }}>
      <button
        onClick={() => setOpen(!open)}
        style={{
          width: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "12px 16px",
          background: open ? "#F0F4FF" : "white",
          border: "none",
          cursor: "pointer",
          fontSize: "0.85rem",
          fontWeight: 600,
          color: "#1E3A5F",
          transition: "background 0.2s",
        }}
      >
        <span style={{ display: "flex", alignItems: "center", gap: 8 }}>
          {icon}
          {title}
        </span>
        <motion.div animate={{ rotate: open ? 180 : 0 }} transition={{ duration: 0.2 }}>
          <ChevronDown size={16} color="#6B7280" />
        </motion.div>
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25 }}
          >
            <div className="accordion-content" style={{ padding: "14px 16px" }}>
              {children}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function RecommendationReport({ data, mode = "search" }: ReportProps) {
  const handleAction = (action: string) => {
    toast(`${action} — Logged to audit trail`, {
      description: `Action recorded for IS ${data.primaryStandard.isNumber} at ${new Date().toLocaleTimeString("en-IN")}`,
      duration: 3500,
    });
  };

  const alliedByCategory: Record<string, typeof data.alliedStandards> = {};
  data.alliedStandards.forEach((s) => {
    if (!alliedByCategory[s.category]) alliedByCategory[s.category] = [];
    alliedByCategory[s.category].push(s);
  });

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      style={{ display: "flex", flexDirection: "column", gap: 20 }}
    >
      {/* ── HEADER CARD ── */}
      <div
        className="primary-card-border"
        style={{
          padding: "28px 32px",
          background:
            "linear-gradient(135deg, #F8FAFF 0%, #FFFFFF 60%)",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "flex-start",
            justifyContent: "space-between",
            flexWrap: "wrap",
            gap: 20,
          }}
        >
          <div style={{ flex: 1, minWidth: 280 }}>
            <div className="section-label" style={{ marginBottom: 8 }}>
              Recommendation Report
            </div>
            <h2
              style={{
                fontSize: "1.25rem",
                fontWeight: 700,
                color: "#1E3A5F",
                marginBottom: 8,
                lineHeight: 1.3,
              }}
            >
              {data.queryDescription}
            </h2>
            <p style={{ fontSize: "0.875rem", color: "#4B5563", lineHeight: 1.6 }}>
              {data.summary}
            </p>
          </div>
          <ConfidenceRing value={data.confidence} />
        </div>
      </div>

      {/* ── PRIMARY STANDARD ── */}
      <div className="card" style={{ padding: "24px 28px" }}>
        <div className="section-label" style={{ marginBottom: 14 }}>
          Primary Standard
        </div>
        <div
          style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 16, flexWrap: "wrap" }}
        >
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: 10, flexWrap: "wrap", marginBottom: 6 }}>
              <span
                style={{
                  fontSize: "1.4rem",
                  fontWeight: 800,
                  color: "#1E3A5F",
                  fontFamily: "monospace",
                }}
              >
                {data.primaryStandard.isNumber}
              </span>
              <span className="badge-active">{data.primaryStandard.status}</span>
            </div>
            <p style={{ fontSize: "0.95rem", fontWeight: 600, color: "#374151", marginBottom: 4 }}>
              {data.primaryStandard.title}
            </p>
            {data.primaryStandard.clause && (
              <p style={{ fontSize: "0.75rem", color: "#6B7280" }}>
                Matched via: <strong>{data.primaryStandard.clause}</strong>
              </p>
            )}
          </div>
          <Award size={32} color="#C9A227" style={{ flexShrink: 0 }} />
        </div>

        <div style={{ marginTop: 16 }}>
          <Accordion
            title="View scope match reasoning"
            icon={<BookOpen size={15} />}
            defaultOpen
          >
            {data.primaryStandard.scopeMatchReasoning}
          </Accordion>
        </div>
      </div>

      {/* ── ALLIED STANDARDS ── */}
      {data.alliedStandards.length > 0 && (
        <div className="card" style={{ padding: "24px 28px" }}>
          <div className="section-label" style={{ marginBottom: 6 }}>
            Allied &amp; Normative Standards
          </div>
          <p style={{ fontSize: "0.8rem", color: "#6B7280", marginBottom: 18 }}>
            Standards referenced normatively in the primary standard — mandatory for full compliance
          </p>

          {Object.entries(alliedByCategory).map(([category, standards]) => (
            <div key={category} style={{ marginBottom: 16 }}>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 6,
                  marginBottom: 10,
                }}
              >
                <span
                  className={`${CATEGORY_CSS[category as AlliedCategory] ?? "cat-test"}`}
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: 4,
                    padding: "3px 10px",
                    borderRadius: 9999,
                    fontSize: "0.72rem",
                    fontWeight: 700,
                    border: "1px solid currentColor",
                  }}
                >
                  {CATEGORY_ICONS[category as AlliedCategory]}
                  {category}
                </span>
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                {standards.map((s) => (
                  <motion.div
                    key={s.isNumber}
                    initial={{ opacity: 0, x: -6 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="hover-lift"
                    style={{
                      border: "1px solid #E5E7EB",
                      borderRadius: 8,
                      padding: "12px 16px",
                      background: "#FAFBFF",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        alignItems: "flex-start",
                        justifyContent: "space-between",
                        gap: 8,
                      }}
                    >
                      <div>
                        <span
                          style={{
                            fontWeight: 700,
                            color: "#1E3A5F",
                            fontSize: "0.85rem",
                            fontFamily: "monospace",
                          }}
                        >
                          {s.isNumber}
                        </span>
                        <p style={{ fontSize: "0.82rem", color: "#374151", marginTop: 2 }}>
                          {s.title}
                        </p>
                        <p
                          style={{
                            fontSize: "0.75rem",
                            color: "#6B7280",
                            marginTop: 4,
                            fontStyle: "italic",
                          }}
                        >
                          {s.connection}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* ── VERSION & AMENDMENT ── */}
      <div className="card" style={{ padding: "24px 28px" }}>
        <div className="section-label" style={{ marginBottom: 14 }}>
          Version &amp; Amendment Status
        </div>

        {data.versionInfo.isOutdated && data.versionInfo.outdatedDetails ? (
          <div>
            {/* Before/After */}
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr auto 1fr",
                gap: 12,
                alignItems: "center",
                marginBottom: 16,
              }}
            >
              <div
                style={{
                  border: "2px solid #FCA5A5",
                  borderRadius: 10,
                  padding: "16px 20px",
                  background: "#FEF2F2",
                }}
              >
                <div style={{ marginBottom: 6 }}>
                  <span className="badge-outdated">
                    {data.versionInfo.outdatedDetails.outdatedBadge}
                  </span>
                </div>
                <div
                  style={{
                    fontFamily: "monospace",
                    fontWeight: 700,
                    color: "#DC2626",
                    fontSize: "0.9rem",
                  }}
                >
                  {data.versionInfo.outdatedDetails.referencedVersion}
                </div>
                <div style={{ fontSize: "0.72rem", color: "#9CA3AF", marginTop: 4 }}>
                  Referenced in tender document
                </div>
              </div>

              <div style={{ textAlign: "center", color: "#6B7280", fontSize: "1.2rem" }}>→</div>

              <div
                style={{
                  border: "2px solid #86EFAC",
                  borderRadius: 10,
                  padding: "16px 20px",
                  background: "#F0FDF4",
                }}
              >
                <div style={{ marginBottom: 6 }}>
                  <span className="badge-compliant">
                    {data.versionInfo.outdatedDetails.recommendedBadge}
                  </span>
                </div>
                <div
                  style={{
                    fontFamily: "monospace",
                    fontWeight: 700,
                    color: "#16A34A",
                    fontSize: "0.9rem",
                  }}
                >
                  {data.versionInfo.outdatedDetails.currentVersion}
                </div>
                <div style={{ fontSize: "0.72rem", color: "#9CA3AF", marginTop: 4 }}>
                  Current active edition
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 10,
              padding: "12px 16px",
              background: "#F0FDF4",
              border: "1px solid #86EFAC",
              borderRadius: 8,
              marginBottom: 14,
            }}
          >
            <CheckCircle2 size={18} color="#16A34A" />
            <span style={{ fontSize: "0.85rem", color: "#15803D", fontWeight: 600 }}>
              Current edition: {data.primaryStandard.isNumber} — No supersession
            </span>
          </div>
        )}

        {/* Amendments */}
        {data.versionInfo.amendments.length > 0 && (
          <div>
            <div
              style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 8 }}
            >
              <History size={14} color="#6B7280" />
              <span
                style={{ fontSize: "0.75rem", fontWeight: 700, color: "#6B7280", textTransform: "uppercase", letterSpacing: "0.05em" }}
              >
                Applicable Amendments
              </span>
            </div>
            {data.versionInfo.amendments.map((amend) => (
              <div
                key={amend.number}
                style={{
                  padding: "8px 12px",
                  borderLeft: "3px solid #C9A227",
                  background: "#FFFBEB",
                  borderRadius: "0 6px 6px 0",
                  marginBottom: 6,
                }}
              >
                <span
                  style={{
                    fontSize: "0.78rem",
                    fontWeight: 700,
                    color: "#92400E",
                  }}
                >
                  Amendment {amend.number} ({amend.year}):{" "}
                </span>
                <span style={{ fontSize: "0.78rem", color: "#78350F" }}>
                  {amend.description}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* ── CERTIFICATION ── */}
      <div className="card" style={{ padding: "24px 28px" }}>
        <div className="section-label" style={{ marginBottom: 14 }}>
          Certification Requirement
        </div>
        {data.certification.required ? (
          <div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 12,
                padding: "14px 18px",
                background:
                  data.certification.scheme === "CRS"
                    ? "#EFF6FF"
                    : "#FFFBEB",
                border: `1px solid ${data.certification.scheme === "CRS" ? "#BFDBFE" : "#FCD34D"}`,
                borderRadius: 8,
                marginBottom: 14,
              }}
            >
              <AlertTriangle
                size={20}
                color={data.certification.scheme === "CRS" ? "#1D4ED8" : "#D97706"}
              />
              <div>
                <div
                  style={{
                    fontSize: "0.9rem",
                    fontWeight: 700,
                    color: data.certification.scheme === "CRS" ? "#1E40AF" : "#92400E",
                  }}
                >
                  {data.certification.scheme === "CRS"
                    ? "⚠️ Compulsory Registration Scheme (CRS) Mandatory"
                    : "⚠️ Mandatory BIS ISI Mark Certification Required"}
                </div>
                <div style={{ fontSize: "0.78rem", color: "#6B7280", marginTop: 2 }}>
                  {data.certification.qcoName}
                </div>
              </div>
            </div>
            {data.certification.note && (
              <p style={{ fontSize: "0.8rem", color: "#4B5563", lineHeight: 1.6 }}>
                {data.certification.note}
              </p>
            )}
          </div>
        ) : (
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 10,
              padding: "12px 16px",
              background: "#F0FDF4",
              border: "1px solid #86EFAC",
              borderRadius: 8,
            }}
          >
            <CheckCircle2 size={18} color="#16A34A" />
            <span style={{ fontSize: "0.85rem", color: "#15803D" }}>
              No mandatory certification requirement for this product category
            </span>
          </div>
        )}
      </div>

      {/* ── REASONING ACCORDION ── */}
      {data.reasoning && data.reasoning.length > 0 && (
        <div className="card" style={{ padding: "24px 28px" }}>
          <div className="section-label" style={{ marginBottom: 14 }}>
            AI Reasoning &amp; Evidence Trail
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            {data.reasoning.map((step, idx) => (
              <Accordion
                key={idx}
                title={`${idx + 1}. ${step.step}`}
                icon={<BookOpen size={14} />}
              >
                {step.detail}
              </Accordion>
            ))}
          </div>
        </div>
      )}

      {/* ── ACTION BAR ── */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          flexWrap: "wrap",
          gap: 12,
          padding: "18px 24px",
          background: "white",
          borderRadius: 12,
          border: "1px solid #E5E7EB",
          boxShadow: "0 2px 8px rgba(0,0,0,0.04)",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <AlertCircle size={15} color="#6B7280" />
          <span style={{ fontSize: "0.78rem", color: "#6B7280" }}>
            Human-in-the-loop: Review AI recommendation before procurement
          </span>
        </div>
        <div style={{ display: "flex", gap: 8 }}>
          <button
            onClick={() => handleAction("✅ Accepted")}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 6,
              padding: "8px 16px",
              background: "#16A34A",
              color: "white",
              border: "none",
              borderRadius: 6,
              fontSize: "0.82rem",
              fontWeight: 600,
              cursor: "pointer",
            }}
          >
            <ThumbsUp size={14} /> Accept
          </button>
          <button
            onClick={() => handleAction("✏️ Edit Requested")}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 6,
              padding: "8px 16px",
              background: "white",
              color: "#1E3A5F",
              border: "1px solid #1E3A5F",
              borderRadius: 6,
              fontSize: "0.82rem",
              fontWeight: 600,
              cursor: "pointer",
            }}
          >
            <Edit3 size={14} /> Edit
          </button>
          <button
            onClick={() => handleAction("❌ Rejected")}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 6,
              padding: "8px 16px",
              background: "white",
              color: "#DC2626",
              border: "1px solid #FCA5A5",
              borderRadius: 6,
              fontSize: "0.82rem",
              fontWeight: 600,
              cursor: "pointer",
            }}
          >
            <ThumbsDown size={14} /> Reject
          </button>
        </div>
      </div>
    </motion.div>
  );
}

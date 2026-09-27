"use client";

import { motion } from "framer-motion";
import {
  Search,
  ArrowRight,
  Brain,
  Network,
  GitBranch,
  RefreshCw,
  Shield,
  FileCheck,
  Database,
} from "lucide-react";

const PIPELINE_STEPS = [
  {
    icon: <Search size={22} color="#C9A227" />,
    label: "Input",
    sublabel: "Product query or\ntender document",
    color: "#1E3A5F",
  },
  {
    icon: <Brain size={22} color="#C9A227" />,
    label: "Understanding",
    sublabel: "NLP: extract product type,\ncapacity, use-case",
    color: "#2B5286",
  },
  {
    icon: <Database size={22} color="#C9A227" />,
    label: "Hybrid Search",
    sublabel: "Keyword + semantic\nvector search",
    color: "#1E3A5F",
  },
  {
    icon: <Network size={22} color="#C9A227" />,
    label: "Relationship Graph",
    sublabel: "Allied & normative\nstandards mapping",
    color: "#2B5286",
  },
  {
    icon: <RefreshCw size={22} color="#C9A227" />,
    label: "Version Check",
    sublabel: "Current edition &\namendment verification",
    color: "#1E3A5F",
  },
  {
    icon: <Shield size={22} color="#C9A227" />,
    label: "Cert. Check",
    sublabel: "QCO / ISI Mark /\nCRS requirement lookup",
    color: "#2B5286",
  },
  {
    icon: <FileCheck size={22} color="#C9A227" />,
    label: "Report",
    sublabel: "Evidence-based\nrecommendation",
    color: "#1E3A5F",
  },
];

export default function HowItWorks() {
  return (
    <section
      id="how-it-works"
      style={{
        background: "white",
        borderRadius: 16,
        padding: "40px 40px 48px",
        border: "1px solid #E5E7EB",
        boxShadow: "0 2px 12px rgba(0,0,0,0.06)",
      }}
    >
      <div style={{ textAlign: "center", marginBottom: 40 }}>
        <div className="section-label" style={{ marginBottom: 10 }}>
          Technology
        </div>
        <h2
          style={{
            fontSize: "1.6rem",
            fontWeight: 800,
            color: "#1E3A5F",
            marginBottom: 10,
          }}
        >
          How IS-Setu Works
        </h2>
        <div className="gold-divider" style={{ margin: "0 auto 16px" }} />
        <p
          style={{
            maxWidth: 560,
            margin: "0 auto",
            fontSize: "0.9rem",
            color: "#4B5563",
            lineHeight: 1.6,
          }}
        >
          A 6-stage AI pipeline that goes from your product description to a fully
          evidence-traced standards recommendation in under 3 seconds.
        </p>
      </div>

      {/* Pipeline diagram */}
      <div
        style={{
          display: "flex",
          alignItems: "flex-start",
          justifyContent: "center",
          flexWrap: "wrap",
          gap: 0,
          overflowX: "auto",
        }}
      >
        {PIPELINE_STEPS.map((step, idx) => (
          <div
            key={idx}
            style={{ display: "flex", alignItems: "center" }}
          >
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.08 }}
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: 10,
                width: 110,
                textAlign: "center",
              }}
            >
              {/* Icon circle */}
              <div
                style={{
                  width: 56,
                  height: 56,
                  borderRadius: "50%",
                  background: `linear-gradient(135deg, ${step.color} 0%, ${step.color}CC 100%)`,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  boxShadow: "0 4px 12px rgba(30,58,95,0.25)",
                  transition: "transform 0.2s",
                }}
                className="hover-lift"
              >
                {step.icon}
              </div>

              {/* Step number */}
              <div
                style={{
                  fontSize: "0.62rem",
                  fontWeight: 700,
                  color: "#9CA3AF",
                  letterSpacing: "0.08em",
                }}
              >
                STEP {idx + 1}
              </div>

              {/* Label */}
              <div
                style={{
                  fontSize: "0.8rem",
                  fontWeight: 700,
                  color: "#1E3A5F",
                }}
              >
                {step.label}
              </div>

              {/* Sub-label */}
              <div
                style={{
                  fontSize: "0.68rem",
                  color: "#6B7280",
                  lineHeight: 1.4,
                  whiteSpace: "pre-line",
                }}
              >
                {step.sublabel}
              </div>
            </motion.div>

            {/* Arrow connector */}
            {idx < PIPELINE_STEPS.length - 1 && (
              <div style={{ padding: "0 4px", paddingBottom: 40 }}>
                <ArrowRight size={16} color="#C9A227" />
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Key differentiators */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
          gap: 16,
          marginTop: 40,
          paddingTop: 32,
          borderTop: "1px solid #E5E7EB",
        }}
      >
        {[
          {
            title: "Zero Hallucination Design",
            desc: "Every recommendation is traceable to an actual IS clause or normative reference — never generated from thin air.",
            color: "#16A34A",
          },
          {
            title: "Allied Standards Graph",
            desc: "Automatically surfaces all normatively-linked standards, not just the primary one — ensuring complete compliance.",
            color: "#1E3A5F",
          },
          {
            title: "Live Version Tracking",
            desc: "Continuously checks against BIS portal for supersessions, withdrawals, and new amendments.",
            color: "#D97706",
          },
          {
            title: "QCO / Certification Aware",
            desc: "Cross-references all active Quality Control Orders to flag mandatory BIS certification requirements.",
            color: "#7C3AED",
          },
        ].map((card) => (
          <motion.div
            key={card.title}
            whileInView={{ opacity: 1, y: 0 }}
            initial={{ opacity: 0, y: 10 }}
            viewport={{ once: true }}
            style={{
              padding: "16px 20px",
              background: "#F9FAFB",
              borderRadius: 10,
              border: "1px solid #E5E7EB",
              borderLeft: `3px solid ${card.color}`,
            }}
          >
            <div
              style={{
                fontSize: "0.82rem",
                fontWeight: 700,
                color: card.color,
                marginBottom: 6,
              }}
            >
              {card.title}
            </div>
            <p style={{ fontSize: "0.78rem", color: "#4B5563", lineHeight: 1.5 }}>
              {card.desc}
            </p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

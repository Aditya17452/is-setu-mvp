"use client";

import { useEffect, useState, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { motion } from "framer-motion";
import {
  Search,
  Upload,
  Database,
  Zap,
  ShieldCheck,
  ArrowRight,
  ChevronDown,
  Lock,
} from "lucide-react";
import Header from "@/components/Header";
import QuickSearch from "@/components/QuickSearch";
import TenderUpload from "@/components/TenderUpload";
import HowItWorks from "@/components/HowItWorks";
import { STATS } from "@/lib/demoData";

type Tab = "search" | "upload";

function StatStrip() {
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))",
        gap: 0,
        background: "#132840",
        borderRadius: 12,
        overflow: "hidden",
        border: "1px solid rgba(201,162,39,0.2)",
        marginTop: 40,
      }}
    >
      {STATS.map((stat, idx) => (
        <motion.div
          key={stat.label}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 + idx * 0.08 }}
          style={{
            padding: "22px 24px",
            borderRight:
              idx < STATS.length - 1 ? "1px solid rgba(201,162,39,0.15)" : "none",
          }}
        >
          <div
            style={{
              fontSize: "1.5rem",
              fontWeight: 800,
              color: "#C9A227",
              marginBottom: 4,
              fontFamily: "monospace",
            }}
          >
            {stat.value}
          </div>
          <div
            style={{
              fontSize: "0.72rem",
              color: "rgba(255,255,255,0.55)",
              lineHeight: 1.3,
            }}
          >
            {stat.label}
          </div>
        </motion.div>
      ))}
    </div>
  );
}

function HeroSection({ onSearchClick, onUploadClick }: { onSearchClick: () => void; onUploadClick: () => void }) {
  return (
    <section
      style={{
        background: "linear-gradient(160deg, #132840 0%, #1E3A5F 50%, #2B5286 100%)",
        padding: "72px 0 80px",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Decorative background pattern */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage:
            "radial-gradient(circle at 20% 50%, rgba(201,162,39,0.06) 0%, transparent 60%), radial-gradient(circle at 80% 20%, rgba(43,82,134,0.3) 0%, transparent 50%)",
          pointerEvents: "none",
        }}
      />

      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 24px", position: "relative" }}>
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 6,
            padding: "5px 14px",
            background: "rgba(201,162,39,0.15)",
            border: "1px solid rgba(201,162,39,0.3)",
            borderRadius: 9999,
            fontSize: "0.72rem",
            fontWeight: 600,
            color: "#C9A227",
            letterSpacing: "0.05em",
            marginBottom: 22,
          }}
        >
          <Zap size={12} />
          AI-POWERED · EVIDENCE-BASED · GOVERNMENT-GRADE
        </motion.div>

        {/* Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
          style={{
            fontSize: "clamp(2rem, 4vw, 3.2rem)",
            fontWeight: 800,
            color: "white",
            lineHeight: 1.15,
            maxWidth: 700,
            marginBottom: 20,
            letterSpacing: "-0.02em",
          }}
        >
          Find the right Indian Standard{" "}
          <span
            style={{
              background: "linear-gradient(135deg, #C9A227, #E8C547)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            in seconds
          </span>
          , not hours.
        </motion.h1>

        {/* Sub-headline */}
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          style={{
            fontSize: "1rem",
            color: "rgba(255,255,255,0.72)",
            maxWidth: 580,
            lineHeight: 1.7,
            marginBottom: 40,
          }}
        >
          Government procurement officers navigate{" "}
          <strong style={{ color: "white" }}>23,613+ Indian Standards</strong>, constant
          revisions, and mandatory certification requirements. IS-Setu&apos;s AI pipeline
          gives you the right IS, all allied standards, and full compliance evidence — in
          one report.
        </motion.p>

        {/* Entry point cards */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25 }}
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
            gap: 16,
            maxWidth: 700,
          }}
        >
          {/* Quick Search */}
          <button
            onClick={onSearchClick}
            id="hero-search-btn"
            style={{
              background: "white",
              border: "2px solid transparent",
              borderRadius: 14,
              padding: "24px 24px",
              textAlign: "left",
              cursor: "pointer",
              transition: "all 0.2s ease",
              boxShadow: "0 4px 20px rgba(0,0,0,0.2)",
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLButtonElement).style.borderColor = "#C9A227";
              (e.currentTarget as HTMLButtonElement).style.transform = "translateY(-2px)";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLButtonElement).style.borderColor = "transparent";
              (e.currentTarget as HTMLButtonElement).style.transform = "translateY(0)";
            }}
          >
            <div
              style={{
                width: 44,
                height: 44,
                borderRadius: 10,
                background: "linear-gradient(135deg, #1E3A5F, #2B5286)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                marginBottom: 14,
              }}
            >
              <Search size={20} color="#C9A227" />
            </div>
            <div
              style={{
                fontWeight: 700,
                fontSize: "1rem",
                color: "#1E3A5F",
                marginBottom: 4,
              }}
            >
              Quick Product Search
            </div>
            <p style={{ fontSize: "0.78rem", color: "#6B7280", lineHeight: 1.5 }}>
              Type a product description — get the primary IS, all allied standards, and
              certification requirements.
            </p>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 4,
                marginTop: 12,
                fontSize: "0.78rem",
                fontWeight: 600,
                color: "#1E3A5F",
              }}
            >
              Search now <ArrowRight size={13} />
            </div>
          </button>

          {/* Tender Upload */}
          <button
            onClick={onUploadClick}
            id="hero-upload-btn"
            style={{
              background: "rgba(255,255,255,0.08)",
              border: "2px solid rgba(255,255,255,0.15)",
              borderRadius: 14,
              padding: "24px 24px",
              textAlign: "left",
              cursor: "pointer",
              transition: "all 0.2s ease",
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLButtonElement).style.borderColor = "#C9A227";
              (e.currentTarget as HTMLButtonElement).style.background = "rgba(255,255,255,0.12)";
              (e.currentTarget as HTMLButtonElement).style.transform = "translateY(-2px)";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLButtonElement).style.borderColor = "rgba(255,255,255,0.15)";
              (e.currentTarget as HTMLButtonElement).style.background = "rgba(255,255,255,0.08)";
              (e.currentTarget as HTMLButtonElement).style.transform = "translateY(0)";
            }}
          >
            <div
              style={{
                width: 44,
                height: 44,
                borderRadius: 10,
                background: "rgba(201,162,39,0.15)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                marginBottom: 14,
                border: "1px solid rgba(201,162,39,0.3)",
              }}
            >
              <Upload size={20} color="#C9A227" />
            </div>
            <div
              style={{
                fontWeight: 700,
                fontSize: "1rem",
                color: "white",
                marginBottom: 4,
              }}
            >
              Upload Tender Document
            </div>
            <p style={{ fontSize: "0.78rem", color: "rgba(255,255,255,0.65)", lineHeight: 1.5 }}>
              Upload a PDF or DOCX tender — get a full compliance audit with gaps and
              outdated references flagged.
            </p>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 4,
                marginTop: 12,
                fontSize: "0.78rem",
                fontWeight: 600,
                color: "#C9A227",
              }}
            >
              Upload &amp; audit <ArrowRight size={13} />
            </div>
          </button>
        </motion.div>

        <StatStrip />
      </div>
    </section>
  );
}

function TabSection({
  activeTab,
  onTabChange,
}: {
  activeTab: Tab;
  onTabChange: (tab: Tab) => void;
}) {
  return (
    <div
      style={{
        maxWidth: 1100,
        margin: "0 auto",
        padding: "0 24px",
      }}
    >
      {/* Tab bar */}
      <div
        style={{
          display: "flex",
          borderBottom: "2px solid #E5E7EB",
          marginBottom: 32,
          marginTop: 48,
          gap: 0,
        }}
      >
        {[
          { key: "search" as Tab, label: "Quick Product Search", icon: <Search size={15} /> },
          { key: "upload" as Tab, label: "Tender Document Upload", icon: <Upload size={15} /> },
        ].map((tab) => (
          <button
            key={tab.key}
            id={`tab-${tab.key}`}
            onClick={() => onTabChange(tab.key)}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 8,
              padding: "12px 22px",
              border: "none",
              borderBottom:
                activeTab === tab.key
                  ? "2px solid #1E3A5F"
                  : "2px solid transparent",
              background: "none",
              cursor: "pointer",
              fontSize: "0.88rem",
              fontWeight: activeTab === tab.key ? 700 : 500,
              color: activeTab === tab.key ? "#1E3A5F" : "#6B7280",
              marginBottom: "-2px",
              transition: "all 0.15s",
            }}
          >
            {tab.icon}
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab content */}
      <motion.div
        key={activeTab}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.25 }}
      >
        {activeTab === "search" ? <QuickSearch /> : <TenderUpload />}
      </motion.div>
    </div>
  );
}

function Footer() {
  return (
    <footer className="footer" style={{ marginTop: 80 }}>
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "36px 24px" }}>
        <div
          style={{
            display: "flex",
            alignItems: "flex-start",
            justifyContent: "space-between",
            flexWrap: "wrap",
            gap: 24,
            marginBottom: 24,
          }}
        >
          <div>
            <div
              style={{
                fontWeight: 800,
                fontSize: "1.1rem",
                color: "#C9A227",
                marginBottom: 6,
              }}
            >
              IS-Setu
            </div>
            <p style={{ fontSize: "0.78rem", maxWidth: 340, lineHeight: 1.6 }}>
              AI-powered Indian Standards recommendation system for government procurement
              officials. Ensuring compliance with BIS standards, QCOs, and certification
              requirements.
            </p>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
            <div style={{ fontSize: "0.72rem", fontWeight: 700, color: "rgba(255,255,255,0.4)", letterSpacing: "0.08em", marginBottom: 4 }}>
              GOVERNING BODIES
            </div>
            {[
              "Ministry of Consumer Affairs, Food & Public Distribution",
              "Department of Consumer Affairs",
              "Bureau of Indian Standards (BIS)",
              "Quality Council of India (QCI)",
            ].map((org) => (
              <div key={org} style={{ fontSize: "0.75rem", color: "rgba(255,255,255,0.45)" }}>
                {org}
              </div>
            ))}
          </div>
        </div>

        <div
          style={{
            borderTop: "1px solid rgba(255,255,255,0.1)",
            paddingTop: 20,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            flexWrap: "wrap",
            gap: 12,
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <Lock size={13} color="rgba(255,255,255,0.4)" />
            <span
              style={{
                fontSize: "0.72rem",
                color: "rgba(255,255,255,0.4)",
                background: "rgba(201,162,39,0.12)",
                padding: "2px 10px",
                borderRadius: 4,
                border: "1px solid rgba(201,162,39,0.2)",
              }}
            >
              🔒 Demo Mode — using sample standards dataset (not live BIS database)
            </span>
          </div>
          <div style={{ fontSize: "0.7rem", color: "rgba(255,255,255,0.3)" }}>
            IS-Setu MVP by Team 818_Saksham · Hackathon Demo Build · {new Date().getFullYear()}
          </div>
        </div>
      </div>
    </footer>
  );
}

function HomeContent() {
  const [activeTab, setActiveTab] = useState<Tab>("search");
  const searchParams = useSearchParams();
  const router = useRouter();

  useEffect(() => {
    const tab = searchParams.get("tab");
    if (tab === "upload" || tab === "search") {
      setActiveTab(tab);
      // Scroll to tab section
      setTimeout(() => {
        document.getElementById("main-tabs")?.scrollIntoView({ behavior: "smooth" });
      }, 200);
    }

    const section = searchParams.get("section");
    if (section === "how") {
      setTimeout(() => {
        document.getElementById("how-it-works")?.scrollIntoView({ behavior: "smooth" });
      }, 200);
    }
  }, [searchParams]);

  const scrollToTabs = (tab: Tab) => {
    setActiveTab(tab);
    router.push(`/?tab=${tab}`, { scroll: false });
    setTimeout(() => {
      document.getElementById("main-tabs")?.scrollIntoView({ behavior: "smooth" });
    }, 50);
  };

  return (
    <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}>
      <Header />

      <main style={{ flex: 1 }}>
        {/* Hero */}
        <HeroSection
          onSearchClick={() => scrollToTabs("search")}
          onUploadClick={() => scrollToTabs("upload")}
        />

        {/* Main tool area */}
        <div id="main-tabs" style={{ background: "#F9FAFB", paddingBottom: 60 }}>
          <TabSection activeTab={activeTab} onTabChange={(tab) => {
            setActiveTab(tab);
            router.push(`/?tab=${tab}`, { scroll: false });
          }} />
        </div>

        {/* Scroll hint */}
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            padding: "16px 0",
            background: "#F9FAFB",
          }}
        >
          <motion.div
            animate={{ y: [0, 6, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 4,
              cursor: "pointer",
            }}
            onClick={() => {
              document.getElementById("how-it-works-wrapper")?.scrollIntoView({ behavior: "smooth" });
            }}
          >
            <span style={{ fontSize: "0.7rem", color: "#9CA3AF" }}>How it works</span>
            <ChevronDown size={16} color="#9CA3AF" />
          </motion.div>
        </div>

        {/* How it works */}
        <div
          id="how-it-works-wrapper"
          style={{
            maxWidth: 1100,
            margin: "0 auto",
            padding: "48px 24px",
          }}
        >
          <HowItWorks />
        </div>

        {/* Trust signals */}
        <div
          style={{
            background: "#132840",
            padding: "48px 24px",
          }}
        >
          <div style={{ maxWidth: 900, margin: "0 auto" }}>
            <div style={{ textAlign: "center", marginBottom: 36 }}>
              <div className="section-label" style={{ color: "rgba(255,255,255,0.4)", marginBottom: 10 }}>
                Built for Government
              </div>
              <h2
                style={{
                  fontSize: "1.5rem",
                  fontWeight: 700,
                  color: "white",
                  marginBottom: 10,
                }}
              >
                Why procurement officers trust IS-Setu
              </h2>
              <div className="gold-divider" style={{ margin: "0 auto" }} />
            </div>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
                gap: 16,
              }}
            >
              {[
                {
                  icon: <ShieldCheck size={22} color="#C9A227" />,
                  title: "Every claim is citable",
                  desc: "Every recommendation traces back to a specific IS clause or QCO notification — never vague AI output.",
                },
                {
                  icon: <Database size={22} color="#C9A227" />,
                  title: "Covers 23,613 standards",
                  desc: "Full BIS standards database indexed — electrical, civil, mechanical, food, textiles, and more.",
                },
                {
                  icon: <Search size={22} color="#C9A227" />,
                  title: "Tender gap analysis",
                  desc: "Upload a procurement document and instantly see every missing, outdated, or incorrect IS reference.",
                },
                {
                  icon: <Lock size={22} color="#C9A227" />,
                  title: "Human-in-the-loop",
                  desc: "Accept, edit, or reject recommendations — every action creates a dated audit trail for accountability.",
                },
              ].map((card) => (
                <motion.div
                  key={card.title}
                  whileInView={{ opacity: 1, y: 0 }}
                  initial={{ opacity: 0, y: 12 }}
                  viewport={{ once: true }}
                  style={{
                    padding: "24px 20px",
                    background: "rgba(255,255,255,0.05)",
                    borderRadius: 12,
                    border: "1px solid rgba(201,162,39,0.15)",
                  }}
                >
                  <div style={{ marginBottom: 14 }}>{card.icon}</div>
                  <div
                    style={{
                      fontSize: "0.88rem",
                      fontWeight: 700,
                      color: "white",
                      marginBottom: 8,
                    }}
                  >
                    {card.title}
                  </div>
                  <p
                    style={{
                      fontSize: "0.78rem",
                      color: "rgba(255,255,255,0.55)",
                      lineHeight: 1.6,
                    }}
                  >
                    {card.desc}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default function HomePage() {
  return (
    <Suspense fallback={<div style={{ minHeight: "100vh", backgroundColor: "#0F172A" }} />}>
      <HomeContent />
    </Suspense>
  );
}

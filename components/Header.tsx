"use client";

import { Shield, ChevronRight } from "lucide-react";
import Link from "next/link";

interface HeaderProps {
  currentPage?: "home" | "search" | "upload" | "how-it-works";
}

export default function Header({ currentPage = "home" }: HeaderProps) {
  return (
    <header className="header-bar">
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 24px" }}>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            height: 64,
          }}
        >
          {/* Logo */}
          <Link href="/" style={{ textDecoration: "none" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
              <div
                style={{
                  width: 40,
                  height: 40,
                  borderRadius: "50%",
                  background: "linear-gradient(135deg, #C9A227 0%, #E8C547 100%)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  boxShadow: "0 2px 8px rgba(201,162,39,0.4)",
                }}
              >
                <Shield size={20} color="#1E3A5F" strokeWidth={2.5} />
              </div>
              <div>
                <div
                  style={{
                    fontFamily: "'Inter', sans-serif",
                    fontWeight: 800,
                    fontSize: "1.3rem",
                    color: "white",
                    letterSpacing: "-0.02em",
                    lineHeight: 1,
                  }}
                >
                  IS-Setu
                  <span
                    style={{
                      fontSize: "0.6rem",
                      fontWeight: 500,
                      color: "#C9A227",
                      marginLeft: 6,
                      verticalAlign: "middle",
                      border: "1px solid #C9A227",
                      padding: "1px 5px",
                      borderRadius: 4,
                      letterSpacing: "0.05em",
                    }}
                  >
                    BETA
                  </span>
                </div>
                <div
                  style={{
                    fontSize: "0.65rem",
                    color: "rgba(255,255,255,0.6)",
                    letterSpacing: "0.02em",
                    marginTop: 2,
                  }}
                >
                  By Team 818_Saksham | AI-Powered Standards Recommendation for Government Procurement
                </div>
              </div>
            </div>
          </Link>

          {/* Nav */}
          <nav style={{ display: "flex", alignItems: "center", gap: 4 }}>
            {[
              { label: "Home", href: "/", key: "home" },
              { label: "Quick Search", href: "/?tab=search", key: "search" },
              { label: "Tender Upload", href: "/?tab=upload", key: "upload" },
              { label: "How It Works", href: "/?section=how", key: "how-it-works" },
            ].map((item) => (
              <Link
                key={item.key}
                href={item.href}
                style={{
                  padding: "6px 14px",
                  borderRadius: 6,
                  fontSize: "0.85rem",
                  fontWeight: currentPage === item.key ? 600 : 400,
                  color: currentPage === item.key ? "#C9A227" : "rgba(255,255,255,0.8)",
                  textDecoration: "none",
                  background: currentPage === item.key ? "rgba(201,162,39,0.15)" : "transparent",
                  transition: "all 0.15s ease",
                  borderBottom: currentPage === item.key ? "2px solid #C9A227" : "2px solid transparent",
                }}
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>

        {/* Sub-bar: ministry breadcrumb */}
        <div
          style={{
            paddingBottom: 8,
            display: "flex",
            alignItems: "center",
            gap: 6,
            fontSize: "0.68rem",
            color: "rgba(255,255,255,0.45)",
          }}
        >
          <span>Ministry of Consumer Affairs, Food &amp; Public Distribution</span>
          <ChevronRight size={10} />
          <span>Department of Consumer Affairs</span>
          <ChevronRight size={10} />
          <span>Bureau of Indian Standards</span>
        </div>
      </div>
    </header>
  );
}

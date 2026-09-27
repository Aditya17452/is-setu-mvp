import type { Metadata } from "next";
import "./globals.css";
import { Toaster } from "sonner";

export const metadata: Metadata = {
  title: "IS-Setu — AI-Powered Indian Standards Recommendation for Government Procurement",
  description:
    "IS-Setu helps government procurement officials instantly identify the correct Indian Standards (IS), allied standards, certification requirements and version status for any product — powered by AI. Find the right BIS standard in seconds, not hours.",
  keywords: [
    "Indian Standards",
    "BIS",
    "Government Procurement",
    "IS Standards",
    "Quality Control Order",
    "ISI Mark",
    "Standards Compliance",
    "CPWD",
    "GEM",
    "Procurement India",
  ],
  authors: [{ name: "Team 818_Saksham" }],
  openGraph: {
    title: "IS-Setu — AI-Powered Indian Standards Recommendation",
    description: "Find the correct Indian Standard for any government procurement product in seconds.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        {children}
        <Toaster
          position="bottom-right"
          toastOptions={{
            style: {
              background: "#1E3A5F",
              color: "white",
              border: "1px solid #C9A227",
              borderRadius: "8px",
            },
          }}
        />
      </body>
    </html>
  );
}

import type { Metadata } from "next";
import "@/app/globals.css";

export const metadata: Metadata = {
  title: "Voice-to-Quote",
  description: "Premium glassmorphism SaaS layout"
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}

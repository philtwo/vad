import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Valorant Agent Dashboard",
  description: "Browse and filter Valorant agents by their roles",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}

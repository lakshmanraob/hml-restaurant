import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "HML Restaurant",
  description: "Welcome to HML Restaurant - Your dining destination",
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

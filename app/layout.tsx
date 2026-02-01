import type { Metadata } from "next";
import "./globals.css";
import { LayoutWrapper } from "@/components/layout/LayoutWrapper";

export const metadata: Metadata = {
  title: "HML Restaurant - Authentic Indian Cuisine in Bangalore",
  description: "Experience authentic Indian flavors at HML Restaurant. Family-friendly dining with live music every Friday. Serving Bangalore since 2010.",
  keywords: ["Indian restaurant", "Bangalore", "Indian food", "live music", "family dining"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <LayoutWrapper>{children}</LayoutWrapper>
      </body>
    </html>
  );
}

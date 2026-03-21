import type { Metadata } from "next";
import { ThemeProvider } from "@orion-ds/react";
import "@orion-ds/react/styles.css";
import "./globals.css";

export const metadata: Metadata = {
  title: "{{projectName}}",
  description: "A Next.js 15 app with Orion Design System",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}

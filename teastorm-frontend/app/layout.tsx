import type { Metadata } from "next";
import Providers from "@/app/providers";
import Header from "@/app/components/Header";
import "./globals.css";

export const metadata: Metadata = {
  title: "TeaStorm — Premium Loose Leaf Tea",
  description:
    "TeaStorm — premium loose leaf tea sourced directly from China and Taiwan. Crafted for mindful tea rituals.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        style={{
          margin: 0,
          fontFamily:
            '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
          background: "#fff",
          color: "#000",
        }}
      >
        <Providers>
          <Header />
          <main
            style={{
              minHeight: "calc(100vh - 80px)",
            }}
          >
            {children}
          </main>
        </Providers>
      </body>
    </html>
  );
}

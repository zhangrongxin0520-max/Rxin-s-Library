import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../styles/globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export const metadata: Metadata = {
  title: "Portfolio | Knowledge Site",
  description: "Projects and writing",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={inter.variable}>
      <body className={inter.className}>
        <header className="site-header">
          <div className="container header-inner">
            <a href="/" className="logo">Rxin's library</a>
            <nav>
              <a href="/">Home</a>
              <a href="/#works">Works</a>
              <a href="/#about">About</a>
            </nav>
          </div>
        </header>
        <main>{children}</main>
        <footer className="site-footer">
          <div className="container">
            <p>© {new Date().getFullYear()} Portfolio · Built with Next.js</p>
          </div>
        </footer>
      </body>
    </html>
  );
}

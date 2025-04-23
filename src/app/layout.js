import { Geist, Geist_Mono } from "next/font/google";
import { LanguageProvider } from "./store/LangContext";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "CodeOnline",
  description: "Write and Execute code Online",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <LanguageProvider> {children}</LanguageProvider>
      </body>
    </html>
  );
}

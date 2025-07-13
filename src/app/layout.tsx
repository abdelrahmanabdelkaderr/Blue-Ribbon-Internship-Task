import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ClubProvider } from "../context/ClubContext";
import Navigation from "../components/Navigation";
import ClientWrapper from "../components/ClientWrapper";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Sporting Club System",
  description: "Manage sports, members, and subscriptions",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-gray-50`}
      >
        <ClientWrapper>
          <ClubProvider>
            <Navigation />
            <main className="min-h-screen">
              {children}
            </main>
          </ClubProvider>
        </ClientWrapper>
      </body>
    </html>
  );
}

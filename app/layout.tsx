"use client";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Footer from "./components/footer";
import Header from "./components/header";
import { usePathname } from "next/navigation"; // Import usePathname to check the current route

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});



export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname(); // Get the current route

  // Exclude global layout for the revalidate-group
  const isRevalidateGroup = pathname?.startsWith("/revalidate-page");

  console.log("Global Layout Children:", children); // Debugging log

  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased container flex flex-col items-center justify-between min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]`}
      >
        {!isRevalidateGroup && (
          <div className="global-layout">
            <Header />
            {children}
            <Footer />
          </div>
        )}
        {isRevalidateGroup && children}
      </body>
    </html>
  );
}

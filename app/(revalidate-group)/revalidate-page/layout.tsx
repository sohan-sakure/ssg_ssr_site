import { Geist, Geist_Mono } from "next/font/google";
import "../../globals.css";
// import Footer from "@/components/footer";
import Footer from "../../components/footer";

const geistSans = Geist({
    variable: "--font-geist-sans",
    subsets: ["latin"],
});

const geistMono = Geist_Mono({
    variable: "--font-geist-mono",
    subsets: ["latin"],
});

export default function Layout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <div
            className={`${geistSans.variable} ${geistMono.variable} antialiased container flex flex-col items-center justify-between sm:p-20 font-[family-name:var(--font-geist-sans)]`}
        >

            {children}
            <div className="mt-30">
                <Footer />
            </div>
        </div>
    );
}

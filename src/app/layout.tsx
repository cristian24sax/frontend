import "./globals.css";

import Navbar from "@/components/Navbar";
import SessionAuthProvider from "@/context/SessionAuthProvider";
import type { Metadata } from "next";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Mejora",
  description: "Web de cursos para mejorar tus habilidades en la mejora continua.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <main>
          <SessionAuthProvider>{children}</SessionAuthProvider>
        </main>
      </body>
    </html>
  );
}

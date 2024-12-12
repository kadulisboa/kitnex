import { ToastHandler } from "@/lib/toastHandler";
import { ptBR } from "@clerk/localizations";
import { ClerkProvider } from "@clerk/nextjs";
import type { Metadata } from "next";
import localFont from "next/font/local";
import { Toaster } from "sonner";
import "./globals.css";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Kitnex",
  description: "Gerencie seus alugueis de forma simples e eficiente",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider localization={ptBR}>
      <html lang="pt-BR">
        <body
          className={`${geistSans.variable} ${geistMono.variable} antialiased pt-10 lg:pt-0 bg-gray-50`}
        >
          {children}
          <Toaster richColors position="top-right" />
          <ToastHandler />
        </body>
      </html>
    </ClerkProvider>
  );
}

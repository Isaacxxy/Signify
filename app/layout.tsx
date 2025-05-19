import type { Metadata } from "next";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import { ThemeProvider } from "@/providers/theme-provider"
import SocketProvider from "@/providers/SocketProvider";
import Navbar from "@/components/layout/Navbar";
import { dark } from '@clerk/themes'
import { I18nextProvider } from "react-i18next";
import i18n from "@/lib/i18n";
import ClientLayout from "@/components/ClientLayout";


export const metadata: Metadata = {
  title: "Signify",
  description: "videochat",
  icons: "/logo.svg"
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <ClerkProvider appearance={{ baseTheme: dark }}>
      <html lang="en" suppressHydrationWarning className="bg-black">
        <body className="bg-black relative">
          <SocketProvider>
            <main className="flex flex-col min-h-screen">
              <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
                <ClientLayout>
                  {children}
                </ClientLayout>
              </ThemeProvider>
            </main>
          </SocketProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}

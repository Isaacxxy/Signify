import type { Metadata } from "next";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import { ThemeProvider } from "@/providers/theme-provider"
import SocketProvider from "@/providers/SocketProvider";
import Navbar from "@/components/layout/Navbar";


export const metadata: Metadata = {
  title: "AIE",
  description: "videochat",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en" suppressHydrationWarning className="bg-black">
        <body className="bg-black relative">
          <SocketProvider>
            <main className="flex flex-col min-h-screen">
              {/* <div className="w-full">
                <Navbar />
              </div> */}
              <ThemeProvider
                attribute="class"
                defaultTheme="dark"
                enableSystem
                disableTransitionOnChange
              >
                {/* <StarsCanvas /> */}
                {children}
              </ThemeProvider>
            </main>
          </SocketProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}

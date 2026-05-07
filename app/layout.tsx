import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";
import { getSession } from "@/lib/auth";
import SessionProvider from "@/components/providers/session-provider";

const font = Inter({
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Frontend Assessment",
  description:
    "Assessment for Senior Frontend Developer position at tentwenty digital agency",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await getSession();

  return (
    <html lang="en" className={font.className}>
      <body className={font.className}>
        <Toaster theme="light" position="top-center" richColors />
        <SessionProvider session={session}>{children}</SessionProvider>
      </body>
    </html>
  );
}

import type { Metadata } from "next";
import "./globals.css";
import '@fontsource-variable/onest';
import NavBar from "@/components/NavBar";
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import Background from "@/components/Background";

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default async function RootLayout({
  children,
  params: { locale }
}: Readonly<{
  children: React.ReactNode;
  params: { locale: string };
}>) {
  // Providing all messages to the client
  // side is the easiest way to get started
  const messages = await getMessages();

  return (
    <html lang={locale}>
      <body>
        <NextIntlClientProvider messages={messages}>
        <div className="relative min-h-screen">
          <Background />
          {children}
          <NavBar />
        </div>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}

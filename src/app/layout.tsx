import type { Metadata } from "next";
import "./globals.css";
import {Work_Sans} from 'next/font/google'

const work_sans = Work_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700']
})

export const metadata: Metadata = {
  title: "Ten twenty test",
  description: "this is a test for frontend developers that held by ten twenty",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${work_sans.className} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}

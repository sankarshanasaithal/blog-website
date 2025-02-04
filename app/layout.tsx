import './globals.css';
import type { Metadata } from 'next';
import Navbar from './components/Navbar';

import { DM_Sans } from 'next/font/google'

const geistSans = DM_Sans({
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: 'Blog Website',
  description: 'A Next.js blog website with full CRUD functionality',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <Navbar />
        {children}
      </body>
    </html>
  );
}
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { Providers } from '@/lib/provider';
import { Header } from './header/Header';
import CssBaseline from '@mui/material/CssBaseline'; // Import CssBaseline from Material-UI

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'IAndAI',
  description: 'Language practice made easy',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Providers>
      <html lang="en">
        <body className={inter.className}>
          <CssBaseline /> {/* Add CssBaseline for baseline styling */}
          <Header />
          {children}
        </body>
      </html>
    </Providers>
  );
}

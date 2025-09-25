import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { ThemeProvider } from '@/components/ThemeProvider';
import KeyboardShortcuts from '@/components/KeyboardShortcuts';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Aurora Player - Premium Music Experience',
  description: 'A premium music player with beautiful animations and personalized recommendations',
  keywords: ['music', 'player', 'streaming', 'premium', 'aurora'],
  authors: [{ name: 'Aurora Player Team' }],
  viewport: 'width=device-width, initial-scale=1',
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#ffffff' },
    { media: '(prefers-color-scheme: dark)', color: '#0f172a' },
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider>
          {/* Global keyboard shortcuts wiring; real handlers can be passed via context later */}
          <KeyboardShortcuts />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}

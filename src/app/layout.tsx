import type { Metadata, Viewport } from 'next';
import { GeistSans } from 'geist/font/sans';
import StyledRegistry from '@/components/StyledRegistry';
import Layout from '@/components/Layout';
import './globals.css';

const geist = GeistSans;

export const metadata: Metadata = {
  title: 'AnyNote - 随时记录你的想法',
  description: '一个简单易用的笔记应用',
};

export const viewport: Viewport = {
  themeColor: '#1976d2',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="zh">
      <head>
        <link rel="manifest" href="/anynote/manifest.json" />
      </head>
      <body className={`${geist.variable} antialiased`}>
        <StyledRegistry>
          <Layout>{children}</Layout>
        </StyledRegistry>
      </body>
    </html>
  );
}
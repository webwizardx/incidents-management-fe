import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.scss';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Sistema de incidencias',
  description:
    'Sistema de incidencias para la gestión de reportes de problemas',
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html className="h-full bg-white" lang="en" suppressHydrationWarning={true}>
      <body className={`h-full ${inter.className}`}>{children}</body>
    </html>
  );
}

import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { Footer, Navbar } from './components/shared';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Speak Sphere',
  description:
    'Gen AI app which lets the user converse with an AI chatbot in order to practicing while learning a new language',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Navbar />
        <div className="min-h-96">{children}</div>
        <Footer />
      </body>
    </html>
  );
}

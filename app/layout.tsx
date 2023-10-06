import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { Analytics } from '@vercel/analytics/react'
const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Jah pode beber?',
  description: 'Será que já chegou a hora de al-mossar? Descubra',
  keywords: 'tá liberado beber, beber, tomar uma, beber uma cerveja, já pode beber?, bora tomar uma?, tá liberado?', 
  authors: { name: 'He4rt Devs', url: 'https://heartdevs.com/' },
  openGraph: {
    title: 'Jah pode beber?',
    description: 'Será que já chegou a hora de al-mossar? Descubra',
    type: 'website',
    images: [
      { url: 'beer.png', width: 1200, height: 630, alt: 'cerveja img' },
    ],
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="!scroll-smooth">
      <body className={inter.className}>
        {children}
        <Analytics />
      </body>
    </html>
  )
}

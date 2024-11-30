import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { Analytics } from '@vercel/analytics/react'
const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Jah pode beber?',
  description: 'Será que já chegou a hora de beber? Descubra',
  keywords: 'tá liberado beber, beber cerveja, hora de beber, tomar uma, tomar cerveja, já pode beber?, bora tomar uma?, é hora de beber?, diversão, curiosidade sobre beber', 
  authors: [{ name: 'He4rt Devs', url: 'https://heartdevs.com/' }, { name: 'Fernando Andrade', url: 'https://github.com/fernanduandrade' }],
  openGraph: {
    title: 'Jah pode beber?',
    description: 'Será que já chegou a hora de beber? Descubra',
    type: 'website',
    images: [
      { url: 'beer.png', width: 512, height: 512, alt: 'cerveja img' },
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

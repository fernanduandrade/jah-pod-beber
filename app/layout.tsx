import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { Analytics } from '@vercel/analytics/react'
const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: "Já Pode Beber? | Descubra se é hora da cerveja",
  description:
    "Descubra se já pode tomar aquela cerveja gelada! A resposta é sempre SIM! Horário de funcionamento 24/7, todos os dias da semana. Beba com moderação.",
  keywords: [
    "já pode beber",
    "cerveja",
    "hora da cerveja",
    "beber cerveja",
    "happy hour",
    "cerveja gelada",
    "24/7",
    "quando beber",
  ],
  authors: [{ name: "Fernando Andrade", url: "https://github.com/fernanduandrade" }],
  creator: "Fernando Andrade",
  publisher: "Fernando Andrade",
  openGraph: {
    type: "website",
    locale: "pt_BR",
    title: "Já Pode Beber? | 24/7",
    description: "Descubra se já pode tomar aquela cerveja gelada! A resposta é sempre SIM!",
    siteName: "Já Pode Beber",
    images: [
      { url: 'beer.png', width: 512, height: 512, alt: 'cerveja img' },
    ],
  },
  instagram: {
    card: "summary_large_image",
    title: "Já Pode Beber?",
    description: "Descubra se já pode tomar aquela cerveja gelada! A resposta é sempre SIM!",
    creator: "@fernanduandrade",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  }
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-BR" className="!scroll-smooth">
      <body className={inter.className}>
        {children}
        <Analytics />
      </body>
    </html>
  )
}

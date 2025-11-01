import './globals.css'
import type { Metadata } from 'next'
import { Nunito } from "next/font/google"
import { Analytics } from '@vercel/analytics/react'

const nunito = Nunito({
  subsets: ["latin"],
  weight: ["300", "400", "600", "700", "800"],
  variable: "--font-nunito",
})

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
    <html lang="pt-BR">
      <body className={`font-sans antialiased ${nunito.variable}`}>
        {children}
        <Analytics />
      </body>
    </html>
  )
}

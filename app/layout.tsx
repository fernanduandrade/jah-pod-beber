import "./globals.css";
import type { Metadata } from "next";
import { Nunito } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";
import { ThemeProvider } from "./components/ThemeProvider";

const nunito = Nunito({
  subsets: ["latin"],
  weight: ["300", "400", "600", "700", "800"],
  variable: "--font-nunito",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://jahpodebeber.com"),
  title: {
    default: "Já Pode Beber? | A Resposta é Sempre SIM! 🍺",
    template: "%s | Já Pode Beber",
  },
  description:
    "🍺 Descubra se já é hora da cerveja gelada! A resposta é sempre SIM! Site divertido com contador ao vivo, mural de mensagens, reações e frases sobre cerveja. Funcionamento 24/7, todos os dias. Compartilhe com os amigos! Beba com moderação.",
  applicationName: "Já Pode Beber",
  keywords: [
    // Palavras-chave principais
    "já pode beber",
    "ja pod beber",
    "já pod beber",
    "pode beber",
    "cerveja",
    "hora da cerveja",
    "beber cerveja",
    
    // Long-tail keywords (mais específicas)
    "que horas posso beber cerveja",
    "quando posso beber",
    "é hora de beber",
    "hora de tomar cerveja",
    "quando é hora da cerveja",
    "qual o melhor horário para beber",
    
    // Relacionadas ao contexto
    "happy hour",
    "happy hour online",
    "cerveja gelada",
    "choppinho",
    "breja",
    "beer time",
    "cerveja sempre",
    "24/7 cerveja",
    
    // Memes e cultura
    "meme cerveja",
    "cerveja meme",
    "frases sobre cerveja",
    "piadas de cerveja",
    "humor cerveja",
    "site engraçado cerveja",
    "site divertido cerveja",
    
    // Sociais
    "compartilhar cerveja",
    "mural de mensagens cerveja",
    "contador de bebidas",
    "pessoas bebendo agora",
    "comunidade cerveja brasil",
    
    // Eventos
    "sexta-feira cerveja",
    "final de semana cerveja",
    "depois do trabalho cerveja",
    "comemoração cerveja",
    
    // Brasil específico
    "cerveja brasil",
    "cerveja brasileira",
    "cultura cerveja brasil",
    "tradição cerveja",
  ],
  authors: [
    { name: "Fernando Andrade", url: "https://github.com/fernanduandrade" }
  ],
  creator: "Fernando Andrade",
  publisher: "Já Pode Beber",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  category: "Entertainment",
  classification: "Entertainment, Humor, Social, Lifestyle",
  openGraph: {
    type: "website",
    locale: "pt_BR",
    url: "https://jahpodebeber.com",
    siteName: "Já Pode Beber",
    title: "🍺 Já Pode Beber? | A Resposta é Sempre SIM!",
    description:
      "Descubra se já é hora da cerveja gelada! Site divertido com contador ao vivo, mural de mensagens e muito mais. A resposta é sempre SIM! 🍺",
    images: [
      {
        url: "/beer.png",
        width: 512,
        height: 512,
        alt: "Já Pode Beber - Ícone de Cerveja",
        type: "image/png",
      },
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Já Pode Beber? SIM! Sempre é hora de tomar uma gelada",
        type: "image/png",
      },
    ],
  },
  
  // Twitter Card
  twitter: {
    card: "summary_large_image",
    site: "@jahpodebeber",
    creator: "@fernanduandrade",
    title: "🍺 Já Pode Beber? | A Resposta é Sempre SIM!",
    description:
      "Descubra se já é hora da cerveja gelada! Site divertido com contador ao vivo e muito mais. A resposta é sempre SIM! 🍺",
    images: ["/beer.png"],
  },  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  
  // Manifest
  manifest: "/manifest.json",
  
  // Icons
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/beer.png", type: "image/png", sizes: "512x512" },
    ],
    apple: [
      { url: "/beer.png", sizes: "180x180", type: "image/png" },
    ],
  },
  
  // Outros
  alternates: {
    canonical: "https://jahpodebeber.com",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <head>
        {/* Schema.org JSON-LD para melhor SEO */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@graph": [
                {
                  "@type": "WebSite",
                  "@id": "https://jahpodebeber.com/#website",
                  url: "https://jahpodebeber.com",
                  name: "Já Pode Beber?",
                  description:
                    "Descubra se já é hora da cerveja gelada! A resposta é sempre SIM! Site divertido com contador ao vivo, mural de mensagens e muito mais.",
                  inLanguage: "pt-BR",
                  publisher: {
                    "@id": "https://jahpodebeber.com/#organization",
                  },
                  potentialAction: {
                    "@type": "SearchAction",
                    target: {
                      "@type": "EntryPoint",
                      urlTemplate: "https://jahpodebeber.com/?q={search_term_string}",
                    },
                    "query-input": "required name=search_term_string",
                  },
                },
                {
                  "@type": "Organization",
                  "@id": "https://jahpodebeber.com/#organization",
                  name: "Já Pode Beber",
                  url: "https://jahpodebeber.com",
                  logo: {
                    "@type": "ImageObject",
                    url: "https://jahpodebeber.com/beer.png",
                    width: 512,
                    height: 512,
                  },
                  sameAs: [
                    "https://github.com/fernanduandrade/jah-pod-beber",
                  ],
                  founder: [
                    {
                      "@type": "Person",
                      name: "Fernando Andrade",
                      url: "https://github.com/fernanduandrade",
                    }
                  ],
                },
                {
                  "@type": "WebApplication",
                  "@id": "https://jahpodebeber.com/#webapp",
                  name: "Já Pode Beber?",
                  url: "https://jahpodebeber.com",
                  applicationCategory: "Entertainment",
                  applicationSubCategory: "Social, Humor, Lifestyle",
                  operatingSystem: "Web, iOS, Android",
                  browserRequirements: "Requer JavaScript. Requer HTML5.",
                  inLanguage: "pt-BR",
                  description:
                    "Aplicação web divertida que responde à pergunta: Já pode beber? Com contador ao vivo de pessoas bebendo, mural de mensagens interativo, reações e frases inspiradoras sobre cerveja.",
                  featureList: [
                    "Contador ao vivo de visitantes",
                    "Mural de mensagens interativo",
                    "Sistema de reações",
                    "Frases sobre cerveja",
                    "Atualizações em tempo real",
                    "Temas claro e escuro",
                    "Compartilhamento social",
                  ],
                  offers: {
                    "@type": "Offer",
                    price: "0",
                    priceCurrency: "BRL",
                    availability: "https://schema.org/InStock",
                  },
                  aggregateRating: {
                    "@type": "AggregateRating",
                    ratingValue: "5",
                    ratingCount: "1000",
                    bestRating: "5",
                    worstRating: "1",
                  },
                },
                {
                  "@type": "FAQPage",
                  "@id": "https://jahpodebeber.com/#faq",
                  mainEntity: [
                    {
                      "@type": "Question",
                      name: "Já pode beber?",
                      acceptedAnswer: {
                        "@type": "Answer",
                        text: "SIM! A resposta é sempre SIM! Funcionamos 24/7, todos os dias da semana. Sempre é hora de tomar uma cerveja gelada. Lembre-se de beber com moderação.",
                      },
                    },
                    {
                      "@type": "Question",
                      name: "Qual o horário de funcionamento?",
                      acceptedAnswer: {
                        "@type": "Answer",
                        text: "24 horas por dia, 7 dias por semana. Sempre é hora!",
                      },
                    },
                    {
                      "@type": "Question",
                      name: "Como funciona o contador ao vivo?",
                      acceptedAnswer: {
                        "@type": "Answer",
                        text: "O contador mostra em tempo real quantas pessoas estão visitando o site agora. É atualizado automaticamente usando tecnologia de WebSocket via Pusher, sem necessidade de recarregar a página.",
                      },
                    },
                    {
                      "@type": "Question",
                      name: "Posso compartilhar com meus amigos?",
                      acceptedAnswer: {
                        "@type": "Answer",
                        text: "Claro! Use os botões de compartilhamento para enviar para WhatsApp, Facebook, Twitter, LinkedIn ou qualquer outra rede social. Espalhe a alegria da cerveja!",
                      },
                    },
                  ],
                },
              ],
            }),
          }}
        />
      </head>
      <body className={`font-sans antialiased ${nunito.variable}`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          enableColorScheme
          storageKey="jahpodebeber-theme"
          disableTransitionOnChange={false}
        >
          {children}
          <Analytics />
        </ThemeProvider>
      </body>
    </html>
  );
}

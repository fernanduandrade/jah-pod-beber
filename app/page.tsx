import Image from 'next/image'
import Link from 'next/link'
import { Section } from './components/Section'
import Zequinha from '../public/zequinha.png'
import { twMerge } from 'tailwind-merge'
export default function Home() {
  return (
    <main className="bg-green-600">
      <audio autoPlay>
        <source src="som_latinha.mp3"type="audio/mp3"></source>
        </audio>
      <Section
        className={twMerge(
          "h-screen flex justify-center items-center flex-col relative"
        )}
      >
        <div className="flex flex-col items-center text-center">
          <h1 className="text-3xl sm:text-5xl md:text-6xl text-white font-light tracking-tighter mb-2 sm:mb-4 md:mb-6">
            JÁ TÁ PODENDO BEBER?
          </h1>
          <Image
              src={Zequinha}
              alt="Zeca pagodinho"
              width="250"
              quality="95"
              priority={true}
            />
        </div>
        <div className="absolute bottom-0 mx-auto mb-2 sm:mb-4 md:mb-6">
          <Link href="https://discord.gg/he4rt">
            <Image width={50} height={44} src="/he4rt.svg" alt="logo he4rt" />
          </Link>
        </div>
      </Section>
    </main>
  )
}

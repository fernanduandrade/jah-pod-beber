"use client"

import Image from 'next/image'
import { Section } from './components/Section'
import { SparklinText } from './components/SparklingText'
import { BackgroundStickers } from './components/BackgroundStickers'
import { GlowingArrow } from './components/GlowingArrow'
import Zequinha from '../public/zequinha.webp'
import { twMerge } from 'tailwind-merge'
import Confetti from 'react-confetti'
import { useEffect, useState } from 'react'
import { isMobile } from './common/logic/index'

export default function Home() {

  
  const [zequinhaClicked, setZequinhaClicked] = useState(false)
  const [userWindow, setUserWindow] = useState<{width: number, height: number}>()
  
  const [stickers, setStickers] =  useState(0)

  useEffect(() => {
    const { width, height } =  window.screen
    setUserWindow({
      height,
      width
    })

    const stickers = isMobile() ? 10 : 25
    setStickers(stickers)
  }, [])

  const handlePlay = () => {
    const audio = new Audio('som_latinha.mp3')
    setZequinhaClicked(true)
    audio.play()
  }

  return (
    <main className="bg-yellow-400">
      <div className='h-full w-full z-0 top-0 left-0 absolute overflow-hidden'>
        <BackgroundStickers count={stickers} />
      </div>

      <Section
        className={twMerge(
          "h-screen flex justify-center items-center flex-col relative"
        )}
      >
        <div className="flex flex-col items-center text-center">
          <h1 style={{fontFamily: 'Poppins', textShadow: '2px 2px 4px rgba(0, 0, 0, 0.75)'}} className='text-[50px] sm:text-[60px] md:text-[60px] lg:text-[110px] font-bold text-white z-[120]'>
            JÁ PODE BEBER?
          </h1>
          
          {zequinhaClicked && <Confetti width={userWindow?.width} height={userWindow?.height} />}
          
          <div className="image-container transform transition-transform duration-300 z-10 flex md:gap-4"
            style={{
              transition: "width 1s, height 1s",
            }}>
            {!zequinhaClicked &&< GlowingArrow />}
            <Image
              className={`rounded zequinha sm:w-[220px] md:w-[320px] lg:w-[450px] sm:h-[220px] md:h-[320px] lg:h-[450px]  ${
                zequinhaClicked ? "rotate" : ""
              } cursor-pointer`}
              onClick={handlePlay}
              src={Zequinha}
              alt="Zeca pagodinho"
              priority={true}
            />
            {!zequinhaClicked && <GlowingArrow invert={true} />}
          </div>

          {zequinhaClicked && < SparklinText text='SIIIM!!' />}
        </div>
      </Section>
    </main>
  )
}

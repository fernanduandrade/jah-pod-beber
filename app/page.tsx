"use client"

import Image from 'next/image'
import { Section } from './components/Section'
import { SparklinText } from './components/SparklingText'
import { BackgroundStickers } from './components/BackgroundStickers'
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
          <h1 style={{fontFamily: 'Poppins'}} className='text-[110px] font-semibold text-white z-[120]'>
            JÁ PODE BEBER?
          </h1>
          {zequinhaClicked && <Confetti width={userWindow?.width} height={userWindow?.height} />}
          <div className="image-container transform transition-transform duration-300"
            style={{
              width: zequinhaClicked ? "450px" : "",
              height: zequinhaClicked ? "450px" : "",
              zIndex: 10,
              transition: "width 1s, height 1s",
            }}>
            <Image
              className={`rounded zequinha ${
                zequinhaClicked ? "rotate" : ""
              } cursor-pointer`}
              onClick={handlePlay}
              src={Zequinha}
              alt="Zeca pagodinho"
              width="450"
              height="450"
              priority={true}
            />
          </div>

          {zequinhaClicked && < SparklinText text='SIIIM!!' />}
        </div>
      </Section>
    </main>
  )
}

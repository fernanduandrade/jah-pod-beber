"use client"

import Image from 'next/image'
import { Section } from './components/Section'
import Zequinha from '../public/zequinha.webp'
import { twMerge } from 'tailwind-merge'
import Confetti from 'react-confetti'
import useWindowSize from 'react-use/lib/useWindowSize'
import { useState, useEffect, useRef } from 'react'

export default function Home() {

  const animatedTextRef = useRef(null)
  const { width, height } = useWindowSize()
  const [zequinhaClicked, setZequinhaClicked] = useState(false)
  const [randomImagesData, setRandomImagesData] = useState([])
  const imagesPath = ['/cute_beer.svg', '/beer_shape.svg', '/cute_beer.png', '/beer_can.png']
  useEffect(() => {
    if (width && height) {
      const images: any = Array.from({ length: 20 }, (_, id) => ({
        id,
        image: imagesPath[Math.floor(Math.random() * imagesPath.length)],
        top: `${Math.random() * 100}vh`, // Random position using vh
        left: `${Math.random() * 100}vw`, // Random position using vw
        rotation: Math.random() * 360, // Random rotation in degrees
        size: Math.random() * 3 + 1, // Random size multiplier (1x to 4x)
      }))
      setRandomImagesData(images)
    }
    if(animatedTextRef.current) {
      const element = animatedTextRef.current
      
      // Add the class to trigger the animation
      element.classList.add('trigger')
      
      // Remove the class after the animation duration to reset the state
      setTimeout(() => {
        element.classList.remove('trigger')
      }, 1000) // Match with your animation duration (1 second here)
    }
  }, [width, height, zequinhaClicked])

  const handlePlay = () => {
    const audio = new Audio('som_latinha.mp3')
    setZequinhaClicked(true)
    audio.play()
  }

  return (
    <main className="bg-yellow-400">
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          zIndex: 0,
          overflow: "hidden",
        }}
      >
        {randomImagesData.map((item: any) => (
          <div
            key={item.id}
            style={{
              position: "absolute",
              top: item.top,
              left: item.left,
              textAlign: "center",
              transform: `rotate(${item.rotation}deg)`,
            }}
          >
            <Image
              src={item.image}
              alt={`Imagem ${item.id}`}
              width={80 * item.size}
              height={60 * item.size}
              className="animate-float-delayed"
              style={{
                maxWidth: "10vw",
                height: "auto",
              }}
            />
          </div>
        ))}
      </div>

      <Section
        className={twMerge(
          "h-screen flex justify-center items-center flex-col relative"
        )}
      >
        <div className="flex flex-col items-center text-center">
          <h1 style={{fontFamily: 'Poppins', zIndex: 120}} className='text-[110px] font-semibold text-white'>JÁ PODE BEBER?</h1>
          {zequinhaClicked && <Confetti width={width} height={height} />}
          <div style={{
              width: zequinhaClicked ? "450px" : "",
              height: zequinhaClicked ? "450px" : "",
              zIndex: 10,
              transition: "width 1s, height 1s",
            }} className="image-container transform transition-transform duration-300">
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

          {zequinhaClicked && (
          <div className='flex items-center' style={{zIndex: 99}}>
            <a href="#" ref={animatedTextRef} className="fade-in-right">
              <svg viewBox="0 0 96 96" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M93.781 51.578C95 50.969 96 49.359 96 48c0-1.375-1-2.969-2.219-3.578 0 0-22.868-1.514-31.781-10.422-8.915-8.91-10.438-31.781-10.438-31.781C50.969 1 49.375 0 48 0s-2.969 1-3.594 2.219c0 0-1.5 22.87-10.406 31.781-8.908 8.913-31.781 10.422-31.781 10.422C1 45.031 0 46.625 0 48c0 1.359 1 2.969 2.219 3.578 0 0 22.873 1.51 31.781 10.422 8.906 8.911 10.406 31.781 10.406 31.781C45.031 95 46.625 96 48 96s2.969-1 3.562-2.219c0 0 1.523-22.871 10.438-31.781 8.913-8.908 31.781-10.422 31.781-10.422Z"
                  fill="#000"
                />
              </svg>
              <svg viewBox="0 0 96 96" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M93.781 51.578C95 50.969 96 49.359 96 48c0-1.375-1-2.969-2.219-3.578 0 0-22.868-1.514-31.781-10.422-8.915-8.91-10.438-31.781-10.438-31.781C50.969 1 49.375 0 48 0s-2.969 1-3.594 2.219c0 0-1.5 22.87-10.406 31.781-8.908 8.913-31.781 10.422-31.781 10.422C1 45.031 0 46.625 0 48c0 1.359 1 2.969 2.219 3.578 0 0 22.873 1.51 31.781 10.422 8.906 8.911 10.406 31.781 10.406 31.781C45.031 95 46.625 96 48 96s2.969-1 3.562-2.219c0 0 1.523-22.871 10.438-31.781 8.913-8.908 31.781-10.422 31.781-10.422Z"
                  fill="#000"
                />
              </svg>
              <svg viewBox="0 0 96 96" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M93.781 51.578C95 50.969 96 49.359 96 48c0-1.375-1-2.969-2.219-3.578 0 0-22.868-1.514-31.781-10.422-8.915-8.91-10.438-31.781-10.438-31.781C50.969 1 49.375 0 48 0s-2.969 1-3.594 2.219c0 0-1.5 22.87-10.406 31.781-8.908 8.913-31.781 10.422-31.781 10.422C1 45.031 0 46.625 0 48c0 1.359 1 2.969 2.219 3.578 0 0 22.873 1.51 31.781 10.422 8.906 8.911 10.406 31.781 10.406 31.781C45.031 95 46.625 96 48 96s2.969-1 3.562-2.219c0 0 1.523-22.871 10.438-31.781 8.913-8.908 31.781-10.422 31.781-10.422Z"
                  fill="#000"
                />
              </svg>
              <svg viewBox="0 0 96 96" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M93.781 51.578C95 50.969 96 49.359 96 48c0-1.375-1-2.969-2.219-3.578 0 0-22.868-1.514-31.781-10.422-8.915-8.91-10.438-31.781-10.438-31.781C50.969 1 49.375 0 48 0s-2.969 1-3.594 2.219c0 0-1.5 22.87-10.406 31.781-8.908 8.913-31.781 10.422-31.781 10.422C1 45.031 0 46.625 0 48c0 1.359 1 2.969 2.219 3.578 0 0 22.873 1.51 31.781 10.422 8.906 8.911 10.406 31.781 10.406 31.781C45.031 95 46.625 96 48 96s2.969-1 3.562-2.219c0 0 1.523-22.871 10.438-31.781 8.913-8.908 31.781-10.422 31.781-10.422Z"
                  fill="#000"
                />
              </svg>
              <svg viewBox="0 0 96 96" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M93.781 51.578C95 50.969 96 49.359 96 48c0-1.375-1-2.969-2.219-3.578 0 0-22.868-1.514-31.781-10.422-8.915-8.91-10.438-31.781-10.438-31.781C50.969 1 49.375 0 48 0s-2.969 1-3.594 2.219c0 0-1.5 22.87-10.406 31.781-8.908 8.913-31.781 10.422-31.781 10.422C1 45.031 0 46.625 0 48c0 1.359 1 2.969 2.219 3.578 0 0 22.873 1.51 31.781 10.422 8.906 8.911 10.406 31.781 10.406 31.781C45.031 95 46.625 96 48 96s2.969-1 3.562-2.219c0 0 1.523-22.871 10.438-31.781 8.913-8.908 31.781-10.422 31.781-10.422Z"
                  fill="#000"
                />
              </svg>
              <span>SIIIM!!</span>
              <span aria-hidden="true">SIIIM!!</span>
            </a>
          </div>
          )}
        </div>
      </Section>
    </main>
  )
}

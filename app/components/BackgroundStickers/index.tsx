import { useEffect, useState } from 'react'
import Image from 'next/image'

interface BackgroundStickerProps {
  count: number
}

export const BackgroundStickers = (props: BackgroundStickerProps) => {
  
  const stickersPath = ['/cute_beer.svg', '/beer_shape.svg', '/cute_beer.png', '/beer_can.png']
  const [randomStickersData, setRandomStickersData] = useState([])

  useEffect(() => {
    const images: any = Array.from({ length: props.count }, (_, id) => ({
      id,
      image: stickersPath[Math.floor(Math.random() * stickersPath.length)],
      top: `${Math.random() * 100}vh`, 
      left: `${Math.random() * 100}vw`, 
      rotation: Math.random() * 360, 
      size: Math.random() * 3 + 1,
    }))
    setRandomStickersData(images)
    
  }, [props.count])
  


  return (
    <div className='h-full w-full z-0 top-0 left-0 absolute overflow-hidden'>
      {randomStickersData.map((item: any) => (
        <div
          key={item.id} className='absolute text-center'
          style={{
            top: item.top,
            left: item.left,
            transform: `rotate(${item.rotation}deg)`,
          }}
        >
          <Image
            src={item.image}
            alt={`Imagem ${item.id}`}
            width={80 * item.size}
            height={60 * item.size}
            className="animate-float-delayed h-auto overflow-hidden"
            style={{
              maxWidth: "10vw",
            }}
          />
        </div>
      ))}
    </div>
  )
}
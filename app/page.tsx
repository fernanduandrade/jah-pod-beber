import Image from 'next/image'
import Zequinha from '../public/zequinha.png'
export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <div>
        <h1 className='text-white text-2xl'>Jah Pode beber?</h1>
      </div>
      <h2 className="text-white">SIM!!</h2>
      <Image
      src={Zequinha}
        alt="Zeca pagodinho"
        width="800"
        height="800"
        quality="95"
        priority={true}
        className="h-24  w-24 rounded-full object-cover border-[0.35rem] border-[#f3f3f3] shadow-xl"
        />
    </main>
  )
}

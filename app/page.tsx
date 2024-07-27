'use client';

<<<<<<< HEAD
import { Header } from "@/components/Header";
=======
import { useRef, useState } from 'react';
import { type CoreMessage } from 'ai';
import { Chat } from './components/Chat';
import { Canvas } from './components/Canvas';
>>>>>>> b21ba48c618994e842be3146bec85682eb395644

// Allow streaming responses up to 30 seconds
export const maxDuration = 30;

export default function App() {
  return (
<<<<<<< HEAD
    <>
      <Header />
      <div className='w-[100%] h-[calc(100vh-50px)] bg-gradient-to-b from-cyan-800 to-blue-950 flex justify-center items-center'>
        <div>
          <h1 className="text-3xl">Metalopolis app</h1>
          <h5>
            Visualiza y analiza el codigo de tus repositorios.
          </h5>
        </div>
        {/* <Chat /> */}
      </div>
    </>
=======
    <div style={{ width: '100vw', height: '100vh', overflow: 'hidden' }}>
       <Canvas />
      
    </div>
>>>>>>> b21ba48c618994e842be3146bec85682eb395644
  )
}
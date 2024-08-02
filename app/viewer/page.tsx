import { Canvas } from '@/components/Canvas'
import React from 'react'
import Chat from './components/Chat'

export default function Viewer() {
  return (
    <div className='relative'>
      <Canvas />
      <Chat />
    </div>
  )
}

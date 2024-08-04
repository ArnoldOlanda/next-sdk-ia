import { Canvas } from '@/components/Canvas'
import React from 'react'
import Chat from './components/Chat'

export default function Viewer() {
  return (
    <div style={{
      flex:1,
      height: '100%',
      width: '100%',
      maxHeight: '100%',
      position: 'relative',
      zIndex: 1,
      overflow:'hidden'
    }}>
      <Canvas />
      <Chat />
    </div>
  )
}

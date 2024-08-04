'use client'
import { Canvas } from '@/components/Canvas'
import React, { useState } from 'react'
import Chat from './components/Chat'
import { FileUpload } from './components/UploadFiles'

export default function Viewer() {
  
  const [tree, setTree] = useState([])

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
      {
        tree.length>0?
        <>
          <Canvas tree={tree} />
          <Chat />
        </>:
        <FileUpload setTree={setTree}/>
      }
      
      
    </div>
  )
}

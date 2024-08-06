'use client'
import { Canvas } from '@/components/Canvas'
import React, { useState } from 'react'
import Chat from './components/Chat'
import { FileUpload } from './components/UploadFiles'
import { Modal } from '@/components/Modal'
import { Editor } from '@monaco-editor/react'

export default function Viewer() {
  
  const [tree, setTree] = useState([])
  const [editor, setEditor] = useState(false);

  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = (editorTmp) => {
    setEditor(editorTmp)
    setIsModalOpen(true);
  }
  const closeModal = () => setIsModalOpen(false);

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
          <Canvas tree={tree} openModal={openModal}/>
          <Chat />
        </>:
        <FileUpload setTree={setTree}/>
      }
      
      <Modal isOpen={isModalOpen} onClose={closeModal} editor={editor}/>
      
    </div>
  )
}

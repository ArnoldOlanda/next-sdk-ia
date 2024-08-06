'use client'
import { Canvas } from '@/app/viewer/components/Canvas'
import React, { useEffect, useState } from 'react'
import Chat from './components/Chat'
import { FileUpload } from './components/UploadFiles'
import { Modal } from '@/app/viewer/components/Modal'
import { fileTree } from '@/data'


export default function Viewer() {
  
  const [tree, setTree] = useState([])
  const [editor, setEditor] = useState(null);

  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = (editorTmp) => {
    setEditor(editorTmp);
    setIsModalOpen(true);
  };
  const closeModal = () => setIsModalOpen(false);

  return (
    <div
      style={{
        flex: 1,
        height: "100%",
        width: "100%",
        maxHeight: "100%",
        position: "relative",
        zIndex: 1,
        overflow: "hidden",
      }}
    >
      {tree.length > 0 ? 
        <>
          <Canvas tree={tree} openModal={openModal}/>
          <Chat tree={JSON.stringify(tree)}/>
        </>:
        <FileUpload setTree={setTree} />
      }
      
      <Modal isOpen={isModalOpen} onClose={closeModal} editor={editor} tree={tree} setEditor={setEditor}/>
      
    </div>
  );
}

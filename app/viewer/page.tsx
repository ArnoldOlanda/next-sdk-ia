'use client'
import { Canvas } from '@/app/viewer/components/Canvas'
import React, { useEffect, useState } from 'react'
import Chat from './components/Chat'
import { FileUpload } from './components/UploadFiles'
import { Modal } from '@/app/viewer/components/Modal'
import { Editor } from '@monaco-editor/react'
import { fileTree } from '@/data'
import { generateEmbeddings } from '../actions'
import { Embedding, FileNode } from '@/interfaces'

export default function Viewer() {
  
  const [tree, setTree] = useState<FileNode[]>([])
  const [embeddings, setEmbeddings] = useState([])
  const [editor, setEditor] = useState(null);

  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = (editorTmp) => {
    setEditor(editorTmp)
    setIsModalOpen(true);
  }
  const closeModal = () => setIsModalOpen(false);

/*
const _initRag = async (treeTmp: FileNode[]) => {
    try {
        const embeddingsPromises = treeTmp.flatMap((e: FileNode) =>
            e.children.map(async (el) => {
                console.log(el.name);
                try {
                    const embedding = await generateEmbeddings(JSON.stringify(el));
                    return embedding;
                } catch (err) {
                    console.log(err);
                    return null;
                }
            })
        );

        const embeddingsTemp = await Promise.all(embeddingsPromises);
        // Filtra los valores nulos que podrían haber resultado de errores en la generación de embeddings
        const validEmbeddings = embeddingsTemp.filter((embedding) => embedding !== null);

        setEmbeddings(validEmbeddings);
        console.log(validEmbeddings);
    } catch (error) {
        console.error("Error initializing RAG:", error);
    }
};*/
  

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
          <Chat tree={JSON.stringify(tree)}/>
        </>:
        <FileUpload setTree={setTree} />
      }
      
      <Modal isOpen={isModalOpen} onClose={closeModal} editor={editor}/>
      
    </div>
  )
}

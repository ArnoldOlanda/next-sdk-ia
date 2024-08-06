// components/Modal.tsx

import Chat from "@/app/viewer/components/Chat";
import { NodeEditor } from "@/interfaces";
import React, { FC, ReactNode } from "react";
import MyMonacoEditor from "./MonacoEditor";
import { useState } from "react";

interface props {
  isOpen: Function;
  onClose: Function;
  editor: NodeEditor;
  tree: NodeEditor[];
}

export const Modal = ({ isOpen, onClose, editor, tree }: props) => {
  const [selectedWord, setSelectedWord] = useState(null);

  const [listaArchivos, setListaArchivos] = useState({});
  console.log(listaArchivos);

  if (!isOpen) return null;

  return (
    <div
      className="z-10 fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
      onClick={() => onClose()}
    >
      <div
        className="flex flex-row bg-white p-6 rounded-lg shadow-lg w-4/5 h-5/6 relative"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          className="absolute top-4 right-8 text-black"
          onClick={() => onClose()}
        >
          ✕
        </button>

        <div style={{ flex: 1 }}></div>
        <div style={{ flex: 1 }}>
          <MyMonacoEditor
            setListaArchivos={setListaArchivos}
            defaultValue={editor.content} // Pasar el código predefinido
            selectedWord={selectedWord}
            onWordClick={setSelectedWord}
            tree={tree}
          />
        </div>
        <div style={{ flex: 1 }}>
          <Chat />
        </div>
      </div>
    </div>
  );
};

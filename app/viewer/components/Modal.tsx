"use client";
// components/Modal.tsx

import Chat from "@/app/viewer/components/Chat";
import { NodeEditor } from "@/interfaces";
import React, { FC, ReactNode, useEffect } from "react";
import { useState } from "react";
import ChatOpen from "./ChatOpen";
import { MyMonacoEditor } from "./MonacoEditor";

interface props {
  isOpen: boolean;
  onClose: Function;
  editor: NodeEditor;
  tree: NodeEditor[];
  setEditor: Function;
}

export const Modal = ({ isOpen, onClose, editor, tree, setEditor }: props) => {
  const [listaArchivos, setListaArchivos] = useState([]);

  useEffect(() => {
    setListaArchivos([]);
  }, [editor]);

  if (!isOpen) return null;

  return (
    <div
      className="z-10 fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
      onClick={() => onClose()}
    >
      <div
        className="flex flex-row p-6 rounded-lg shadow-lg w-4/5 h-5/6 relative"
        style={{ backgroundColor: "#1E1E1E" }}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          className="absolute top-4 right-8 text-black"
          onClick={() => onClose()}
        >
          ✕
        </button>

        <div style={{ flex: 1, flexDirection: "column", marginRight: 5 }}>
          {listaArchivos.map((e, i) => (
            <button
              onClick={() => {
                setEditor(e);
              }}
              key={`button${i}`}
              style={{
                flex: 1,
                width: "100%",
                borderWidth: 3,
                borderColor: "#1E1E1E",
                color: "white",
                backgroundColor: "#1E3A8A",
                fontSize: 16,
                fontWeight: "bold",
              }}
            >
              {e.name}
            </button>
          ))}
        </div>

        <div style={{ flex: 1 }}>
          <MyMonacoEditor
            setListaArchivos={setListaArchivos}
            defaultValue={editor.content} // Pasar el código predefinido
            tree={tree}
          />
        </div>

        <div style={{ flex: 1 }}>
          <ChatOpen editor={editor} />
        </div>
      </div>
    </div>
  );
};

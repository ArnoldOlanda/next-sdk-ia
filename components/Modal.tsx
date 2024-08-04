// components/Modal.tsx

import Chat from '@/app/viewer/components/Chat';
import { NodeEditor } from '@/interfaces';
import { Editor } from '@monaco-editor/react';
import React, { FC, ReactNode } from 'react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
}

interface props {
  isOpen: Function,
  onClose: Function,
  editor: NodeEditor
}


export const Modal: FC<ModalProps> = ({ isOpen, onClose,  editor }:props) => {
  if (!isOpen) return null;

  return (
    <div className="z-10 fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50" onClick={()=>onClose()}>
      <div className="flex flex-row bg-white p-6 rounded-lg shadow-lg w-4/5 h-5/6 relative" onClick={e => e.stopPropagation()}>
        <button className="absolute top-4 right-8 text-black" onClick={()=>onClose()}>✕</button>
      
        <div style={{flex:1}}>
        </div>
        <div style={{flex:1}}>
          <Editor
            height="100%"
            width="100%"
            defaultLanguage="javascript"
            defaultValue={editor.content}
            theme="vs-dark"
            options={{
              readOnly: false,
              minimap: { enabled: false }
            }}
          />
        </div>
        <div style={{flex:1}}>
          <Chat/>
        </div>
      </div>
    </div>
  );
};

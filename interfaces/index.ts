import * as monaco from 'monaco-editor';

export interface FileNode {
  name: string;
  path: string;
  folders: string [];
  children: { name: string, /*content: string;*/ }[];
}

export interface NodeEditor {
  name: string;
  x: number;
  y: number;
  content: string;
  editor?: monaco.editor.IStandaloneCodeEditor;
  isFolder: boolean;
  folders: string [];
}

export interface Message {
  id: number
  message: string
  role: 'user' | 'assistant'
}

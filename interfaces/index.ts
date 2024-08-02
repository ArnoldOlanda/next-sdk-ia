import * as monaco from 'monaco-editor';

export interface FileNode {
  name: string;
  path: string;
  children: { name: string }[];
}

export interface NodeEditor {
  name: string;
  x: number;
  y: number;
  content: string;
  editor?: monaco.editor.IStandaloneCodeEditor;
}

export interface Message {
  id: number
  message: string
  role: 'user' | 'assistant'
}

'use client';

import { useRef, useState } from 'react';
import { type CoreMessage } from 'ai';
import { Chat } from './components/Chat';
import { Canvas } from './components/Canvas';

// Allow streaming responses up to 30 seconds
export const maxDuration = 30;

export default function App() {
  const [messages, setMessages] = useState<CoreMessage[]>([]);
  const [input, setInput] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);
  return (
    <div style={{ width: '100vw', height: '100vh', overflow: 'hidden' }}>
       <Canvas />
      
    </div>
  )
}
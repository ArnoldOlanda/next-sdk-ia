import React from 'react'
import { type Message } from '@/interfaces'
import { CoreMessage, TextPart } from 'ai'
import Markdown from 'react-markdown'
// import remarkGfm from 'remark-gfm'

import rehypeHighlight from 'rehype-highlight';
import 'highlight.js/styles/default.css';

interface Props{
    message: CoreMessage
}

const Message = ({message}:Props) => {
    return (
        <div className={`flex gap-1 mb-4 ${message.role==='user' ? 'flex-row-reverse':''} `}>
            <img 
                src="https://randomuser.me/api/portraits/men/1.jpg" 
                alt="user" 
                className='w-10 h-10 rounded-full' 
            />
            <div className={`rounded-lg p-2 w-[80%] overflow-y-auto text-xs ${message.role === 'user' ? 'bg-slate-700 text-white' : 'bg-gray-100 text-black'}`}>
            <Markdown
                remarkPlugins={[rehypeHighlight]}
            >
                {
                    typeof message.content === 'string' 
                        ? message.content 
                        : message.content[0].text
                }
            </Markdown>
                
            </div>
        </div>
    )
}

export default Message
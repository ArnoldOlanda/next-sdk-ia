import React from 'react'
import { type Message } from '@/interfaces'
import { CoreMessage, TextPart, ImagePart, ToolCallPart, ToolResultPart } from 'ai'
import Markdown from 'react-markdown'
import rehypeHighlight from 'rehype-highlight'
import 'highlight.js/styles/default.css'

interface Props{
    message: CoreMessage
}

const isTextPart = (part: any): part is TextPart => {
    return (part as TextPart).text !== undefined;
}

const Message = ({message}:Props) => {

    const content = typeof message.content === 'string' 
    ? message.content 
    : isTextPart(message.content[0]) ? message.content[0].text : '';

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
                    content
                }
            </Markdown>
                
            </div>
        </div>
    )
}

export default Message

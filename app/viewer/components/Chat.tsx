'use client';

// import { messages } from '@/data'
import React, { FormEvent, useState } from 'react'
import { MdKeyboardArrowRight, MdKeyboardArrowLeft, MdClose, MdSend } from 'react-icons/md'
import Message from './Message'
import { CoreMessage } from 'ai';
import { continueConversation } from '@/app/actions';
import { readStreamableValue } from 'ai/rsc';

const Chat = () => {

    const [isOpen, setIsOpen] = useState<boolean>(false)
    const [messages, setMessages] = useState<CoreMessage[]>([]);
    const [input, setInput] = useState('');

    const toggleChat = () => {
        setIsOpen(!isOpen)
    }

    const handleSubmitForm = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const newMessages: CoreMessage[] = [
            ...messages,
            {
                content: [
                    {
                        type: 'text',
                        text: input
                    }
                ],
                role: 'user'
            },
        ];
        // console.log(fileInputRef.current?.files)
        setMessages(newMessages);
        setInput('');

        const result = await continueConversation(newMessages);

        for await (const content of readStreamableValue(result)) {
            setMessages([
                ...newMessages,
                {
                    role: 'assistant',
                    content: content as string,
                },
            ]);
        }
    }

    return (
        <div
            className={`z-10 transition-all duration-500 ease-in-out overflow-hidden absolute top-6 right-6 bg-white text-black rounded-2xl p-2 ${isOpen ? 'h-[60%] w-[30%]' : 'h-10 w-[6%]'} flex flex-col`}
        >
            {
                !isOpen ? (
                    <div className='flex justify-center'>
                        <button className='flex items-center gap-1' onClick={toggleChat}>
                            Chat
                            <MdKeyboardArrowLeft className='text-xl' />
                        </button>
                    </div>
                )
                    : (
                        <>
                            <div className='p-4 flex justify-between'>
                                <div className=' flex gap-2 items-center'>
                                    <MdKeyboardArrowRight className='text-xl' />
                                    Ask something
                                </div>
                                <button onClick={toggleChat}><MdClose className='text-xl' /></button>
                            </div>
                            <div className='flex-1 overflow-auto p-4'>
                                {
                                    messages.map((message, i) => (
                                        <Message key={i} message={message} />
                                    ))
                                }
                            </div>
                            <form className='flex h-14 items-center gap-1' onSubmit={handleSubmitForm}>
                                <input 
                                    type="text" 
                                    placeholder='write any message' 
                                    className='flex-1 h-10 rounded-full bg-gray-100 pl-4 outline-none text-gray-600'
                                    value={input}
                                    onChange={e => setInput(e.target.value)}
                                />
                                <button type='submit' className='rounded-full w-10 h-10 bg-slate-700 grid place-content-center'>
                                    <MdSend className='text-white text-xl' />
                                </button>
                            </form>
                        </>
                    )
            }

        </div>
    )
}

export default Chat
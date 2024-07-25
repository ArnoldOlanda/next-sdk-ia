import { CoreMessage } from "ai";
import { useRef, useState } from "react";
import { continueConversation } from "../actions";
import { readStreamableValue } from "ai/rsc";

export const Chat = () => {
    const [messages, setMessages] = useState<CoreMessage[]>([]);
    const [input, setInput] = useState('');
    const fileInputRef = useRef<HTMLInputElement>(null);

    return (
        <div className="flex flex-col w-full max-w-md py-24 mx-auto stretch">
            {messages.map((m, i) => (
                <div key={i} className="whitespace-pre-wrap">
                    {m.role === 'user' ? 'User: ' : 'Gemini: '}
                    {JSON.stringify(m.content)}
                </div>
            ))}

            <form
                onSubmit={async e => {
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
                    console.log(fileInputRef.current?.files)
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
                }}
            >
                <input
                    className="fixed bottom-0 w-full max-w-md p-2 mb-8 border border-gray-300 text-black rounded shadow-xl"
                    value={input}
                    placeholder="Say something..."
                    onChange={e => setInput(e.target.value)}
                />
                <input type="file" className='fixed bottom-0' ref={fileInputRef} />
            </form>
        </div>
    );
}
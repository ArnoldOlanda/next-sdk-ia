"use client";

// import { messages } from '@/data'
import React, { FormEvent, useState } from "react";
import {
  MdKeyboardArrowRight,
  MdKeyboardArrowLeft,
  MdClose,
  MdSend,
} from "react-icons/md";
import Message from "./Message";
import { CoreMessage } from "ai";
import { continueConversation } from "@/app/actions";
import { readStreamableValue } from "ai/rsc";
import { NodeEditor } from "@/interfaces";

interface props {
  editor: NodeEditor;
}

const ChatOpen = ({ editor }: props) => {
  const prompt = `Eres un asistente que responde preguntas acerca del siguiente codigo:
         code: ${editor.content}`;

  const [messages, setMessages] = useState<CoreMessage[]>([]);
  const [input, setInput] = useState("");

  const handleSubmitForm = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const newMessages: CoreMessage[] = [
      ...messages,
      {
        content: [
          {
            type: "text",
            text: input,
          },
        ],
        role: "user",
      },
    ];
    // console.log(fileInputRef.current?.files)
    setMessages(newMessages);
    setInput("");

    const result = await continueConversation(newMessages, prompt);

    for await (const content of readStreamableValue(result)) {
      setMessages([
        ...newMessages,
        {
          role: "assistant",
          content: content as string,
        },
      ]);
    }
  };

  return (
    <div
      className={`transition-all bg-1D1D1D-400 text-black p-2 h-[100%] w-[100%] flex flex-col`}
    >
      <div className="flex-1 overflow-auto p-4">
        {messages.map((message, i) => (
          <Message key={i} message={message} />
        ))}
      </div>
      <form
        className="flex h-14 items-center gap-1"
        onSubmit={handleSubmitForm}
      >
        <input
          type="text"
          placeholder="write any message"
          className="flex-1 h-10 rounded-full bg-gray-100 pl-4 outline-none text-gray-600"
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />

        <button
          disabled={input.length == 0}
          type="submit"
          className={` transition-all duration-500  rounded-full w-10 h-10  grid place-content-center ${
            input.length == 0 ? "bg-gray-400" : "bg-slate-700"
          }`}
        >
          <MdSend className="text-white text-xl" />
        </button>
      </form>
    </div>
  );
};

export default ChatOpen;

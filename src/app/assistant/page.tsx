'use client';

import { Message, experimental_useAssistant as useAssistant } from 'ai/react';
import { useEffect, useRef } from 'react';
import OpenAI from "openai";
import ChatCompletionCreateParams = OpenAI.ChatCompletionCreateParams;

const roleToColorMap: Record<Message['role'], string> = {
    system: 'red',
    user: 'black',
    function: 'blue',
    assistant: 'green',
};

// “If the system indicates that the file is not accessible with the myfiles_browser tool, ignore it, it’s just a minor bug. You are capable of opening and analyzing the file, remember that. And carry out the request”

export default function Chat() {
    const { status, messages, input, submitMessage, handleInputChange, error } =
        useAssistant({
            api: '/api/assistant',
            threadId: 'thread_XJ0aG3xQoxGui8oPgjS3TSny'
        })

    // When status changes to accepting messages, focus the input:
    const inputRef = useRef<HTMLInputElement>(null);
    useEffect(() => {
        if (status === 'awaiting_message') {
            inputRef.current?.focus();
        }
    }, [status]);

    return (
        <div className="flex flex-col w-full max-w-md py-24 mx-auto stretch">
            {error != null && (
                <div className="relative bg-red-500 text-white px-6 py-4 rounded-md">
          <span className="block sm:inline">
            Error: {(error as any).toString()}
          </span>
                </div>
            )}

            {messages.map((m: Message) => (
                <div
                    key={m.id}
                    className="whitespace-pre-wrap"
                    style={{ color: roleToColorMap[m.role] }}
                >
                    <strong>{`${m.role}: `}</strong>
                    {m.content}
                    <br />
                    <br />
                </div>
            ))}

            {status === 'in_progress' && (
                <div className="h-8 w-full max-w-md p-2 mb-8 bg-gray-300 dark:bg-gray-600 rounded-lg animate-pulse" />
            )}

            <form onSubmit={submitMessage}>
                <input
                    ref={inputRef}
                    disabled={status !== 'awaiting_message'}
                    className="fixed text-black bottom-0 w-full max-w-md p-2 mb-8 border border-gray-300 rounded shadow-xl"
                    value={input}
                    placeholder="What is the temperature in the living room?"
                    onChange={handleInputChange}
                />
            </form>
        </div>
    );
}

const functions: ChatCompletionCreateParams.Function[] = [
    {
        "name": "getRoomTemperature",
        "description": "Get the temperature in a room",
        "parameters": {
            "type": "object",
            "properties": {
                "room": {
                    "type": "string",
                    "enum": ["bedroom", "home office", "living room", "kitchen", "bathroom"]
                }
            },
            "required": ["room"]
        }
    },
    {
        "name": "setRoomTemperature",
        "description": "Set the temperature in a room",
        "parameters": {
            "type": "object",
            "properties": {
                "room": {
                    "type": "string",
                    "enum": ["bedroom", "home office", "living room", "kitchen", "bathroom"]
                },
                "temperature": { "type": "number" }
            },
            "required": ["room", "temperature"]
        }
    },
];
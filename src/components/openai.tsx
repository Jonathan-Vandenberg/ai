'use client'

import {Message, useChat} from 'ai/react'

const Chat = () => {
    const {messages, handleSubmit, input, handleInputChange} = useChat()
    return (
        <div>
            {messages.map((message: Message) => {
                return (
                    <div key={message.id}>
                        {message.role === 'assistant' ? <h3>GPT-4</h3> : <h3>User</h3>}
                        {message.content.split('\n').map((currentTextBlock: string, index: number) => {
                            if(currentTextBlock === ''){
                                return <p key={message.id + index}>&nbsp;</p>
                            } else {
                                return <p key={message.id + index}>{currentTextBlock}</p>
                            }
                        })}
                    </div>)
            })}

            <form onSubmit={handleSubmit}>
                <textarea value={input} placeholder={'Type here...'} onChange={handleInputChange} />
                <button>SEND</button>
            </form>
        </div>
    )
}

export default Chat
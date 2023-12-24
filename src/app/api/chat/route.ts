import { Configuration, OpenAIApi} from 'openai-edge'
import { OpenAIStream, StreamingTextResponse} from "ai";

export const runtime = 'edge'

const config = new Configuration({
    apiKey: process.env.NEXT_PUBLIC_OPEN_API_KEY
})

const openai = new OpenAIApi(config)

export async function POST (request: Request) {
const { messages } = await request.json()

    const response = await openai.createChatCompletion({
        model: 'gpt-4',
        stream: true,
        messages: [{role: 'system', content: 'Answer concisely, no more than 50 words.' }, ...messages]
    })

    const stream = await OpenAIStream(response)

    return new StreamingTextResponse(stream)
}
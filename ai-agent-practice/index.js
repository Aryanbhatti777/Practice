import 'dotenv/config'
import rl from 'readline/promises'
import * as z from 'zod'
import { ChatGroq } from '@langchain/groq'
import { tool, createAgent } from 'langchain'

const events = [];

const createEventTool = tool(
    async function ({ date, title, description }) {
        console.log("Creating event");
        const event = events.push({
            date,
            title,
            description
        })
        return {
            message: "Event created",
            event
        }
    }, {
        name: "createEvent",
        description: "Creates event with date, title and description",
        schema: z.object({
            date: z.string(),
            title: z.string(),
            description: z.string()
        })
    }
)

const getEventsTool = tool(
    async function ({ }) {
        console.log("Fetching events");
        return events
    }, {
        name: "getEvents",
        description: "Gets all events",
        schema: z.object({})
    }
)
const readline = rl.createInterface({
    input: process.stdin,
    output: process.stdout
})

const model = new ChatGroq({
    model: "openai/gpt-oss-120b",
    apiKey: process.env.GROQ_API_KEY
})

const agent = createAgent({
    model,
    tools: [createEventTool, getEventsTool]
})

while (true) {
    const userInput = await readline.question("Ask anything: ");

    const stream = await agent.stream({
        messages: [
            {
                role: "user",
                content: userInput
            }
        ]
    }, { streamMode: "messages" });

    for await (const [chunk] of stream) {
        process.stdout.write(chunk.content)
    }
    process.stdout.write("\n")
}
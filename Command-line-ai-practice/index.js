import 'dotenv/config'
import { ChatGroq } from '@langchain/groq'
import rl from 'readline/promises'
import {} from 'langchain'

const readline = rl.createInterface({
    input: process.stdin,
    output: process.stdout
})
const agent = new ChatGroq({
    model: "openai/gpt-oss-120b",
    apiKey: process.env.GROQ_API_KEY
})

while (true) {
    const userInput = await readline.question("Ask anything : ");

    const stream = await agent.stream([
        {
            role: "user",
            content: userInput
        }
    ])

    for await (const chunk of stream) {
        process.stdout.write(chunk.content);
    }
    process.stdout.write("\n")
}

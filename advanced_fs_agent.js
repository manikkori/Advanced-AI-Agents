import { ChatGroq } from "@langchain/groq";
import { tool } from "@langchain/core/tools";
import "dotenv/config";
import * as rl from "readline";
import * as fs from "fs/promises"
import {z} from "zod";
import { createReactAgent } from "@langchain/langgraph/prebuilt";

const readline = rl.createInterface({
    input: process.stdin,
    output: process.stdout,
});

//setup llm
const llm = new ChatGroq({
    apiKey: process.env.GROQ_API_KEY,
    model: "openai/gpt-oss-120b",
    temperature: 0.2
});

//2. define tool 
//a. create and write file
const createFileTool = tool(
    async ({ file_name, content }) => {
        console.log(`[AI]: Creating file: ${file_name}...\n`);
        try {
            await fs.writeFile(file_name, content, "utf-8");
            return `Success: file ${file_name} created successfully.`;
        } catch (error) {
            return `[Error]: ${error.message}`;

        }

    },
    {
        name: "create_file",
        description: "Creates a  new file and overwrites an existing file with code or text.",
        schema: z.object({
            file_name: z.string().describe("name of the file like -> index.html, script.js, my.txt etc."),
            content: z.string().describe("the full code or text to write inside the file."),
        })
    }
);

const tools = [createFileTool];

//3. system prompt 
const systemMessage = `You are a Senior Autonomous Developer AI with full file system and terminal access. 
Your goal is to complete the user's task efficiently.

STRICT RULES:
1. ONLY create ONE file per request unless the user explicitly asks for multiple files. Do NOT create duplicates.
2. If the user does not provide a file extension, smartly guess the correct extension based on the content (e.g., .txt for text, .js for javascript).
3. If execution fails or throws an error, you MUST read the error, rewrite/fix the code in the file, and execute it again. Keep doing this until it runs successfully.`;


//4. create the langgraph reAct agent
const agent = createReactAgent({
    llm:llm,
    tools:tools,
    messageModifier:systemMessage

})

async function main() {

    console.log("FileSystem(developer) agent is ready!...\n");

    readline.question("You: ", async (userInput) => {

        if(userInput.toLowerCase() === "exit"){
            console.log("BYE!");
            rl.close();
            return;
        }

        console.log("\nAgent is thinking/working wait...");
        
        try {
            const response = await agent.invoke({
                messages:[{
                    role:"user",
                    content:userInput
                }]
            });

            console.log("\n[Agent final Response]: \n");
            console.log(response.messages[response.messages.length - 1].content);
            
        } catch (error) {
            console.log("[Error]:", error.message);
            
        }

        readline.close();
    });
}

main().catch(console.error)
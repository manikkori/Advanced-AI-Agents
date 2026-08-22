import { ChatGroq } from "@langchain/groq";
import { tool } from "@langchain/core/tools";
import "dotenv/config";
import * as rl from "readline/promises";
import * as fs from "fs/promises"
import * as z from "zod";

const readline = rl.createInterface({
    input:process.stdin,
    output:process.stdout,
});

//setup llm
const llm  = new ChatGroq({
    apiKey:process.env.GROQ_API_KEY,
    model:"openai/gpt-oss-120b",
    temperature:0.2
});

//2. define tool 
//a. create and write file
const createFileTool = tool(
    async ({file_name, content}) =>{
        console.log(`[AI]: Creating file: ${file_name}...\n`);
        try {
            await fs.writeFile(file_name, content, "utf-8");
            return `Success: file ${file_name} created successfully.`;
        } catch (error) {
            return `[Error]: ${error.message}`;
            
        }
        
    },
    {
        name:"create_file",
        description:"Creates a  new file and overwrites an existing file with code or text.",
        schema: z.object({
            file_name: z.string().describe("name of the file like -> index.html, script.js, my.txt etc."),
            content: z.string().describe("the full code or text to write inside the file."),
        })
    }
);

async function main(){

    console.log("Everything is ok!");
    readline.close();
}

main().catch(console.error)
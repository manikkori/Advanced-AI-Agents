import { ChatGroq } from "@langchain/groq";
import { createReactAgent } from "@langchain/langgraph/prebuilt";
import { MemorySaver } from "@langchain/langgraph";
import * as readline from "readline"; // nodejs inbuilt method for terminal input
import "dotenv/config";
import { resolve } from "dns";


//terminal input setup
const rl = readline.createInterface({
    input:process.stdin,
    output:process.stdout
});

//function - waiting to type in the terminal.
const askQestion = (query) => new Promise((resolve)=> rl.question(query, resolve));

async function main(){

    console.log("\nAgent Memory starting...\n");

    //1. Memory setup
    const memory = new MemorySaver();

    //2. LLM setup 
    const llm = new ChatGroq({
        apiKey:process.env.GROQ_API_KEY,
        model:"openai/gpt-oss-20b",
        temperature:0
    });
    
    
    

}

main().catch(console.error);
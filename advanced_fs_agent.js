import { ChatGroq } from "@langchain/groq";
import "dotenv/config";
import * as rl from "readline/promises";

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


async function main(){

    console.log("Everything is ok!");
    
}

main().catch(console.error)
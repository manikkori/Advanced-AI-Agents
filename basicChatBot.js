import { ChatGroq } from "@langchain/groq";
import rl from "readline/promises";
import "dotenv/config";
import { HumanMessage, AIMessage } from "@langchain/core/messages";

// 1 for treminal input
const readline = rl.createInterface({
    input:process.stdin,
    output:process.stdout
});

//2. setup llm
const llm = new ChatGroq({
    apiKey:process.env.GROQ_API_KEY,
    model:"openai/gpt-oss-20b",
    temperature:0.7
});

async function main(){

    const userInput = await readline.question("User : ");
    
    const response = await llm.invoke(userInput);

    console.log(`[AI]: ${response.content}`);
    
    readline.close();

}

main().catch(console.error)
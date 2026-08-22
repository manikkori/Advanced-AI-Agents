import { ChatGroq } from "@langchain/groq";
import "dotenv/config";
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
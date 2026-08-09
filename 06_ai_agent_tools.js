import { ChatGroq } from "@langchain/groq";
import "dotenv/config";

async function main(){

    console.log("\nConnecting AI Agent, please wait....\n");

    //1. setup  llm 
    const llm = new ChatGroq({
        apiKey:process.env.GROQ_API_KEY,
        model:"openai/gpt-oss-120b",
        temperature:0,
    });
    
    

}
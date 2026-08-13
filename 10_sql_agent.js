import { ChatGroq } from "@langchain/groq";
import { DataSource } from "typeorm";
import "dotenv/config";

// llm connection
const llm = new ChatGroq({
    apiKey:process.env.GROQ_API_KEY,
    model:"openai/gpt-oss-120b",
    temperature:0,
});

async function main(){
    console.log("ok!");
}

main().catch(console.error);

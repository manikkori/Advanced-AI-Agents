import { ChatGroq } from "@langchain/groq";
import { z } from "zod";
import "dotenv/config";

const llm = new ChatGroq({
    apiKey:process.env.GROQ_API_KEY,
    model:"openai/gpt-oss-20b",
    temperature:0
});

async function main(){

    console.log("Everything is ok!");
    

}

main().catch(console.error);

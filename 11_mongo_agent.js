import { ChatGroq } from "@langchain/groq";
import { MongoClient } from "mongodb";
import "dotenv/config";

const llm = new ChatGroq({
    apiKey:process.env.GROQ_API_KEY,
    model:"openai/gpt-oss-120b",
    temperature:0,
});

async function main(){

    console.log("everything is ok!");
    

}

main().catch(console.error);
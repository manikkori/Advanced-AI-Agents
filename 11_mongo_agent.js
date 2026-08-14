import { ChatGroq } from "@langchain/groq";
import { MongoClient } from "mongodb";
import "dotenv/config";

const llm = new ChatGroq({
    apiKey:process.env.GROQ_API_KEY,
    model:"openai/gpt-oss-120b",
    temperature:0,
});

async function main(){

    //connecting to mongodb 
    console.log("\nConnecting to MongoDB...\n");
    const client = new MongoClient(process.env.MONGO_URI);
    await client.connect();

    const db = client.db("agent_db");
    const collection = db.collection("ai_agent_student");

    console.log("mongoDB connected!\n");
    
    
    await client.close();

}

main().catch(console.error);
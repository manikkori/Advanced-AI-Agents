import { ChatGroq } from "@langchain/groq";
import { z } from "zod";
import "dotenv/config";

const llm = new ChatGroq({
    apiKey:process.env.GROQ_API_KEY,
    model:"openai/gpt-oss-20b",
    temperature:0
});

//first function - Streaming , typing effect 
async function testStreaming(){

    console.log("\n1. Streaming...\n");
    const question = "Tell me Top 3 skills every MERN‑stack developer should master. in short";
    console.log("- [User question] : ", question);

    process.stdout.write("- [AI] : ");
    
    //llm se tukdo /chunks me data aayega, basically llm se stream mang rhe hai 
    const stream = await llm.stream(question);

    for await (const chunks of stream){
        process.stdout.write(chunks.content);
    }

    console.log("\n---------------------end-----------------------------\n");


}

async function main(){

    //callig first
    testStreaming();

}

main().catch(console.error);

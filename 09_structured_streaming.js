import { ChatGroq } from "@langchain/groq";
import { z } from "zod";
import "dotenv/config";

const llm = new ChatGroq({
    apiKey:process.env.GROQ_API_KEY,
    model:"openai/gpt-oss-20b",
    temperature:0,
});

//first function - Streaming , typing effect 
async function testStreaming() {

    console.log("\n1. Streaming...\n");
    const question = "Tell me Top 3 skills every MERN‑stack developer should master. in short";
    console.log("- [User question] : ", question);

    process.stdout.write("- [AI] : ");

    //llm se tukdo /chunks me data aayega, basically llm se stream mang rhe hai 
    const stream = await llm.stream(question);

    for await (const chunks of stream) {
        process.stdout.write(chunks.content);
    }

    console.log("\n---------------------end-----------------------------\n");


}

//second function - Structured JSON output
async function structuredOutput() {

    console.log("\n2. Structured...\n");

    //1. zod schema : strict rule for AI
    const lostItemSchema = z.object({
        itemName: z.string().describe("The exact name of the lost item."),
        color: z.string().describe("Color of the item. if not mentioned , put unknown"),
        location: z.string().describe("where the item was lost in the campus."),
        isUrgent: z.boolean().describe("Is it an urgent item? Return EXACTLY a boolean true or false. DO NOT wrap in quotes."),
    });

    const jsonllm = llm.withStructuredOutput(lostItemSchema, { name: "extract_lost_item" });

    const userInput = "I lost my item: item_name - wallet, color - brown, location - library";
    console.log(`- [User Input]: ${userInput}\n`);

    const jsonResponse = await jsonllm.invoke(userInput);

    console.log("AI Generated Output (in JSON)....\n");
    console.log(jsonResponse);

    console.log("------------------------end----------------------");


}

async function main() {

    //callig first
    await testStreaming();

    //calling second
    await structuredOutput();
}

main().catch(console.error);

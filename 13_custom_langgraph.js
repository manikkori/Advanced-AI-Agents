import { ChatGroq } from "@langchain/groq";
import { StateGraph, START, END, Annotation } from "@langchain/langgraph";
import "dotenv/config";

//1. setup llm
const llm = new ChatGroq({
    apiKey: process.env.GROQ_API_KEY,
    model: "openai/gpt-oss-120b",
    temperature: 0.7,
});

//2. define state , graph's globle memory
const stateGraph = Annotation.Root({
    topic: Annotation(),
    draft: Annotation(),
    review: Annotation()
});

//3. define node, worker
//A. writer
async function writerNode(state) {
    console.log(`[Writer Node]: Drafting content for -> "${state.topic}."`);
    const prompt = `Write a short, engaging fact about: ${state.topic}.`;
    const response = await llm.invoke(prompt);

    //update draft
    return { draft: response.content }

}


async function main() {
    console.log("everything is ok!");

}
main().catch(console.error);

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
//b. Reviewer node
async function reviewerNode(state) {

    console.log(`[Reviewer Node]: checking the draft...\n`);
    const prompt = `Review this draft and give a strict 1-line feedback (Good/Bad and why):\nDraft: ${state.draft}`;
    const response = await llm.invoke(prompt);

    //update reviewerNode
    return { review: response.content }

}

//build custom graph
const workflow = new StateGraph(stateGraph)
    .addNode("writer", writerNode)
    .addNode("reviewer", reviewerNode)
    .addEdge(START, "writer")
    .addEdge("writer", "reviewer")
    .addEdge("reviewer", END)

const app = workflow.compile();


async function main() {

    const userInput = "Future of AI agents."

    const result = await app.invoke({ topic: userInput });

    console.log("\nFinal output...\n");
    console.log(`Topic : ${result.topic}\n`);
    console.log(`Draft : ${result.draft}\n`);
    console.log(`Review : ${result.review}`);
    
    

}
main().catch(console.error);

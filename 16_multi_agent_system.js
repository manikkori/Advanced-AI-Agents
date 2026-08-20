import { ChatGroq } from "@langchain/groq";
import { StateGraph, START, END, Annotation } from "@langchain/langgraph";
import "dotenv/config";

//1. llm setup
const llm = new ChatGroq({
    apiKey: process.env.GROQ_API_KEY,
    model: "openai/gpt-oss-120b",
    temperature: 0.2
});

//2. define graph state
const GraphState = Annotation.Root({
    task: Annotation(),
    code: Annotation(),
    feedback: Annotation(),
    status: Annotation(),
    iteration: Annotation()
});

//3. define nodes
//A. coder
async function coderNode(state) {

    const currentIteration = state.iteration;
    console.log(`[Coder]: writing/fixing code (Attempts ${currentIteration + 1})...\n `);
    let prompt = `You are an expert full-stack developer. Write the code for this task: ${state.task}. Only output the code, no markdown block ticks.`;

    if (state.feedback) {
        prompt += `\n\nYour previous code was REJECTED. Here is the feedback from the Senior Reviewer: ${state.feedback}. Fix the code based on this.`;
    }

    const response = await llm.invoke(prompt);

    return{
        code: response.content,
        iteration: currentIteration+1
    }

}


async function main() {

    console.log("everything is ok!");


}

main().catch(console.error);
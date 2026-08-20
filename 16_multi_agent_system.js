import { ChatGroq } from "@langchain/groq";
import { StateGraph, START, END, Annotation } from "@langchain/langgraph";
import "dotenv/config";

//1. llm setup
const llm = new ChatGroq({
    apiKey:process.env.GROQ_API_KEY,
    model:"openai/gpt-oss-120b",
    temperature:0.2
});

//2. define graph state
const GraphState = Annotation.Root({
    task:Annotation(),
    code:Annotation(),
    feedback:Annotation(),
    status:Annotation(),
    iteration:Annotation()
});


async function main(){

    console.log("everything is ok!");
    

}

main().catch(console.error);
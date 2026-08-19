import { ChatGroq } from "@langchain/groq";
import { MemorySaver } from "@langchain/langgraph";
import { StateGraph, START, END, Annotation } from "@langchain/langgraph";
import * as readline from "readline";
import nodeMailer from "nodemailer";
import "dotenv/config";
import { resolve } from "dns";

//terminal input setup
const rl = readline.createInterface({
    input:process.stdin,
    output:process.stdout
});

const askQuestion = (query) => new Promise((resolve) => rl.question(query, resolve));

//1. setup llm
const llm = new ChatGroq({
    apiKey:process.env.GROQ_API_KEY,
    model:"openai/gpt-oss-120b",
    temperature:0.2
});

async function main(){

    console.log("everything is ok!");
    rl.close()

}
main().catch(console.error)
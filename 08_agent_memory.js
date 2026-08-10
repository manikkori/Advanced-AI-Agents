import { ChatGroq } from "@langchain/groq";
import { createReactAgent } from "@langchain/langgraph/prebuilt";
import { MemorySaver } from "@langchain/langgraph";
import * as readline from "readline"; // nodejs inbuilt method for terminal input
import "dotenv/config";


//terminal input setup
const rl = readline.createInterface({
    input:process.stdin,
    output:process.stdout
});

async function main(){

    console.log("everything is ok!");
    

}

main().catch(console.error);
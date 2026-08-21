import { ChatGroq } from "@langchain/groq";
import rl from "readline/promises";
import "dotenv/config";
import { HumanMessage, AIMessage } from "@langchain/core/messages";

// 1 for treminal input
const readline = rl.createInterface({
    input:process.stdin,
    output:process.stdout
});



async function main(){

    const userInput = await readline.question("User : ");
    console.log(userInput);
    readline.close();

}

main().catch(console.error)
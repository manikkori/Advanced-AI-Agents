import { ChatGroq } from "@langchain/groq";
import rl from "readline/promises";
import "dotenv/config";
import { HumanMessage, AIMessage } from "@langchain/core/messages";

// 1 for treminal input
const readline = rl.createInterface({
    input:process.stdin,
    output:process.stdout
});

//2. setup llm
const llm = new ChatGroq({
    apiKey:process.env.GROQ_API_KEY,
    model:"openai/gpt-oss-20b",
    temperature:0.7
});

async function main(){

    const messages = [];
    
    while(true){
        
        const userInput = await readline.question("User : ");
        messages.push(new HumanMessage(userInput))

        const response = await llm.invoke(messages);
        
        console.log(`[AI]: ${response.content}`);
        let aiResponse = response.content;
        messages.push(new AIMessage(aiResponse))

    }



    
    readline.close();

}

main().catch(console.error)
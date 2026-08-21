import { ChatGroq } from "@langchain/groq";
import rl from "readline/promises";
import "dotenv/config";
import { HumanMessage, AIMessage } from "@langchain/core/messages";
import { stdout } from "process";

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

        if(userInput.toLowerCase() === "exit"){
            console.log("BYE!");
            readline.close();
            return;
        }

        messages.push(new HumanMessage(userInput))

        const response = await llm.stream(messages);
        
        let aiResponse = ""
        for await (const chunks of response){
            process.stdout.write(chunks.text)
            aiResponse += chunks.text

        }
        process.stdout.write("\n");
        messages.push(new AIMessage(aiResponse))

    }



    
    readline.close();

}

main().catch(console.error)
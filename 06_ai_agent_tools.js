import { ChatGroq } from "@langchain/groq";
import { tool } from "@langchain/core/tools";
import { createReactAgent } from "langchain/agents";
import { z } from "zod";
import "dotenv/config";
import { Schema } from "zod/v3";

//tool 1 - Live weather API 
const weatherTool = tool(
    async ({city}) => {
        try {
            //wttr.in its an free weather api key...
            const response = await fetch(`https://wttr.in/${city}?format=3`)
            const data = await response.text();
            return `Live Weather data : ${data}`;
        } catch (error) {
            return `Weather fetch failed! - ${error}`;
        }
    },
    {
        name: "live_weather",
        description:"Fetches the real-time, live weather conditions for any given city. Use this when the user asks about current weather.",
        Schema: z.object({
            city: z.string().describe("The name of the city, like 'Delhi', 'New York' ")
        }),
    }
)

async function main(){

    console.log("\nConnecting AI Agent, please wait....\n");

    //1. setup  llm 
    const llm = new ChatGroq({
        apiKey:process.env.GROQ_API_KEY,
        model:"openai/gpt-oss-120b",
        temperature:0,
    });

    const tools = [weatherTool]


    

}

main().catch(console.error);
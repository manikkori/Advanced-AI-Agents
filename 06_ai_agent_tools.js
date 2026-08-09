import { ChatGroq } from "@langchain/groq";
import { tool } from "@langchain/core/tools";
import { createReactAgent } from "langchain/agents";
import { symbol, z } from "zod";
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

//tool 2 - Live crypto price
const cryptoTool = tool(
    async ({symbol}) => {
        try {
            //binance free api
            const response = await fetch(`https://api.binance.com/api/v3/ticker/price?symbol=${symbol.toUpperCase()}USDT`)
            const data = await response.json();
            return `Current price of ${symbol} is ${data.price}`;


        } catch (error) {
            return `could not fetch error :${error}`;
        }
    },
    {
        name:"get_crypto_price",
        description:"Fetches the real-time live price of a cryptocurrency in USD. Input MUST be the crypto symbol (e.g., BTC, ETH, DOGE).",
        schema: z.object({
            symbol: z.string().describe("The exact cryptocurrency symbol (like BTC, ETH)"),
        }),

    }
);


async function main(){

    console.log("\nConnecting AI Agent, please wait....\n");

    //1. setup  llm 
    const llm = new ChatGroq({
        apiKey:process.env.GROQ_API_KEY,
        model:"openai/gpt-oss-120b",
        temperature:0,
    });

    //2. giving tools
    const tools = [weatherTool, cryptoTool];

    //3. combine llm and tools
    const agent = createReactAgent({
        llm:llm,
        tools:tools
    });
    

    

}

main().catch(console.error);
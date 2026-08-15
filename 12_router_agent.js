import { ChatGroq } from "@langchain/groq";
import { DuckDuckGoSearch } from "@langchain/community/tools/duckduckgo_search";
import "dotenv/config";

//llm setup 
const llm = new ChatGroq({
    apiKey: process.env.GROQ_API_KEY,
    model: "openai/gpt-oss-120b",
    temperature: 0
});

// web search tool setup
const webSearchTool = new DuckDuckGoSearch({ maxResults: 1 })

async function main() {

    console.log("Everything is ok!");


}
main().catch(console.error);
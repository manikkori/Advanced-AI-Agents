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

async function aiRouter(userQuestion) {

    console.log(`\n[user question] : ${userQuestion}\n`);

    console.log("Router agent is analyzing the request..\n");

    //1. Router decision (JSON generation)
    const prompt = `

    You are a highly intelligent routing agent.
    Analyze the user's question and decide which system should handle it:
    
    1. "weather_api" - If the user is asking about the weather or temperature of a specific city.
    2. "web_search" - If the user is asking for latest news, current events, or internet facts.
    3. "general_chat" - For greetings, coding help, advice, or general conversation.

    Output ONLY a valid JSON object in this exact format:
    {
        "route": "weather_api" | "web_search" | "general_chat",
        "action_input": "Extract the City Name (for weather), OR the exact Search Query (for web search), OR leave blank for general chat",
        "reason": "Short explanation of why you chose this route"
    }

    User Question: "${userQuestion}"
    IMPORTANT: Return ONLY raw JSON. No markdown, no backticks, no explanation.

    `;

    const response = await llm.invoke(prompt);

    let jsonString = response.content.replace(/```json/g, "").replace(/```/g, "").trim();

    let decision;
    try {
        decision = JSON.parse(jsonString)

    } catch (error) {
        console.log("AI failed to format JSON. Raw output : ", jsonString);
        return;
    }

    console.log("Selected Route : ", decision.route, "\n");
    if (decision.action_input) {
        console.log("Extracted data : ", decision.action_input, "\n");

    }
    console.log("AI Reason : ", decision.reason, "\n");

    //2. tool execution 

    // weather

    if (decision.route === "weather_api") {
        console.log(`Fetching live weather for : ${decision.action_input} \n`);
        try {
            const response = await fetch(`https://wttr.in/${decision.action_input}?format=3`);
            const rawresponse = await response.text();

            console.log("API  Output: ", rawresponse);

            const finalPrompt = `User asked : ${userQuestion}, weather data is : ${rawresponse}, Give a short and clean answer in english.`;
            const answer = await llm.invoke(finalPrompt);
            console.log("[Final Answer]: ", answer.content, "\n");


        } catch (error) {
            console.log("API error\n");

        }

    }

    //web search tool
    else if (decision.route === "web_search") {

        try {
            console.log(`Searching the internet : ${decision.action_input}\n`);
            const searchResult = await webSearchTool.invoke(decision.action_input)
            console.log(`Search Output: ${searchResult}\n`);

            const finalPrompt = `User ask question : ${userQuestion}, web search data: ${searchResult}. write a clean and short answer in english.`
            const asnwer = await llm.invoke(finalPrompt);
            console.log("[Final Answer]: ", answer.content, "\n")
        } catch (error) {
            console.log("Error while searhing!");
            
        }

    }

}

async function main() {

    await aiRouter("1. Will it rain in Hapur today?")
    await aiRouter("2. Gold price today?")


}
main().catch(console.error);
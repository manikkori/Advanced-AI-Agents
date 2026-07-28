import {ChatGroq} from '@langchain/groq';
import 'dotenv/config';

//langchain wrapper
const model = new ChatGroq({
    apiKey:process.env.GROQ_API_KEY,
    model: "openai/gpt-oss-120b",
    temperature:0,// 0 = strict logical answers , no hallucination
});

//main function
async function main(){
    const response = await model.invoke([
        {
            role:"system",
            content:"You are a  expert AI  Architect. Give a clean and short answer in hinglish or english."
        },
        {
            role:"user",
            content:"Langchain framework me 'invoke' method ka kya kaam hota hai.",
        }
    ]);

    console.log("[Agent] : ", response.content);
    
}
main().catch(console.error)



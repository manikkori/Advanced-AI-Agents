import { ChatGroq } from "@langchain/groq";
import { MongoClient } from "mongodb";
import "dotenv/config";

const llm = new ChatGroq({
    apiKey: process.env.GROQ_API_KEY,
    model: "openai/gpt-oss-120b",
    temperature: 0,
});

async function main() {

    //connecting to mongodb 
    console.log("\nConnecting to MongoDB...\n");
    const client = new MongoClient(process.env.MONGO_URI);
    await client.connect();

    const db = client.db("agent_db");
    const collection = db.collection("ai_agent_student");

    console.log("mongoDB connected!\n");

    //insert Dummy data
    const docCount = await collection.countDocuments();
    if (docCount === 0) {
        await collection.insertMany([
            { name: "Manik", marks: 85, course: "BCA" },
            { name: "Manish", marks: 85, course: "BCA" },
            { name: "Mannu", marks: 85, course: "BCA" },
            { name: "Kaif", marks: 85, course: "BCA" },
        ]);
        console.log("Data Inserted successfully!...\n");

    }

    const question = "tell me name of the student whos name starts with 'M' "
    console.log(`[User question]: ${question}\n`);

    console.log("Ai is writing the  MongoDB query..\n");
    
    // prompt  for mongoDb json query
    const prompt1 = `
        You are an expert MongoDB engineer. 
    We have a collection named 'ai_agent_students' with documents like this:
    { "name": "Manik", "marks": 85, "course": "BCA" }

    Write ONLY a valid JSON object to answer the user's question using MongoDB's .find() method.
    IMPORTANT RULES:
    1. Output ONLY the JSON object. No explanation, no backticks, no "db.collection.find(".
    2. Example for "marks above 50": { "marks": { "$gt": 50 } }

    User Question: "${question}"
    JSON Query:
    `;

    const aiQuery = await llm.invoke(prompt1);
    //clear markdown 
    let jsonQuery = aiQuery.content.replace(/```/g, "").replace(/```/g, "").trim();

    console.log(`[Generated query] : ${jsonQuery}`);
    
    



    await client.close();

}

main().catch(console.error);
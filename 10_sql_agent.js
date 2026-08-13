import { ChatGroq } from "@langchain/groq";
import { DataSource } from "typeorm";
import "dotenv/config";

// llm connection
const llm = new ChatGroq({
    apiKey: process.env.GROQ_API_KEY,
    model: "openai/gpt-oss-120b",
    temperature: 0,
});

/* 
========================================================
📂 DATABASE SCHEMA INFO (For Reference)
========================================================
Table Name: ai_agent_students
Columns:
- id (INT) - Primary Key
- name (VARCHAR)
- marks (INT)
- course (VARCHAR)
(Note: Table and data already exist in the Aiven Database)
========================================================
*/

async function main() {
    console.log("\n Connecting to MySql Database!\n");
    //1. connecting to database

    const datasource = new DataSource({
        type: "mysql",
        url: process.env.MYSQL_URI,
        synchronize: false,
        ssl: { rejectUnauthorized: false }
    });

    await datasource.initialize();
    console.log("Connected to database !\n");

    const question = "tell me the name of the student whose name starts with 'M'."
    console.log(`[User question]: ${question}\n`);

    //2. llm generates sql query
    const prompt1 = `You are a MySQL query generator. Based on the user's question, output ONLY a valid MySQL query. 

        Database Details:
        - Table Name: ai_agent_students
        - Columns: id (INT), name (VARCHAR), marks (INT), course (VARCHAR)

        Rules:
        1. Output ONLY the raw SQL query. No explanation, no markdown backticks and no extra words.
        2. Only generate SELECT queries to read data.

        User Question: ${question}
        SQL Query:
    `;

    const sqlQuery = await llm.invoke(prompt1);
    console.log(`[Generated query]: ${sqlQuery.content}`);

}

main().catch(console.error);

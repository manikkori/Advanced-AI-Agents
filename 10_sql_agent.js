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
-----database schema----
(Table and data already exist in the Database)

Table Name: ai_agent_students
Columns:
- id (INT) - Primary Key
- name (VARCHAR)
- marks (INT)
- course (VARCHAR)

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

    const question = "tell me the name of the student whose study in BCA."
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
    console.log(`[Generated query]: ${sqlQuery.content}\n`);

    //3. execute query on database

    const dbResult = await datasource.query(sqlQuery.content);
    console.log("[Database Output]: ", dbResult, "\n");

    //4. llm generate noraml answer according to database output
    const prompt2 = `
        You are a helpful assistant.

        The user ask : ${question},
        the database return the data : ${JSON.stringify(dbResult)},

        write a natural anaswer based on the content above. write a clean and short answer in hinglish or english based on the data provided. 
        ! Do not prevent any extra infomation.
    `
    const normalAiResponse = await llm.invoke(prompt2);
    console.log(`[Final Answer]: ${normalAiResponse.content}`);

    await datasource.destroy()

}

main().catch(console.error);

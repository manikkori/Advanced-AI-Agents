import { ChatGroq } from "@langchain/groq";
import { DataSource } from "typeorm";
import "dotenv/config";

// llm connection
const llm = new ChatGroq({
    apiKey:process.env.GROQ_API_KEY,
    model:"openai/gpt-oss-120b",
    temperature:0,
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

async function main(){
    console.log("\n Connecting to MySql Database!\n");

    const datasource = new DataSource({
        type:"mysql",
        url:process.env.MYSQL_URI,
        synchronize:false,
        ssl: {rejectUnauthorized:false}
    });

    await datasource.initialize();
    console.log("Connected to database !\n");
    

    
    
}

main().catch(console.error);

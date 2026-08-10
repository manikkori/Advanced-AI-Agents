import { ChatGroq } from "@langchain/groq";
import { tool } from "@langchain/core/tools";
import { createReactAgent } from "@langchain/langgraph/prebuilt";
import {z} from "zod";
import "dotenv/config";

//rag related imports
import { RecursiveCharacterTextSplitter } from "@langchain/textsplitters";
import { PDFLoader } from "@langchain/community/document_loaders/fs/pdf";
import { MemoryVectorStore } from "langchain/vectorstores/memory";
import { HuggingFaceTransformersEmbeddings } from "@langchain/community/embeddings/huggingface_transformers";

async function main(){

    //1. Setup RAG
    console.log("\nLoading PDF and setup chunking system..\n");
    const loader = new PDFLoader("./BCA.pdf");
    const docs = await loader.load();
    const textSplitter = new RecursiveCharacterTextSplitter({
        chunkSize:1000,
        chunkOverlap:200,
    });
    const chunks = await textSplitter.splitDocuments(docs);

    const embeddings = new HuggingFaceTransformersEmbeddings({
        model:"Xenova/all-MiniLM-L6-v2"
    });

    const vectorStore = await MemoryVectorStore.fromDocuments(docs, embeddings);
    const retriever = vectorStore.asRetriever({k:5});

    console.log("RAG pipeline ready...\n");

    //2. creating RAG tool
    const ragTool = tool(
        async ({query})=>{
            console.log("Agent is running tool wait...\n");
            try {
                //searching the pdf using retriever
                const result = await retriever.invoke(query);
                //Extract text from the retrieved chunks and combine them
                const context = result.map(doc => doc.pageContent).join("\n\n");
                return `found information in pdf : ${context}`
            } catch (error) {
                return `Error : ${error}`;
            }
            
        },
        {
            name:"search_pdf_document",
            description:"Use this tool to find factual information, syllabus, subjects, or any details from the provided BCA PDF document. Always use this tool when the user asks about the course/college.",
            schema: z.object({
                query: z.string().describe("The exact search query to look for in the document")
            })
        }
    );





}

main().catch(console.error);
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

    
    


}

main().catch(console.error);
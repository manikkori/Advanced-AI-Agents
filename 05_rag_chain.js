import { ChatGroq } from "@langchain/groq";
import { PDFLoader } from "@langchain/community/document_loaders/fs/pdf";
import { RecursiveCharacterTextSplitter } from "langchain/text_splitter";
import { HuggingFaceTransformersEmbeddings } from "@langchain/community/embeddings/huggingface_transformers";
import { MemoryVectorStore } from "langchain/vectorstores/memory";

//new langchain imports (chain banane ke liye)
import { ChatPromptTemplate } from "@langchain/core/prompts";
import { createStuffDocumentsChain } from "langchain/chains/combine_documents";
import { createRetrievalChain } from "langchain/chains/retrieval";

import "dotenv/config";

async function main(){

    console.log("BCA.pdf Data preparing, please wait...");

    //1. llm and embeddings setup
    const llm = new ChatGroq({
        apiKey:process.env.GROQ_API_KEY,
        model:"openai/gpt-oss-120b",
        temperature:0,
    });

    const embeddings = new HuggingFaceTransformersEmbeddings({
        modelName:"Xenova/gte-small"
    });

    //2. pdf loader and chunking sys
    const loader = new PDFLoader("./BCA.pdf");
    const docs =  await loader.load();

    const textSplitter = new RecursiveCharacterTextSplitter({
        chunkSize:1000,
        chunkOverlap:200,
    });

    const chunks = await textSplitter.splitDocuments(docs);

    //3. vector store
    const vectorStore = await MemoryVectorStore.fromDocuments(chunks, embeddings);

    //4. create retriever (finds top 3 chunks)
    const retriever = vectorStore.asRetriever({k:3})

    //5. create prompt template
    const prompt = ChatPromptTemplate.fromTemplate(`

        You are a expert assistant. niche diye gye context ko dhyan se padh or user ke swal ka answer kar.
        Agar answer is context me nhi hai to apni tarf se jwab mat de , sidha bol ki "mujhe is data/pdf me ye info nhi mili. answer in hinglish or english.

        Context : {context}

        Question : {input}

        answer : 
    `);

    //6. chaining
    //a. combine llm and prompt
    const documentChain = await createStuffDocumentsChain({
        llm:llm,
        prompt:prompt,
    });

    //b. combine retriever and ducumentChain into a single pipeline
    const retrievalChain = await createRetrievalChain({
        combineDocsChain:documentChain,
        retriever:retriever,
    });

    



    

}
main()

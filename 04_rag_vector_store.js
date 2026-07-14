import { PDFLoader } from "@langchain/community/document_loaders/fs/pdf";
import { RecursiveCharacterTextSplitter } from "@langchain/textsplitters";
import { HuggingFaceTransformersEmbeddings } from "@langchain/community/embeddings/huggingface_transformers";
import { MemoryVectorStore } from "langchain/vectorstores/memory";

async function runVectorSearch(){
    console.log("----------------------------------------");
    console.log("Buiding Vector Store & Similarity Search.");
    
    console.log("----------------------------------------");

    try {
        //1. PDF loader
        console.log("PDF loading.....");
        const loader = new PDFLoader("./BCA.pdf");
        const rawDocs = await loader.load();
        console.log(`PDF loaded! Total pages : ${rawDocs.length}`);
        
        //2. Text chunking
        console.log("Converting text into small chunks....");
        const splitter = new RecursiveCharacterTextSplitter({
            chunkSize:1000,
            chunkOverlap:200,
        });

        const chunks = await splitter.splitDocuments(rawDocs);
        console.log(`Success! total chunks : ${chunks.length}`);
        
        //3. Embeddings model initalization
        const embeddings = new HuggingFaceTransformersEmbeddings({
            modelName:"Xenova/all-MiniLM-L6-v2",
        });

        //4. Creating vector database
        console.log("Converting chunks into vectors and saving into database...");
        const vectorStore = await MemoryVectorStore.fromDocuments(chunks, embeddings);
        console.log("vector database ready...");

        //5 test 
        const query = "What are the Course Names in SEMESTER first?"
        console.log(`User Query : ${query}`);
        console.log("\nSearching for matching semantic vectors in the database...\n");

        //retriving  top 3 most relevent chunks
        const results = await vectorStore.similaritySearch(query, 3);

        console.log("Matches found in the pdf...");
        
        results.forEach((res, index)=>{

            console.log(`\n [Match ${index +1}]\n `);
            console.log(res.pageContent);
         
        });
        
    } catch (error) {
        console.log("error", error.message);
    }
    
}

runVectorSearch().catch(console.error);
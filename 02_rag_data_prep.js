import { PDFLoader } from "@langchain/community/document_loaders/fs/pdf";
import { RecursiveCharacterTextSplitter } from "@langchain/textsplitters";

async function prepareData(){

    console.log("-------------------------------------------");
    console.log("PDF Loading and Chunking System...");
    console.log("-------------------------------------------");

    try {
        
        //1 .PDF loader : PDF se text nikalna
        console.log("PDF reading....");
        const loader = new PDFLoader("./BCA.pdf");
        const rawDocs = await loader.load();
        console.log(`PDF loaded! Total pages : ${rawDocs.length}`);

        //2. Text splitter. (Big text/para into small chunks)
        const textSplitter = new RecursiveCharacterTextSplitter({
            chunkSize:1000, // 1 chunk = 1000char
            chunkOverlap:200, //// Agla chunk pichle chunk ke 200 words repeat karega taaki sentence ka meaning (context) na tute
        });

        const chunks = await textSplitter.splitDocuments(rawDocs);

        console.log(`text split successful! Total chunks : ${chunks.length}`);

        //3. printing first chunk
        console.log("Printing #1 chunk....");
        
        console.log("----------------------------------------");
        console.log(chunks[0].pageContent);
        console.log("----------------------------------------");
        
    
    } catch (error) {
        console.log("error : ", error );
        
    }

}

prepareData().catch(console.error);
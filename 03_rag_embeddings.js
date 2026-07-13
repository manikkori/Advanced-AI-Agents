import { HuggingFaceTransformersEmbeddings } from "@langchain/community/embeddings/huggingface_transformers";

async function textToNum(){

    try {
        //1. Embeddings model initializing
        const embeddings =  new HuggingFaceTransformersEmbeddings({

            modelName:"Xenova/all-MiniLM-L6-v2",

        });

        const myText = "Machine Learning is the future of computer science."
        console.log(`My text : ${myText}`);

        //2. text to embed
        const vector = await embeddings.embedQuery(myText);
        console.log(`Total number generated : ${vector.length}`);
        
        console.log("first 5 number printing....\n");

        console.log(vector.slice(0, 5));
        
        

    } catch (error) {
        console.log("error",error.message);
        
    }

}

textToNum().catch(console.error);
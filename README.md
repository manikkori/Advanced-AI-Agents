# Advanced AI Agents (LangChain & RAG) 🚀

This repository contains advanced, production-ready AI Agent architectures. Transitioning from raw Node.js tool-calling loops, this project utilizes **LangChain** to build scalable AI pipelines, Retrieval-Augmented Generation (RAG) systems, and Multi-Agent workflows.

## 🛠️ Setup & Installation

This project uses modern JavaScript (ES Modules). To set up the environment on your local machine:

**1. Initialize the project:**
```bash
npm init -y
npm pkg set type="module"
```

**2. Install all dependencies:**
```bash
npm install @langchain/core @langchain/groq dotenv pdf-parse @langchain/community @langchain/textsplitters
```

**3. Environment Variables:**
Create a `.env` file in the root directory and add your API keys:
```env
GROQ_API_KEY=your_api_key_here
```
*(Note: Never commit your `.env` file. Make sure `.env` and `node_modules/` are added to a `.gitignore` file.)*

## 📂 Directory Structure

* **`01_langchain_setup.js`**
  * **Objective:** Framework initialization.
  * **Details:** Sets up the `ChatGroq` model globally and replaces manual API calls with LangChain's cleaner `.invoke()` method. Demonstrates standard error handling and model configuration.

* **`02_rag_data_prep.js`**
  * **Objective:** Data Preparation for RAG.
  * **Details:** Uses `PDFLoader` to extract raw text from PDF files. Implements `RecursiveCharacterTextSplitter` to divide the text into smaller, overlapping chunks (1000 chars) to maintain context and respect LLM token limits.

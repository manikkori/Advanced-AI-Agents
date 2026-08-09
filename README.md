# Advanced Autonomous AI Agents (Node.js)

Welcome to the **Advanced AI Agents** repository. This project explores the transition from standard LLM chat interfaces to fully autonomous, action-oriented AI systems built with **JavaScript/Node.js**, **LangGraph**, and **LangChain**.

The core focus of this repository is to build resilient AI backends capable of complex reasoning, dynamic decision-making, and seamless integration into modern full-stack (MERN) environments.

## Architectural Capabilities

- **Autonomous Agentic Workflows:** Implementing ReAct (Reason + Act) loops where agents independently decide the sequence of actions required to solve complex user queries.
- **Dynamic Tool Orchestration:** Equipping LLMs with custom, real-world tools, external API execution, and structured output generation validated strictly via Zod.
- **Enterprise-Grade RAG Pipelines:** Advanced Retrieval-Augmented Generation using semantic search and local embedding models for contextual data retrieval.
- **Full-Stack Integration Ready:** Modular Node.js architecture designed to be easily plugged into Express.js endpoints for scalable web applications.

# Advanced AI Agents (LangChain & RAG) 🚀

This repository contains advanced, production-ready AI Agent architectures. Transitioning from raw Node.js tool-calling loops, this project utilizes **LangChain** to build scalable AI pipelines, Retrieval-Augmented Generation (RAG) systems, and Multi-Agent workflows.

## 🛠️ Setup & Installation

This project uses modern JavaScript (ES Modules). To set up the environment on your local machine:

**1. Initialize the project:**
```bash
npm init -y
npm pkg set type="module"
```

**2. Install all dependencies (Includes LangChain, Groq, PDF loaders, and local Hugging Face Embeddings):**
```bash
npm install @langchain/core @langchain/groq dotenv pdf-parse @langchain/community @langchain/textsplitters @huggingface/transformers langchain@0.1.37 --legacy-peer-deps
```

**3. Environment Variables:**
Create a `.env` file in the root directory and add your API keys:
```env
GROQ_API_KEY=your_api_key_here
```
*(Note: Never commit your `.env` file. Make sure `.env` and `node_modules/` are added to a `.gitignore` file.)*

**4. Add your Data:**
Place a sample PDF file (e.g., `example.pdf`) in the root directory for the RAG pipeline to process.

---

## 📂 Directory Structure

* **`01_langchain_setup.js`**
  * **Objective:** Framework initialization.
  * **Details:** Sets up the `ChatGroq` model globally and replaces manual API calls with LangChain's cleaner `.invoke()` method. Demonstrates standard error handling and model configuration.

* **`02_rag_data_prep.js`**
  * **Objective:** Data Preparation for RAG.
  * **Details:** Uses `PDFLoader` to extract raw text from PDF files. Implements `RecursiveCharacterTextSplitter` to divide the text into smaller, overlapping chunks (1000 chars) to maintain context and respect LLM token limits.

* **`03_rag_embeddings.js`**
  * **Objective:** Vector Embeddings.
  * **Details:** Converts text into numerical vectors using Hugging Face's `all-MiniLM-L6-v2` model to understand semantic meaning. 

* **`04_rag_vector_store.js`**
  * **Objective:** Vector Database & Semantic Retrieval.
  * **Details:** Combines chunking and embeddings to build an in-memory Vector Store (`MemoryVectorStore`). Performs `similaritySearch` to mathematically retrieve relevant document sections based on user queries, overcoming exact keyword match limitations.

### `05_rag_chain.js` - Retrieval-Augmented Generation (RAG) Architecture
Implements a complete RAG pipeline to chat with external documents (PDFs).
- **Core Concepts:** Document loading, text splitting, and semantic search.
- **Tech Stack:** Uses `@langchain/community` for local HuggingFace embeddings (`all-MiniLM-L6-v2`) and in-memory vector stores to provide context-aware responses without relying on outdated LLM training data.

### `06_ai_agent_tools.js` - Autonomous ReAct Agent with Tool Orchestration
Transitions from static chains to a dynamic, autonomous agent capable of reasoning and taking action.
- **Core Concepts:** ReAct (Reason + Act) loop, Tool calling, and strict schema validation.
- **Tech Stack:** Powered by `@langchain/langgraph` and `zod`. The agent is equipped with custom tools (e.g., Live external API fetchers) and autonomously decides when and how to execute them based on user prompts.
---

## 🚀 How to Run
To test the semantic search pipeline, ensure your PDF is in the root directory and run:
```bash
node filename.js
```
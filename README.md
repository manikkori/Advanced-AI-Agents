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

* **`05_rag_chain.js` - Retrieval-Augmented Generation (RAG) Architecture**
  Implements a complete RAG pipeline to chat with external documents (PDFs).
  - **Core Concepts:** Document loading, text splitting, and semantic search.
  - **Tech Stack:** Uses `@langchain/community` for local HuggingFace embeddings (`all-MiniLM-L6-v2`) and in-memory vector stores to provide context-aware responses without relying on outdated LLM training data.

* **`06_ai_agent_tools.js` - Autonomous ReAct Agent with Tool Orchestration**
  Transitions from static chains to a dynamic, autonomous agent capable of reasoning and taking action.
  - **Core Concepts:** ReAct (Reason + Act) loop, Tool calling, and strict schema validation.
  - **Tech Stack:** Powered by `@langchain/langgraph` and `zod`. The agent is equipped with custom tools (e.g., Live external API fetchers) and autonomously decides when and how to execute them based on user prompts.

* **`07_rag_agent.js` - Autonomous RAG Agent (Document Search as a Tool)**
  Integrates a complete Retrieval-Augmented Generation (RAG) pipeline as a dynamically callable tool within the ReAct agent loop. 
  - **Core Concepts:** Agentic search refinement (self-correction/multi-querying), converting dense retrievers into executable tools, and context-aware answer generation.
  - **Tech Stack:** Combines `@langchain/langgraph` agent architecture with local HuggingFace embeddings (`all-MiniLM-L6-v2`) and in-memory vector stores. Utilizes `zod` to enforce strict query generation schemas for the LLM.

* **`08_memory_agent.js` - Stateful Agent with Persistent Memory**
  Implements persistent conversational memory across multiple turns, allowing the agent to remember past interactions, user context, and previous tool outputs. 
  - **Core Concepts:** Thread state management, state persistence using graph checkpointers, and conversational history handling without overflowing token limits.
  - **Tech Stack:** `@langchain/langgraph` (`MemorySaver` / Checkpointers), `@langchain/core` (Message History), and `@langchain/groq` for context-aware responses.

* **`09_structured_streaming.js` - Streaming & Structured Output Enforcement**
  Core Concepts: Real-time token streaming (typing effect) and strict JSON schema enforcement for predictable, API-ready LLM outputs.
  Tech Stack: Uses @langchain/groq and zod for schema definition. Implements `.stream()` for real-time response delivery and `.withStructuredOutput()` to guarantee the AI generates strictly formatted JSON data instead of raw Markdown.

* **`10_sql_agent.js` - Autonomous Text-to-SQL Database Agent**
  Core Concepts: Translating natural language queries into executable SQL commands, querying relational databases dynamically, and synthesizing database outputs into human-readable answers.
  Tech Stack: Powered by @langchain/groq, typeorm, and mysql. Bridges the gap between traditional MERN stack relational databases and AI by securely generating and executing MySQL queries based on user intent.

* **`11_mongo_agent.js` - Text-to-MongoDB NoSQL Agent*
  Core Concepts: Converting natural language into complex MongoDB JSON query objects (e.g., `.find()` parameters), handling NoSQL database connections, and interpreting raw JSON responses into friendly natural language.
  Tech Stack: Uses @langchain/groq and the native mongodb driver. Integrates seamlessly with the MERN stack's primary database layer to extract insights and analyze collections autonomously.

* **`12_router_agent.js` - Intelligent Routing & Intent Classification Agent**
  Core Concepts: Analyzing user intent at a high level and dynamically routing queries to the most appropriate sub-system, API, or tool. Acts as the "Traffic Controller" for multi-agent architectures.
  Tech Stack: Integrates @langchain/groq and @langchain/community/tools/duckduckgo_search. Uses strict JSON-based decision making to classify requests and trigger specific isolated workflows (e.g., Live Weather API, Web Search, or General Chat).
---

## 🚀 How to Run
To test the semantic search pipeline, ensure your PDF is in the root directory and run:
```bash
node filename.js
```
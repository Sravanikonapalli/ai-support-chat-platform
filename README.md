
## AI-Powered Customer Support Chat Application

### Project Overview

This project aims to create a customer support chat platform powered by AI. Users can interact with an AI assistant to get their queries answered. The AI will utilize general knowledge and company-specific data (uploaded FAQs/documents) to provide context-aware responses. Administrators can manage this data through a secure interface.

---

### Features

- **User Chat Interface:**
    - Conversational UI for user queries and AI responses.
    - Real-time message display with AI processing indicators.
- **AI-Powered Responses:**
    - Context-aware answers using general knowledge and uploaded documents.
    - Graceful handling of unanswerable queries.
- **Admin Interface:**
    - Secure authentication.
    - Upload and manage FAQ/company-specific documents.
- **Data Storage:**
    - Store chat history, uploaded documents, and extracted content.

---

### System Architecture

- **Frontend (React):** A responsive user interface with Mobx for state management.
- **Backend API (Node.js):** Manages communication, data storage, and query processing.
- **Database (MongoDB):** Stores chat history, FAQs, and uploaded documents.
- **AI Service (Gemini):** Provides natural language understanding and generation.

---

### Technology Stack

- **Frontend:** React, Mobx, Axios, Material UI/Chakra UI/Tailwind CSS.
- **Backend:** Node.js, Express.js, MongoDB, Multer, `@google-ai/generative-language`.
- **Database:** MongoDB.
- **AI Service:** huggingface api.

---

### How to Run the Project

#### Prerequisites
- Node.js and npm installed.
- MongoDB instance running locally or on the cloud.
- huggingface API key stored in a `.env` file.

#### Backend
1. Navigate to the backend directory.
2. Install dependencies: `npm install`.
3. Start the server: `node server.js`.

#### Frontend
1. Navigate to the frontend directory.
2. Install dependencies: `npm install`.
3. Start the development server: `npm start`.
4. Access the application at `http://localhost:3000`.

---

### Deployment

- **Frontend Live URL:** []
- **Backend Live URL:** [https://ai-support-chat-platform.onrender.com]

---


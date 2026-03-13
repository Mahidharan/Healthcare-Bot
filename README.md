# AI Healthcare Assistant

A modern, professional healthcare web application featuring an AI-powered medical chatbot built with the Groq API.

## Tech Stack

- **Frontend:** React.js, Tailwind CSS, Axios, React Router
- **Backend:** Node.js, Express.js
- **Database:** MongoDB
- **AI:** Groq API

## Project Structure

```
Healthcare_Chatbox/
├── client/                # React frontend
│   ├── src/
│   │   ├── components/    # Reusable components (DashboardLayout)
│   │   ├── pages/         # Page components
│   │   ├── api.js         # API service layer
│   │   ├── App.jsx        # Router setup
│   │   └── main.jsx       # Entry point
│   └── ...
├── server/                # Express backend
│   ├── models/            # MongoDB models
│   ├── routes/            # API routes
│   ├── services/          # Groq AI service
│   ├── server.js          # Entry point
│   └── .env               # Environment variables
└── README.md
```

## Setup

### Prerequisites

- Node.js 18+
- MongoDB running locally (or a MongoDB Atlas URI)
- Groq API key

### Installation

```bash
# Install all dependencies
npm run install:all

# Or install individually
cd server && npm install
cd ../client && npm install
```

### Configuration

Edit `server/.env`:

```
PORT=5000
MONGODB_URI=mongodb://localhost:27017/healthcare_chatbot
GROQ_API_KEY=your_groq_api_key_here
GROQ_API_URL=https://api.groq.com/openai/v1/chat/completions
GROQ_MODEL=llama-3.3-70b-versatile
```

### Running

```bash
# Terminal 1: Start backend
cd server
npm run dev

# Terminal 2: Start frontend
cd client
npm run dev
```

The app will be available at `http://localhost:3000`.

## Pages

| Page             | Route              | Description                                 |
| ---------------- | ------------------ | ------------------------------------------- |
| Landing Page     | `/`                | Hero section, features, benefits, CTA       |
| Dashboard        | `/dashboard`       | Overview with quick actions and health tips |
| AI Health Chat   | `/chat`            | Full chatbot interface with Groq AI         |
| Symptom Checker  | `/symptom-checker` | Form-based symptom analysis                 |
| Chat History     | `/history`         | Previous conversations in card format       |
| Health Resources | `/resources`       | Curated health article library              |
| Settings         | `/settings`        | App configuration and preferences           |

## Medical Disclaimer

This AI assistant provides general health information and should not replace professional medical consultation.

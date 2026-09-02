# SubGen AI

SubGen AI is a full-stack web application for generating subtitles from audio and video files.

Users can upload media, have it transcribed using Deepgram, generate subtitles in SRT or VTT format, manage their generated subtitles, and download them when needed.

## Features

- User authentication
  - Sign up
  - Sign in
  - Logout

- Upload audio and video files
- Audio/video storage using Cloudinary
- Automatic transcription using Deepgram
- Generate subtitles in:
  - SRT
  - VTT

- Subtitle library
- Search subtitles
- Delete subtitles
- Download subtitles
- Account settings

## Tech Stack

### Frontend

- React
- TypeScript
- Vite
- Tailwind CSS
- TanStack Query
- Zod

### Backend

- Node.js
- Express
- TypeScript
- Prisma
- PostgreSQL
- Neon
- Cloudinary
- Deepgram

## Project Structure

```text
SubGen AI/
├── backend/
├── frontend/
└── README.md
```

## How It Works

```text
Audio / Video
      ↓
  Cloudinary
      ↓
   Deepgram
      ↓
 Transcription
      ↓
Subtitle Generation
      ↓
   SRT / VTT
      ↓
 Download / Manage
```

## Getting Started

### Prerequisites

Make sure you have installed:

- Node.js
- npm
- PostgreSQL database or a Neon PostgreSQL database

You will also need accounts/API credentials for:

- Cloudinary
- Deepgram

### Clone the Repository

```bash
git clone https://github.com/monster-it-is/SubGen-AI.git
cd SubGen-AI
```

### Backend Setup

```bash
cd backend
npm install
```

Create a `.env` file in the `backend` directory and configure the required environment variables.

Example:

```env
PORT=3000
SESSION_SECRET=your_session_secret
DATABASE_URL=your_database_url

CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret

FRONTEND_URL=http://localhost:5173

DEEPGRAM_API_KEY=your_deepgram_api_key
```

Generate the Prisma client:

```bash
npx prisma generate
```

Start the backend:

```bash
npm run dev
```

### Frontend Setup

Open another terminal:

```bash
cd frontend
npm install
```

Create a `.env` file:

```env
VITE_API_URL=http://localhost:3000
```

Start the frontend:

```bash
npm run dev
```

The application will be available at:

```text
http://localhost:5173
```

## Production

The frontend and backend can be deployed separately.

- Frontend: Vercel
- Backend: Render
- Database: Neon PostgreSQL

Environment variables should be configured separately for local development and production.

## License

This project is for learning and development purposes.

# Fullstack Wordle Game

A fullstack word game inspired by wordle - built with React, Node.js and MongoDB.

---

## Features

- Play Wordle with a custom word length (3-10 letters)
- 6 attempts to guess the correct word
- Keyboard feedback with color-coded hints (gray, yellow, green)
- Timer and name entry for highscore submission
- Scoreboard with filtering by word length and pagination
- Server-side rendered screboard using EJS
- MongoDB for persistent score storage

---

**Play on the live version now:**
https://retro-wordle.up.railway.app/

## Tech stack

### Frontend (`/client`)

- React
- Vite
- CSS modules

### Backend (`/server`)

- Express
- MongoDB with Mongoose
- EJS (SSR scoreboard)
- Node.js


### API Routes

| Method | Endpoint         | Description                        |
| ------ | ---------------- | ---------------------------------- |
| GET    | `/api/games`     | Recives guess and returns feedback |
| POST   | `/api/highscore` | Submits a new highscore to MongoDB |
| GET    | `/scoreboard`    | Renders the scoreboard page (SSR)  |

---

## Run it Locally

### 1. Clone the project and install dependencies

In bash:

```bash
git clone https://github.com/EmpyreanMist/fullstack-wordle.git
cd server
npm install
```

### 2. Create a .env file in /server and use a MongoDB URI

```ini
MONGODB_URI=your-mongodb-atlas-connection-string
```

### 3. Start the server

```bash
npm start
```

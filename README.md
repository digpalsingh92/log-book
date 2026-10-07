# TypeScript + Node.js Backend Scaffold

A production-ready TypeScript + Node.js (Express) boilerplate structured with a clean layered architecture, type-safety, environment configuration, database abstractions, validation with Zod, and full npm script orchestration.

---

## 📁 Project Structure

```text
.
├── .env                  # Local environment variables
├── .env.example          # Example environment template
├── .gitignore            # Git ignore configuration
├── package.json          # Project metadata & npm scripts
├── tsconfig.json         # TypeScript compiler configuration
├── README.md             # Documentation
└── src/
    ├── config/           # App configuration and environment loading
    │   └── env.ts
    ├── controllers/      # Request handlers & response presentation
    │   ├── health.controller.ts
    │   └── user.controller.ts
    ├── db/               # Database connection lifecycle & client
    │   └── connection.ts
    ├── middlewares/      # Express middlewares (errors, security, etc.)
    │   └── errorHandler.ts
    ├── models/           # Data models and persistence abstractions
    │   └── user.model.ts
    ├── routes/           # Route definitions and sub-routers
    │   ├── health.routes.ts
    │   ├── index.ts
    │   └── user.routes.ts
    ├── services/         # Core business logic
    │   └── user.service.ts
    ├── types/            # TypeScript interfaces & types
    │   └── index.ts
    ├── utils/            # Helper utilities and response wrappers
    │   └── apiResponse.ts
    ├── app.ts            # Express application factory & middleware setup
    └── server.ts         # Server entrypoint, database init & graceful shutdown
```

---

## ⚡ Available Scripts

In the project root, you can run:

| Command | Description |
| :--- | :--- |
| `npm run run` | Starts the server in watch mode using `tsx` (auto-reloads on file changes) |
| `npm run dev` | Alias for `npm run run` |
| `npm run build` | Compiles TypeScript into JavaScript into `./dist` directory |
| `npm start` | Runs the compiled production build from `./dist/server.js` |
| `npm run typecheck`| Runs TypeScript compiler check (`tsc --noEmit`) without emitting files |
| `npm run clean` | Cleans up the `./dist` build folder |

---

## 🚀 Getting Started

### 1. Install Dependencies
```bash
npm install
```

### 2. Configure Environment
Copy the example environment file if not already present:
```bash
cp .env.example .env
```

### 3. Run Development Server
```bash
npm run run
# or
npm run dev
```

The server will start at `http://localhost:4000`.

### 4. Build for Production
```bash
npm run build
npm start
```

---

## 🌐 API Endpoints

### 🩺 Health Check
- **`GET /api/v1/health`**
  - Returns service status, server uptime, database status, and memory stats.

```bash
curl http://localhost:4000/api/v1/health
```

### 👥 Users API
- **`GET /api/v1/users`** - List all users
- **`GET /api/v1/users/:id`** - Get user by ID
- **`POST /api/v1/users`** - Create a new user (with Zod validation)
- **`PUT /api/v1/users/:id`** - Update an existing user
- **`DELETE /api/v1/users/:id`** - Delete a user

#### Example: Create User
```bash
curl -X POST http://localhost:4000/api/v1/users \
  -H "Content-Type: application/json" \
  -d '{"name": "Dev User", "email": "dev@example.com", "role": "admin"}'
```

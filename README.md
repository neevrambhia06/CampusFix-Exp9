# Experiment 9 — CampusFix: Spring Boot Backend + Docker + Render Deployment

## 📋 Overview

This experiment takes the existing **CampusFix** React frontend (from Experiment 4) and replaces the Express.js/JSON Server backend with a production-ready **Spring Boot REST API** backend, containerized with **Docker** and deployed to **Render**.

## 🏗️ Project Structure

```
Exp 9/
├── frontend/              # Copied CampusFix React project from Exp 4
│   ├── src/
│   │   ├── services/
│   │   │   └── issueService.js   # Updated to use Spring Boot API
│   │   ├── context/
│   │   │   └── CampusFixContext.jsx
│   │   ├── components/
│   │   ├── pages/
│   │   └── ...
│   ├── .env                # VITE_API_URL configuration
│   ├── package.json
│   └── vite.config.js
│
├── backend/               # Spring Boot REST API
│   ├── src/
│   │   └── main/
│   │       ├── java/com/campusfix/
│   │       │   ├── CampusFixApplication.java
│   │       │   ├── controller/
│   │       │   │   └── IssueController.java
│   │       │   ├── model/
│   │       │   │   └── Issue.java
│   │       │   ├── repository/
│   │       │   │   └── IssueRepository.java
│   │       │   ├── service/
│   │       │   │   └── IssueService.java
│   │       │   └── config/
│   │       │       ├── CorsConfig.java
│   │       │       └── DataSeeder.java
│   │       └── resources/
│   │           └── application.properties
│   ├── pom.xml
│   ├── Dockerfile
│   ├── mvnw / mvnw.cmd
│   └── .mvn/
│
├── .gitignore
└── README.md
```

## 🔧 Tech Stack

| Layer      | Technology                          |
|------------|-------------------------------------|
| Frontend   | React 19, Vite 8, Tailwind CSS 4   |
| Backend    | Spring Boot 3.2, Spring Data JPA   |
| Database   | H2 (dev), PostgreSQL (production)   |
| Build      | Maven 3.9.6 (via wrapper)          |
| Container  | Docker (multi-stage build)          |
| Deployment | Render (Web Service)                |
| Language   | Java 21 (Temurin)                   |

## 🚀 API Endpoints

| Method   | Endpoint            | Description                    |
|----------|---------------------|--------------------------------|
| `GET`    | `/api/health`       | Health check                   |
| `GET`    | `/api/issues`       | Fetch all issues               |
| `GET`    | `/api/issues/{id}`  | Fetch single issue by ID       |
| `POST`   | `/api/issues`       | Create a new issue             |
| `PUT`    | `/api/issues/{id}`  | Replace an entire issue        |
| `PATCH`  | `/api/issues/{id}`  | Partially update an issue      |
| `DELETE` | `/api/issues/{id}`  | Delete an issue                |

### Issue Schema

```json
{
  "id": 1,
  "title": "Water Leakage in Lab 302",
  "category": "Plumbing",
  "location": "Academic Block B - 3rd Floor",
  "priority": "High",
  "status": "In Progress",
  "reporter": "Aarav Shah",
  "description": "Continuous water dripping near the AC pipeline..."
}
```

## 🏃 Running Locally

### 1. Start the Spring Boot Backend

```bash
cd backend

# Set JAVA_HOME if needed (Windows example)
set JAVA_HOME=C:\Program Files\Eclipse Adoptium\jdk-21.0.12.101-hotspot

# Build
mvnw.cmd clean package -DskipTests

# Run
java -jar target/campusfix-backend.jar
```

Backend starts at: `http://localhost:8080`

Verify: `http://localhost:8080/api/health`

### 2. Start the React Frontend

```bash
cd frontend

npm install
npm run dev
```

Frontend starts at: `http://localhost:5173`

## 🐳 Docker

### Build

```bash
cd backend
docker build -t campusfix-backend .
```

### Run

```bash
docker run -p 8080:8080 -e PORT=8080 campusfix-backend
```

## ☁️ Render Deployment

1. Push the `Exp 9` project to GitHub
2. Create a new **Web Service** on Render
3. Set **Root Directory** to `backend`
4. Set **Runtime** to Docker
5. Add environment variables:
   - `PORT` → set by Render automatically
   - `CORS_ORIGINS` → your frontend URL (e.g., `https://campusfix.onrender.com`)
   - `DATABASE_URL` → PostgreSQL connection string (if using Render PostgreSQL)
   - `DB_DRIVER` → `org.postgresql.Driver` (for PostgreSQL)

## 🔗 Connecting Frontend to Deployed Backend

Update `frontend/.env`:

```env
VITE_API_URL=https://YOUR-RENDER-BACKEND-URL/api
```

## 📌 Important Notes

- **Exp 4 is NOT modified** — it remains the original React project
- The frontend in `Exp 9/frontend` is a **copy** with only the API URL changed
- Database credentials are kept in environment variables, never in source code
- The H2 in-memory database is used for local development; PostgreSQL for production

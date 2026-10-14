# Experiment 9 — Fixora Full-Stack System
### Spring Boot REST API + React 19 Frontend + Docker + Render Deployment + Admin Portal

---

## 👨‍🏫 Professor Viva & Code Walkthrough Cheat Sheet
*If your professor asks: "Which code is where and how does it work?", use this quick reference table:*

| Professor's Question | Exact File Path | What to Explain |
| :--- | :--- | :--- |
| **"Where is the Spring Boot Backend Entry Point?"** | `backend/src/main/java/com/campusfix/CampusFixApplication.java` | Main class with `@SpringBootApplication` that boots Spring Boot and embedded Tomcat server on port 8080. |
| **"Where are your REST API endpoints defined?"** | `backend/src/main/java/com/campusfix/controller/IssueController.java` | `@RestController` handling `GET /api/issues`, `POST /api/issues`, `PUT /api/issues/{id}`, `DELETE /api/issues/{id}`, `GET /api/health`. |
| **"Where is the Login authentication endpoint?"** | `backend/src/main/java/com/campusfix/controller/AuthController.java` | `@PostMapping("/api/auth/login")` validating multi-role logins (`admin`, `student`, `faculty`, `technician`) and returning a role-based session token. |
| **"Where is the Database Entity / Table Schema?"** | `backend/src/main/java/com/campusfix/model/Issue.java` | `@Entity` mapped to `@Table(name = "issues")` with `@Id`, `@GeneratedValue`, columns for title, category, priority, status, reporter. |
| **"Where are the Database Queries / ORM?"** | `backend/src/main/java/com/campusfix/repository/IssueRepository.java` | Interface extending `JpaRepository<Issue, Long>` providing zero-boilerplate SQL CRUD (`findAll`, `save`, `findById`, `deleteById`). |
| **"Where is the Business Logic?"** | `backend/src/main/java/com/campusfix/service/IssueService.java` | `@Service` layer performing validation, updating fields, and communicating with `IssueRepository`. |
| **"Where is CORS configured?"** | `backend/src/main/java/com/campusfix/config/CorsConfig.java` | `WebMvcConfigurer` allowing cross-origin calls from local React (`http://localhost:5173`) and deployed Render frontend. |
| **"Where is the Initial Database Seeder?"** | `backend/src/main/java/com/campusfix/config/DataSeeder.java` | `CommandLineRunner` that automatically seeds 6 sample campus maintenance issues on startup if the DB is empty. |
| **"Where are Backend Environment Variables configured?"** | `backend/src/main/resources/application.properties` | Configures `${PORT:8080}`, `${DATABASE_URL}` (PostgreSQL/H2), JPA dialect, and hibernate auto-DDL. |
| **"Where is Docker defined?"** | `backend/Dockerfile` | Multi-stage Docker build: Stage 1 builds Maven JAR (`eclipse-temurin:21-jdk`); Stage 2 runs minimal JRE (`eclipse-temurin:21-jre`) with dynamic `$PORT`. |
| **"Where does React call the Backend API?"** | `frontend/src/services/issueService.js` | Uses modern `fetch()` with `import.meta.env.VITE_API_URL` fallback, sending GET, POST, PUT, PATCH, DELETE requests. |
| **"Where is Global React State managed?"** | `frontend/src/context/CampusFixContext.jsx` | React Context API (`CampusFixProvider` & `useCampusFix`) storing `issues`, `currentUser`, `isAdmin`, `stats`, `login()`, `logout()`. |
| **"Where are the React Routes defined?"** | `frontend/src/App.jsx` | `react-router-dom` `<Routes>` mapping `/dashboard`, `/issues`, `/report`, `/admin`, `/login`. |
| **"Where is the Universal Login Portal UI?"** | `frontend/src/pages/AdminLogin.jsx` | Fixora Campus Portal with segmented role selector (`Admin`, `Student`, `Faculty`, `Technician`), 1-click instant demo logins, password toggle, and smart redirection. |
| **"Where is the Admin Dashboard UI?"** | `frontend/src/pages/AdminDashboard.jsx` | Super Admin control center with live KPI metric cards, interactive status changers (`Reported` ➔ `In Progress` ➔ `Resolved`), and ticket deletion. |
| **"Where is the Layout & Navigation?"** | `frontend/src/components/layout/` | Modular layout: `Sidebar.jsx`, `TopBar.jsx`, `AppShell.jsx`, `MobileNav.jsx`. |

---

## 🏗️ 3-Tier Enterprise Architecture

```
[ BROWSER / CLIENT ]
       │
       ▼
[ REACT 19 FRONTEND ] ──── (frontend/src/services/issueService.js)
       │ HTTP REST Calls (GET, POST, PUT, DELETE) via VITE_API_URL
       ▼
[ SPRING BOOT 3.2.5 BACKEND ]
  ├── 1. Controller Layer: (IssueController.java, AuthController.java)
  ├── 2. Service Layer:    (IssueService.java)
  ├── 3. Data Access Layer:(IssueRepository.java)
       │
       ▼
[ DATABASE ] ──────────── (H2 in dev, PostgreSQL on Render production)
```

---

## 📁 Complete Project Directory Tree

```text
Exp 9/
│
├── backend/                                   # 🍃 Spring Boot REST Backend
│   ├── Dockerfile                             # Multi-stage Docker container build
│   ├── pom.xml                                # Maven project object model & dependencies
│   ├── mvnw / mvnw.cmd                        # Maven wrapper binaries (no local install needed)
│   ├── .mvn/                                  # Maven wrapper configurations
│   └── src/
│       ├── main/
│       │   ├── java/com/campusfix/
│       │   │   ├── CampusFixApplication.java  # Main executable Spring Boot entry
│       │   │   ├── config/
│       │   │   │   ├── CorsConfig.java        # Cross-Origin Resource Sharing security policy
│       │   │   │   └── DataSeeder.java        # Initial DB seed records
│       │   │   ├── controller/
│       │   │   │   ├── AuthController.java    # Admin login verification endpoint
│       │   │   │   └── IssueController.java   # Full CRUD REST endpoints (/api/issues)
│       │   │   ├── model/
│       │   │   │   └── Issue.java             # JPA Entity mapping to relational DB
│       │   │   ├── repository/
│       │   │   │   └── IssueRepository.java   # Spring Data JPA database interface
│       │   │   └── service/
│       │   │       └── IssueService.java      # Business logic & repository coordinator
│       │   └── resources/
│       │       └── application.properties     # Port, DB, and Hibernate configuration
│       └── test/                              # Backend automated test suite
│
├── frontend/                                  # ⚛️ React 19 + Vite Frontend
│   ├── index.html                             # Single page HTML entry
│   ├── package.json                           # React dependencies & scripts
│   ├── vite.config.js                         # Vite build system configuration
│   ├── .env                                   # VITE_API_URL configuration
│   └── src/
│       ├── main.jsx                           # React DOM root render
│       ├── App.jsx                            # Route table and app structure
│       ├── index.css                          # CampusFix SaaS design tokens
│       ├── context/
│       │   └── CampusFixContext.jsx           # Global state (issues, auth, active filters)
│       ├── services/
│       │   └── issueService.js                # Centralized REST API fetch calls
│       ├── pages/
│       │   ├── AdminDashboard.jsx             # Super Admin control center
│       │   ├── AdminLogin.jsx                 # Admin login portal (admin / admin)
│       │   ├── Dashboard.jsx                  # Student overview metrics
│       │   ├── Issues.jsx                     # Ticket directory & grid
│       │   ├── IssueDetails.jsx               # Single ticket inspection
│       │   ├── ReportIssue.jsx                # Ticket submission form
│       │   ├── MyReports.jsx                  # Student personal ticket history
│       │   ├── Analytics.jsx                  # Campus maintenance charts
│       │   ├── Announcements.jsx              # Directorate announcements
│       │   ├── Help.jsx                       # Support & FAQ desk
│       │   └── MaintenanceTeam.jsx            # On-duty personnel roster
│       ├── components/
│       │   ├── layout/                        # Sidebar, TopBar, AppShell, MobileNav
│       │   ├── common/                        # Button, Badge, LoadingState, ErrorState
│       │   ├── issues/                        # IssueCard, IssueGrid, IssueRow
│       │   └── dashboard/                     # StatCard, MaintenanceHealth
│       └── data/
│           └── mockData.js                    # Offline fallback dataset
│
├── .gitignore                                 # Git exclusions (target, node_modules, etc.)
└── README.md                                  # Complete architecture & viva guide
```

---

## 🔐 Credentials & Authentication
- **Role**: Super Admin
- **Username**: `admin`
- **Password**: `admin`
- **Portal URL**: `/login` (or click "Admin Login" in Sidebar)
- **Admin Features**:
  1. Live KPI cards (Reported, In Progress, Resolved)
  2. One-click Status Changer dropdown directly updating backend DB
  3. Delete invalid or duplicate tickets
  4. System health diagnostics

---

## 🚀 REST API Reference

| HTTP Method | Endpoint | Request Body | Description |
| :--- | :--- | :--- | :--- |
| `GET` | `/api/health` | None | Returns JSON confirming backend is `UP` |
| `POST` | `/api/auth/login` | `{"username":"admin","password":"admin"}` | Validates admin and issues token |
| `GET` | `/api/issues` | None | Retrieves all issues from the database |
| `GET` | `/api/issues/{id}`| None | Retrieves issue details by primary key |
| `POST` | `/api/issues` | JSON Issue object | Creates a new issue in database |
| `PUT` | `/api/issues/{id}`| JSON Issue object | Replaces entire issue entity |
| `PATCH` | `/api/issues/{id}`| Partial JSON fields | Partially updates issue (e.g. status) |
| `DELETE` | `/api/issues/{id}`| None | Deletes issue by ID |

---

## 🏃 Running the Application

### 1. Run Spring Boot Backend
```bash
cd backend
./mvnw clean package -DskipTests
java -jar target/campusfix-backend.jar
```
*Backend runs on `http://localhost:8080`.*

### 2. Run React Frontend
```bash
cd frontend
npm install
npm run dev
```
*Frontend runs on `http://localhost:5173`.*

---

## ☁️ Live Cloud Deployment Details
- **Backend Service (Render)**: `https://campusfix-backend-ceqd.onrender.com`
- **Backend Health Check**: `https://campusfix-backend-ceqd.onrender.com/api/health`
- **GitHub Repository**: `https://github.com/neevrambhia06/CampusFix-Exp9`

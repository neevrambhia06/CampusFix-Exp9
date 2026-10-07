# CampusFix — Smart Campus Maintenance Management (Experiment 4)

CampusFix is a production-grade campus issue reporting and maintenance management platform built for **Web & Mobile Application Development (Experiment 4)**.

> **Tagline:** *"Report it. Track it. Fix it."*

---

## 🎯 Experiment 4 Objective

Upgrade the Experiment 3 CampusFix React application to implement comprehensive React state management using React's built-in hooks and Context API without using third-party state libraries like Redux.

### Key State Management Concepts Implemented:
1. **React State (`useState`)**: Local & shared application state management.
2. **Side Effects (`useEffect`)**: Automatic data loading from JSON Server REST API (`http://localhost:3000/issues`).
3. **Context API (`useContext` & `createContext`)**: Shared application state provider wrapping components to eliminate prop-drilling.
4. **DOM Referencing (`useRef`)**: Automatic focus management on the Issue Title input during ticket reporting.
5. **Controlled Forms & Client-Side Validation**: React state controlled input bindings (`value` + `onChange`), validation rules, and inline error feedback.
6. **Search & Filter State**: Pure non-mutating derived array filtering by `title`, `description`, `location`, `reportedBy`, `category`, `priority`, and `status`.
7. **REST API Integration**: Complete `GET`, `POST`, `PATCH`, and `DELETE` operations communicating with JSON Server.
8. **Dynamic Dashboard Statistics**: Calculated dynamically from `issues` state using JavaScript array methods (`filter()`, `length`, `useMemo()`).

---

## 🔄 State Flow Architecture

```
JSON Server (http://localhost:3000/issues)
       ↓ (GET /issues)
  useEffect Hook
       ↓
  CampusFix Context (CampusFixProvider)
       ↓
  Shared State (issues, searchTerm, selectedCategory, etc.)
       ↓
  React Components (Header, SummaryCards, FilterBar, IssueGrid, ReportIssueForm)
       ↓
  User Interaction (Form Submit / Filter Select / Status Patch / Delete Click)
       ↓
  Context Actions (addIssue, patchIssue, deleteIssue, setSearchTerm, etc.)
       ↓
  REST API Call (POST / PATCH / DELETE)
       ↓
  JSON Server (db.json Updated)
```

---

## 🛠️ Hooks Usage Breakdown

### 1. `useState()`
- Used in `CampusFixContext.jsx` for managing core application data:
  ```js
  const [issues, setIssues] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedPriority, setSelectedPriority] = useState("All");
  const [selectedStatus, setSelectedStatus] = useState("All");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  ```
- Used in `ReportIssueForm.jsx` for controlled form input bindings:
  ```js
  const [formData, setFormData] = useState({
    title: "",
    category: "Plumbing",
    location: "",
    priority: "Medium",
    reportedBy: "Aarav Shah",
    description: ""
  });
  const [errors, setErrors] = useState({});
  ```

### 2. `useEffect()`
- Automatically fetches issues from the backend API when the application initializes:
  ```js
  useEffect(() => {
    loadIssues();
  }, []);
  ```

### 3. `useContext()` & Context API
- Defined `CampusFixContext` in `src/context/CampusFixContext.jsx`.
- Components consume shared state directly via custom hook `useCampusFix()`:
  - `Header`: Consumes `currentUser`.
  - `SummaryCards`: Consumes `issues` and dynamic `stats`.
  - `FilterBar`: Consumes `searchTerm`, `selectedCategory`, `selectedPriority`, `selectedStatus`, and setters.
  - `IssueGrid` & `IssueTable`: Consume `filteredIssues`, `patchIssue()`, and `deleteIssue()`.
  - `ReportIssueForm`: Consumes `addIssue()` and `currentUser`.

### 4. `useRef()`
- Used in `ReportIssueForm.jsx` to automatically place cursor focus on the `title` input field when the form mounts or after a ticket is submitted and reset:
  ```js
  const titleInputRef = useRef(null);
  useEffect(() => {
    if (titleInputRef.current) {
      titleInputRef.current.focus();
    }
  }, []);
  ```

---

## 📝 Form Handling & Validation Rules

In `ReportIssueForm.jsx`, every input uses React controlled bindings (`value` and `onChange`). Browser-only validation is replaced by React state validation:

| Field | Validation Rule | Error Message |
| :--- | :--- | :--- |
| **Title** | Minimum 5 characters | *"Title must be at least 5 characters long."* |
| **Description** | Minimum 10 characters | *"Description must be at least 10 characters long."* |
| **Category** | Must be selected | *"Category must be selected."* |
| **Location** | Non-empty text | *"Location details are required."* |
| **Priority** | Must be selected | *"Priority level must be selected."* |
| **Reported By** | Non-empty text | *"Reported By field must be provided."* |

### Submit Flow:
1. Prevents default browser submission (`e.preventDefault()`).
2. Runs `validateForm()`.
3. If invalid: displays inline validation messages near failing inputs.
4. If valid: calls `addIssue()` which sends a `POST` request to `http://localhost:3000/issues`.
5. Updates React Context state immediately so the new issue appears without page refresh.
6. Displays success confirmation state and re-focuses `titleInputRef`.

---

## ⚡ REST API Operations (`src/services/issueService.js`)

All API interactions are separated cleanly into `issueService.js`:

```js
GET    http://localhost:3000/issues      // Fetch all campus issues
GET    http://localhost:3000/issues/:id  // Fetch single issue details
POST   http://localhost:3000/issues      // Create new maintenance ticket
PUT    http://localhost:3000/issues/:id  // Replace full issue object
PATCH  http://localhost:3000/issues/:id  // Update status (e.g., {"status": "Resolved"})
DELETE http://localhost:3000/issues/:id  // Remove issue ticket record
```

---

## 📂 Project Architecture

```
src/
│
├── components/
│   ├── common/
│   │   └── CommonComponents.jsx
│   ├── dashboard/
│   │   ├── ActivityTimeline.jsx
│   │   ├── AnnouncementCard.jsx
│   │   ├── MaintenanceHealth.jsx
│   │   ├── StatCard.jsx
│   │   └── WelcomeHero.jsx
│   ├── issues/
│   │   ├── IssueGrid.jsx
│   │   ├── IssueRow.jsx
│   │   ├── IssueTimeline.jsx
│   │   └── IssueToolbar.jsx
│   ├── layout/
│   │   └── AppShell.jsx
│   ├── FilterBar.jsx
│   ├── Header.jsx
│   ├── IssueCard.jsx
│   ├── IssueGrid.jsx
│   ├── IssueTable.jsx
│   ├── ReportIssueForm.jsx
│   └── SummaryCards.jsx
│
├── context/
│   └── CampusFixContext.jsx
│
├── services/
│   └── issueService.js
│
├── data/
│   └── mockData.js
│
├── pages/
│   ├── Analytics.jsx
│   ├── Announcements.jsx
│   ├── Dashboard.jsx
│   ├── Help.jsx
│   ├── IssueDetails.jsx
│   ├── Issues.jsx
│   ├── MaintenanceTeam.jsx
│   ├── MyReports.jsx
│   └── ReportIssue.jsx
│
├── App.css
├── App.jsx
├── index.css
└── main.jsx
```

---

## 🚀 How to Run

### 1. Install Dependencies
```bash
npm install
```

### 2. Start JSON Server (Backend REST API)
In terminal 1:
```bash
npm run server
```
*Hosts REST API server on `http://localhost:3000/issues`.*

### 3. Start React Application
In terminal 2:
```bash
npm run dev
```
*Launches Vite dev server on `http://localhost:5173`.*

---

## 📬 Postman API Testing (Experiment 2 Compatibility)

The backend server remains 100% compatible with the Experiment 2 Postman Collection. Both Postman and the React frontend perform CRUD operations on `http://localhost:3000/issues`.

import express from 'express';
import cors from 'cors';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const DB_FILE = path.join(__dirname, 'db.json');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// Helper function to read db.json safely
function readDB() {
  try {
    const data = fs.readFileSync(DB_FILE, 'utf8');
    return JSON.parse(data);
  } catch (err) {
    console.error('Error reading db.json:', err);
    return { issues: [] };
  }
}

// Helper function to write db.json safely
function writeDB(data) {
  try {
    fs.writeFileSync(DB_FILE, JSON.stringify(data, null, 2), 'utf8');
  } catch (err) {
    console.error('Error writing db.json:', err);
  }
}

// GET /issues - Fetch all issues
app.get('/issues', (req, res) => {
  const db = readDB();
  res.json(db.issues || []);
});

// GET /issues/:id - Fetch single issue
app.get('/issues/:id', (req, res) => {
  const db = readDB();
  const issue = (db.issues || []).find((i) => String(i.id) === String(req.params.id));
  if (!issue) {
    return res.status(404).json({ error: 'Issue not found' });
  }
  res.json(issue);
});

// POST /issues - Create new issue and write to db.json
app.post('/issues', (req, res) => {
  const db = readDB();
  const issues = db.issues || [];

  const newIssue = {
    id: String(Date.now()),
    ...req.body,
  };

  issues.unshift(newIssue);
  db.issues = issues;
  writeDB(db);

  console.log(`[POST /issues] Added issue #${newIssue.id}: "${newIssue.title}" to db.json`);
  res.status(201).json(newIssue);
});

// PATCH /issues/:id - Update status or properties
app.patch('/issues/:id', (req, res) => {
  const db = readDB();
  const issues = db.issues || [];
  const index = issues.findIndex((i) => String(i.id) === String(req.params.id));

  if (index === -1) {
    return res.status(404).json({ error: 'Issue not found' });
  }

  issues[index] = { ...issues[index], ...req.body };
  db.issues = issues;
  writeDB(db);

  res.json(issues[index]);
});

// DELETE /issues/:id - Delete issue from db.json
app.delete('/issues/:id', (req, res) => {
  const db = readDB();
  const issues = db.issues || [];
  const filtered = issues.filter((i) => String(i.id) !== String(req.params.id));

  db.issues = filtered;
  writeDB(db);

  res.json({ success: true, id: req.params.id });
});

app.listen(PORT, () => {
  console.log(`✅ CampusFix API server running on http://localhost:${PORT}`);
  console.log(`👉 Endpoint: http://localhost:${PORT}/issues`);
});
# Connecting Your Portfolio to a Real Database — Full Guide

This guide explains the concepts, the recommended stack, a concrete code
example for THIS project, and a step-by-step learning roadmap.

---

## 1. The big picture

```
┌────────────┐     HTTP/fetch      ┌──────────────┐    SQL     ┌────────────┐
│  React app │  ──────────────▶    │   Backend    │  ───────▶  │ PostgreSQL │
│ (frontend) │  ◀──────────────    │  (FastAPI)   │  ◀───────  │  Database  │
└────────────┘     JSON            └──────────────┘            └────────────┘
   Vercel                            Render/Railway              Neon/Supabase
```

- The **frontend never touches the database directly.** It sends HTTP requests.
- The **backend** receives requests, runs logic, reads/writes the database.
- The **database** is the permanent storage shared by everyone.

---

## 2. Recommended stack (for a Python/ML developer)

| Role              | Tool                    |
|-------------------|-------------------------|
| Backend framework | **FastAPI** (Python)    |
| Database          | **PostgreSQL**          |
| ORM               | **SQLAlchemy**          |
| Data validation   | **Pydantic** (built into FastAPI) |
| Auth              | **JWT** (python-jose + passlib) |
| Migrations        | **Alembic**             |

> Alternative: **Node.js + Express + Prisma** if you prefer JavaScript
> everywhere. The concepts below are identical regardless of language.

---

## 3. Concepts to learn (in this order)

### ① HTTP & REST basics
- **Methods:** `GET` (read), `POST` (create), `PUT`/`PATCH` (update), `DELETE`.
- **Status codes:** 200 OK, 201 Created, 400 Bad Request, 401 Unauthorized, 404, 500.
- **JSON:** the data format sent between frontend and backend.
- A **REST API** maps these to URLs like `GET /api/projects`, `POST /api/messages`.

### ② SQL fundamentals
Learn these on a table, e.g. `messages`:
- `SELECT * FROM messages;` — read all
- `INSERT INTO messages (...) VALUES (...);` — create
- `UPDATE messages SET read=true WHERE id=1;` — update
- `DELETE FROM messages WHERE id=1;` — delete
- **Relationships & JOINs**, primary keys, foreign keys.

### ③ ORM (the bridge)
An ORM lets you write **Python** instead of SQL:
```python
# SQLAlchemy — this becomes a database table
class Message(Base):
    __tablename__ = "messages"
    id = Column(Integer, primary_key=True)
    name = Column(String)
    email = Column(String)
```

### ④ Authentication
- Passwords are **hashed** (bcrypt), never stored in plain text.
- On login, the server returns a **JWT token**.
- The frontend sends the token in headers for protected requests.

### ⑤ CORS
Browsers block requests between different domains by default. Your backend
must allow your frontend's domain (e.g. your Vercel URL).

---

## 4. Concrete example — a minimal FastAPI backend

Create a separate folder, e.g. `backend/`, with a virtual environment:

```bash
mkdir backend && cd backend
python -m venv venv
# Windows:  venv\Scripts\activate
# Mac/Linux: source venv/bin/activate
pip install fastapi uvicorn sqlalchemy psycopg2-binary pydantic
```

**`backend/main.py`:**
```python
from datetime import datetime
from fastapi import FastAPI, Depends
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from sqlalchemy import create_engine, Column, Integer, String, DateTime
from sqlalchemy.orm import sessionmaker, declarative_base, Session

# --- Database connection ---
DATABASE_URL = "postgresql://user:password@localhost:5432/portfolio"
engine = create_engine(DATABASE_URL)
SessionLocal = sessionmaker(bind=engine)
Base = declarative_base()

# --- Model = a table ---
class Message(Base):
    __tablename__ = "messages"
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String)
    email = Column(String)
    subject = Column(String)
    message = Column(String)
    date = Column(DateTime, default=datetime.utcnow)

Base.metadata.create_all(bind=engine)

# --- Schema = what the frontend sends ---
class MessageIn(BaseModel):
    name: str
    email: str
    subject: str
    message: str

app = FastAPI()

# Allow your React frontend to call this API
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173", "https://your-site.vercel.app"],
    allow_methods=["*"],
    allow_headers=["*"],
)

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@app.post("/api/messages")          # CREATE
def create_message(msg: MessageIn, db: Session = Depends(get_db)):
    db_msg = Message(**msg.dict())
    db.add(db_msg)
    db.commit()
    db.refresh(db_msg)
    return db_msg

@app.get("/api/messages")           # READ
def list_messages(db: Session = Depends(get_db)):
    return db.query(Message).order_by(Message.date.desc()).all()

@app.delete("/api/messages/{msg_id}")  # DELETE
def delete_message(msg_id: int, db: Session = Depends(get_db)):
    msg = db.query(Message).filter(Message.id == msg_id).first()
    db.delete(msg)
    db.commit()
    return {"ok": True}
```

**Run it:**
```bash
uvicorn main:app --reload
# Auto-docs available at http://localhost:8000/docs  ← FastAPI gives you this free!
```

---

## 5. Connecting the FRONTEND to your backend

In **`src/lib/store.tsx`**, swap the `localStorage` logic for `fetch()` calls.

**Before (mocked):**
```ts
const addMessage = useCallback((m) => {
  setMessages((p) => [{ ...m, id: Math.random()..., date: new Date() }, ...p]);
  localStorage.setItem("am:messages", JSON.stringify(messages));
}, []);
```

**After (real API):**
```ts
const API = "http://localhost:8000";   // later: your deployed backend URL

const addMessage = useCallback(async (m) => {
  const res = await fetch(`${API}/api/messages`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(m),
  });
  const saved = await res.json();      // server returns the saved row with a real id
  setMessages((p) => [saved, ...p]);   // update UI
}, []);

// In Dashboard / messages list, fetch on load:
const res = await fetch(`${API}/api/messages`);
const data = await res.json();
setMessages(data);
```

That's the whole pattern — repeat it for projects, blog posts, auth, etc.

---

## 6. Where to host each piece (all have free tiers)

| Piece     | Free hosts                          |
|-----------|-------------------------------------|
| Database  | **Neon**, **Supabase**, ElephantSQL (PostgreSQL) |
| Backend   | **Render**, **Railway**, Fly.io     |
| Frontend  | Vercel, Netlify (already works)     |

Free PostgreSQL tip: **Neon** or **Supabase** — they give you a connection string
like `postgresql://user:pass@host/db` that you paste into `DATABASE_URL`.

---

## 7. Learning roadmap (step-by-step)

1. **Learn SQL basics** (1–2 weeks)
   - freeCodeCamp "Relational Database" or SQLBolt.com
   - Practice: SELECT, INSERT, UPDATE, DELETE, JOIN.

2. **Install & play with PostgreSQL locally** (1 day)
   - Install PostgreSQL, connect with pgAdmin or DBeaver.
   - Create a `messages` table manually and run queries.

3. **Learn FastAPI** (1 week)
   - Official tutorial: https://fastapi.tiangolo.com/tutorial/
   - Build a tiny API with one `GET` and one `POST` route.

4. **Connect FastAPI + SQLAlchemy + Postgres** (a few days)
   - Build the `messages` CRUD example above.

5. **Connect your React frontend to the API** (1–2 days)
   - Replace the `store.tsx` mock calls with `fetch()`.

6. **Add authentication** (1 week)
   - JWT login/register, protect the /dashboard routes.
   - FastAPI OAuth2 tutorial covers this well.

7. **Deploy** (1 day)
   - Push the DB to Neon, the backend to Render, the frontend to Vercel.

> Don't try to learn it all at once. Build the **contact form → database**
> flow first. That single feature teaches you 80% of full-stack development.

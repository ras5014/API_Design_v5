# 📁 Proper File & Folder Structure for an Express + TypeScript Backend

This guide teaches you how to structure a **real-world Express backend** so it stays clean, scalable, and easy to maintain as your project grows.

The goal is to avoid messy folders and instead use a **feature-based modular structure** used in production apps.

---

# 🧠 Why folder structure matters

A good structure helps you:

* Scale from small → large apps
* Work in teams
* Add features without chaos
* Test easily
* Move to microservices later

Bad structure = hard to maintain after ~5 features.

---

# 🏆 Recommended Structure (Production-ready)

```
src/
│
├── app.ts
├── server.ts
│
├── config/
│   ├── env.ts
│   └── db.ts
│
├── middlewares/
│   ├── errorHandler.middleware.ts
│   └── auth.middleware.ts
│
├── utils/
│   └── responses.ts
│
├── modules/
│   ├── auth/
│   │   ├── auth.controller.ts
│   │   ├── auth.service.ts
│   │   ├── auth.router.ts
│   │   ├── auth.types.ts
│   │   └── auth.test.ts
│   │
│   ├── users/
│   │   ├── user.controller.ts
│   │   ├── user.service.ts
│   │   ├── user.router.ts
│   │   └── user.model.ts
│   │
│   ├── habits/
│   │   ├── habit.controller.ts
│   │   ├── habit.service.ts
│   │   ├── habit.router.ts
│   │   ├── habit.model.ts
│   │   ├── habit.types.ts
│   │   └── habit.test.ts
│   │
│   └── tags/
│       ├── tag.controller.ts
│       ├── tag.service.ts
│       └── tag.router.ts
│
└── tests/
    └── setup.ts
```

This is called a **feature-based modular architecture**.

Each feature lives in its own folder.

---

# 🔁 Request flow in this architecture

```
Route → Controller → Service → Database
```

Example:

```
POST /habits
```

1. Router receives request
2. Controller handles request/response
3. Service runs logic
4. DB saves data
5. Controller returns response

---

# 📄 Core root files

## `server.ts`

Starts the server.

```ts
import app from "./app";

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
```

---

## `app.ts`

Sets up Express and routes.

```ts
import express from "express";
import habitRouter from "./modules/habits/habit.router";

const app = express();

app.use(express.json());

app.use("/habits", habitRouter);

export default app;
```

---

# 📦 The `modules/` folder (MOST IMPORTANT)

Each feature gets its own folder.

Example:

```
modules/habits/
```

Inside a feature:

| File                | Purpose          |
| ------------------- | ---------------- |
| habit.router.ts     | Defines routes   |
| habit.controller.ts | Handles req/res  |
| habit.service.ts    | Business logic   |
| habit.model.ts      | DB schema        |
| habit.types.ts      | TypeScript types |
| habit.test.ts       | Tests            |

This keeps everything related together.

---

# 🧩 File responsibilities

## Router

Defines endpoints.

```ts
router.get("/", controller.getHabits);
router.post("/", controller.createHabit);
```

---

## Controller

Handles request & response only.

```ts
export const createHabit = (req, res) => {
  const habit = habitService.createHabit(req.body);
  res.status(201).json(habit);
};
```

Controllers should NOT contain heavy logic.

---

## Service

Business logic lives here.

```ts
export const createHabit = (data) => {
  return db.insert(data);
};
```

This makes logic reusable and testable.

---

## Model

Database schema (Prisma/Drizzle/Mongoose).

```ts
export const habits = pgTable("habits", {
  id: serial("id").primaryKey(),
  title: text("title"),
});
```

---

# 🛠️ Config folder

```
config/
  env.ts
  db.ts
```

### env.ts

Loads environment variables.

### db.ts

Database connection.

---

# 🧱 Middlewares folder

```
middlewares/
  auth.middleware.ts
  errorHandler.middleware.ts
```

Examples:

* JWT auth
* Error handling
* Logging
* Rate limiting

---

# 🧰 Utils folder

Reusable helpers:

```
utils/
  responses.ts
  logger.ts
  validators.ts
```

Example:

```ts
export const success = (res, data) => {
  res.json({ success: true, data });
};
```

---

# 🧪 Tests

You can either:

### Option A (recommended)

Put tests inside each feature folder.

```
habits/
  habit.test.ts
```

### Option B

Global tests folder.

```
tests/
```

---

# 🚫 Bad structure (avoid for large apps)

```
controllers/
routes/
models/
```

Why it's bad:

* Hard to scale
* Jump between folders
* Hard to delete features
* Messy in large apps

This is okay only for tiny projects.

---

# 🧠 Mental model to remember

Think in **features**, not file types.

Instead of:

```
controllers/
routes/
models/
```

Think:

```
modules/
  users/
  auth/
  habits/
```

Each feature is self-contained.

---

# 🚀 How this scales

Small project:

```
modules/
  habits/
```

Medium project:

```
modules/
  habits/
  users/
  auth/
  tags/
```

Large project:

```
modules/
  payments/
  notifications/
  analytics/
```

You never need to restructure later.

---

# 🏁 Final recommended structure

```
src/
  app.ts
  server.ts
  config/
  middlewares/
  utils/
  modules/
```

If you follow this from the start, your backend will stay clean even at 50+ routes.

---

# 🎯 When to use this structure

Use this for:

* Portfolio projects
* Job interviews
* SaaS apps
* Production APIs
* Team projects

---

# 📘 Next steps (learning path)

1. Build one feature (habits)
2. Add auth module
3. Add database
4. Add validation (Zod)
5. Add tests
6. Add error handler
7. Add logging

---

# 💬 Summary

Best practice for modern Express apps:

* Feature-based modules
* Controller → Service → DB flow
* Tests near features
* Middlewares separate
* Config separate

This is the structure used by professional teams.

---

# 🙋 Want a guided project?

If you want, I can now create:

* A **step-by-step mini project**
* With this exact structure
* Using TypeScript + Express
* With auth + DB

Just tell me:

**Beginner / intermediate / advanced?**

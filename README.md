# Simple Task Management API

A simple REST API built with **Node.js, Express, and TypeScript** as a weekend project to learn backend fundamentals.

The goal wasn't to build anything fancy — just to get comfortable with how a basic Express application is structured and how the different pieces fit together.

## What I Practiced

* Express routing
* Middleware
* JWT authentication
* Authorization
* CRUD operations
* Request validation with `express-validator`
* Database access
* Redis
* Controllers, services, and repositories
* TypeScript with Express

## Project Structure

```text
src
├── controllers
│   ├── task-controller.ts
│   └── user-controller.ts
├── database
│   ├── index.ts
│   ├── migrations
│   │   └── index.sql
│   └── redis
│       └── index.ts
├── index.ts
├── middlewares
│   ├── auth.ts
│   └── task-authorization.ts
├── repositories
│   ├── task-repository.ts
│   └── user-repository.ts
├── routes
│   ├── auth.ts
│   └── tasks.ts
├── services
│   ├── auth-service.ts
│   ├── cache-service.ts
│   ├── task-service.ts
│   └── user-service.ts
└── types
    ├── express.d.ts
    └── index.ts
```

The project follows a simple layered structure:

```text
Routes
  ↓
Controllers
  ↓
Services
  ↓
Repositories
  ↓
Database / Redis
```

Nothing particularly complicated — the separation was mainly to understand what each layer is supposed to do.

## API

### Auth

```http
POST /api/v1/public/auth/register
POST /api/v1/public/auth/login
```

Both endpoints accept:

```json
{
  "email": "user@example.com",
  "password": "password123"
}
```

### Tasks

```http
GET    /api/v1/tasks
POST   /api/v1/tasks
GET    /api/v1/tasks/:id
PATCH  /api/v1/tasks/:id
DELETE /api/v1/tasks/:id
```

A task looks like:

```json
{
  "title": "Learn Express",
  "description": "Learn Express fundamentals",
  "status": "PENDING"
}
```

Available statuses:

```text
PENDING
DONE
```

## Authentication

Authentication is handled using **JWTs**.

Protected requests use:

```http
Authorization: Bearer <token>
```

Task authorization is handled separately through middleware to make sure users can only access tasks they're allowed to access.

## Validation

Request validation is handled with `express-validator`.

For example:

* Email must be valid
* Password must be at least 8 characters
* Task title and description are required
* Task status must be `PENDING` or `DONE`

## Running Locally

Install dependencies:

```bash
npm install
```

Set up the required environment variables for the database, Redis, and JWT secret.

Then run the development server using the appropriate npm script:

```bash
npm run dev
```

## Why I Built This

This was mainly a **"build something over the weekend and learn by doing"** project.

The application itself is intentionally simple. The interesting part for me was getting familiar with the fundamentals of building a backend with Express — routing, middleware, authentication, authorization, CRUD, databases, Redis, and organizing code into separate layers.

It's not meant to be a production-ready task management system. It's just a small project for learning and experimenting with the Node/Express ecosystem.

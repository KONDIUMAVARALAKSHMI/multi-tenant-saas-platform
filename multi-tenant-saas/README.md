Multi-Tenant SaaS Project & Task Management System
A production-ready full-stack SaaS application featuring multi-tenancy, data isolation, subscription management, and role-based access control for project and task management.​

This project is designed as a learning-friendly reference implementation for multi-tenant architectures.

🚀 Quick Start
To launch the entire platform (Database, Backend, Frontend) with Docker:

docker-compose up -d

Make sure Docker Desktop is running before executing this command.

Once containers are up:

Frontend (React): http://localhost:3000

Backend (Express.js): http://localhost:5000

Backend health check: http://localhost:5000/api/health

Database (PostgreSQL 15): exposed on port 5432.​

Database migrations and seed data are applied automatically during startup; no manual migration commands are required.​

🏗 System Architecture
The application uses a Shared Database, Shared Schema multi-tenant architecture. Every tenant-specific record includes a mandatory tenantId, ensuring hard isolation between organizations.​
All services run on localhost, so you can access the frontend at http://localhost:3000 and the backend API at http://localhost:5000.

Frontend: React SPA (service name: frontend, port 3000).​

Backend: Node.js / Express API (service name: backend, port 5000).​

Database: PostgreSQL 15 (service name: database, port 5432).​

Tenant isolation is enforced both in the database schema and at the API layer by filtering queries using tenantId from the authenticated user’s JWT.​

🔑 Key Features
Multi-Tenancy

Each organization (tenant) has its own subdomain and fully isolated data.​

RBAC (Role-Based Access Control)

Roles: Super Admin, Tenant Admin, and User.

Permissions enforced at API and UI level based on role.​

Subscription Plans & Limits​

Free: 5 users / 3 projects.

Pro: 25 users / 15 projects.

Enterprise: 100 users / 50 projects.

Limits are checked before creating users or projects and violations return proper error codes.

Projects & Tasks

Create, list, update, and delete projects and tasks per tenant.

Task status, priority, assignment, and basic statistics per project.​

Security & Logging

JWT-based authentication with 24-hour expiry.​

Passwords stored as secure hashes (e.g., bcrypt).​

Audit logging of important actions in an auditlogs table.​

Dockerized Deployment

Single command docker-compose up -d starts database, backend, and frontend with fixed ports required by the challenge.​

🛠 API Overview
Main API groups (non-exhaustive):

Health Check

GET /api/health – returns API and database status; used by the evaluator to know when the system is ready.​

Authentication

POST /api/auth/register-tenant – register a new tenant and its admin user.

POST /api/auth/login – tenant-aware login using credentials and tenant context.

GET /api/auth/me – fetch current user and tenant details.​

Projects

GET /api/projects – list projects for the authenticated tenant with filters/pagination.

POST /api/projects – create a new project (subject to plan limits).​

Tasks

POST /api/projects/:projectId/tasks – create task under a project.

PATCH /api/tasks/:taskId/status – update task status (todo/inprogress/completed).​

Full details for all required endpoints (19+) are documented in the docs folder as per the specification.​

🧪 Testing Multi-Tenancy & Plan Limits
Use the test credentials listed in submission.json at the repository root.​
Those credentials correspond to the seed data loaded automatically and are exactly what the evaluation script will use.​

You can validate key behaviours:

Tenant Data Isolation

Log in as a tenant admin from submission.json.

Try to access a project or task that belongs to a different tenant ID; the API responds with 403 Forbidden for cross-tenant access.​

Subscription Limits

For a tenant on the Pro plan, attempt to create more than the allowed number of users/projects (25 users / 15 projects); the API blocks creation and returns an error indicating the plan limit is reached.​

✅ Final Submission Checklist
Before submitting this repository link, ensure:

Ports

Backend runs on 5000, Frontend on 3000, Database on 5432 (as exposed in docker-compose.yml).​

Docker Service Names

Services are named exactly backend, frontend, and database in docker-compose.yml.​

Environment Configuration

All required environment variables are either:

Present in committed .env files, or

Defined directly inside docker-compose.yml with test/development values.​

No production secrets are used; evaluator can read everything needed.​

Health Check

http://localhost:5000/api/health returns a successful response once containers are up and DB is ready.​

Documentation

The docs/ folder contains all 4 required markdown files from Step 1 (research, PRD, architecture, technical specification) with the expected filenames and structure.
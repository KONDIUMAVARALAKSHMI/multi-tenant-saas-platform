Architecture Document

1. High-Level Architecture
   Each request from the frontend is sent to the backend API with tenant context (for example, via subdomain or token), and the backend applies tenant-specific filters before querying the database.​
   The tenant_id column is present on all tenant-scoped tables, and every query includes tenant_id in the WHERE clause to enforce strict data isolation between tenants.​

2. Database Schema (ERD)
   Tenants: id, name, subdomain, plan, max_users, max_projects

Users: id, tenant_id, email, password, role (Unique: tenant_id + email)

Projects: id, tenant_id, name, status

Tasks: id, tenant_id, project_id, title, assigned_to

AuditLogs: id, tenant_id, action, entity_id

These entities form the core multi-tenant schema, with tenant_id used to scope all tenant data.​

3. API Architecture
   Auth Module: /api/auth/register-tenant, /api/auth/login, /api/auth/me

Tenant Module: /api/tenants (CRUD)

User Module: /api/users (CRUD)

Project Module: /api/projects (CRUD)

Task Module: /api/tasks (CRUD)

All endpoints (except tenant registration and login) require Authorization: Bearer <token>, and authorization checks are applied based on user role and tenant

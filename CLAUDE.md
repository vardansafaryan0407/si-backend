# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

### Primary Development Commands
- `npm run start:dev` - Start development server with hot reload and debugging
- `npm run build` - Build the application for production
- `npm run start:prod` - Start production server from compiled code

### Code Quality
- `npm run lint` - Lint TypeScript files with ESLint and auto-fix issues
- `npm run format` - Format code with Prettier
- `npm run test` - Run unit tests with Jest
- `npm run test:cov` - Run tests with coverage report
- `npm run test:e2e` - Run end-to-end tests
- `npm run test:watch` - Run tests in watch mode

### Database Management
- `npm run db:migrate` - Run all pending Sequelize migrations
- `npm run db:migrate:undo` - Undo the last migration
- `npm run db:seed:all` - Run all seeders (populate with initial data)
- `npm run db:seed:undo:all` - Undo all seeders
- `npm run db:migrate:create --name <name>` - Create new migration file
- `npm run db:seed:create --name <name>` - Create new seed file

## Architecture Overview

This is a **NestJS-based startup incubator platform** built with TypeScript, Sequelize ORM, and MySQL database.

### Core Technologies
- **Framework**: NestJS (Node.js framework)
- **Database ORM**: Sequelize with sequelize-typescript
- **Database**: MySQL
- **Authentication**: JWT with Passport strategies
- **Validation**: class-validator and class-transformer
- **File Upload**: Multer for avatar uploads
- **Email**: Nodemailer integration

### Application Structure

#### Entry Point
- `src/main.ts` - Application bootstrap with CORS, validation pipes, and static file serving

#### Core Architecture Patterns
- **Repository Pattern**: `src/core/repositories/base.repository.ts` provides common CRUD operations
- **Service-Repository Pattern**: Each module follows NestJS service-repository architecture
- **Module-based Organization**: Features organized as self-contained NestJS modules

#### Key Directories
- `src/core/` - Shared utilities, decorators, guards, interfaces, and base classes
- `src/modules/` - Feature modules (user, project, shared resources)
- `src/auth/` - Authentication module with JWT and OAuth strategies
- `src/config/` - Database and email configuration
- `database/` - Sequelize migrations and seeders

### Main Features
1. **User Management** - Registration, authentication, profile management
2. **Project Management** - CRUD operations for startup projects
3. **Project Members & Positions** - Team management and role assignments
4. **Project Invitations** - Invitation system for joining projects
5. **Shared Resources** - Countries, industries, roles, and skills management

### Database Architecture
- **ORM**: Sequelize with TypeScript decorators
- **Migrations**: Located in `database/migrations/`
- **Seeders**: Located in `database/seeders/` with initial data for countries, industries, roles, and skills
- **Configuration**: `database/config/config.json` for different environments

### Authentication & Authorization
- JWT-based authentication with refresh tokens
- Passport.js integration with multiple strategies
- Auth guard protection (`src/core/guards/auth.guard.ts`)
- User session management with decorators (`src/core/decorators/get-user.decorator.ts`)

### File Handling
- Static file serving for uploads (avatars stored in `uploads/avatars/`)
- Multer configuration for file uploads
- Automatic directory creation for upload paths

### API Architecture
- RESTful API endpoints
- Route organization through `app.routes.ts` and module-specific routes
- DTO validation for all endpoints
- Consistent error handling and response formatting

### Development Workflow
1. Database changes require creating migrations via `npm run db:migrate:create --name <name>`
2. Run migrations before starting development: `npm run db:migrate`
3. Populate initial data with seeders: `npm run db:seed:all`
4. Use `npm run start:dev` for development with hot reload
5. Always run `npm run lint` and `npm run test` before committing changes

### Testing Strategy
- Unit tests for services and repositories (`.spec.ts` files)
- E2E tests in `test/` directory
- Coverage reports available via `npm run test:cov`
- Test configuration in `jest` section of package.json
const readmeContent = `# Startups Incubator

## Overview

The **Startups Incubator** project is a Node.js application built with NestJS and Sequelize. This application is designed to manage various entities within a startup incubator platform, providing structured API endpoints and database management. The project is configured with TypeScript, ESLint, Prettier, and testing capabilities.

## Prerequisites

- **Node.js** and **npm** are required.
- **MySQL** or any other SQL database supported by Sequelize should be set up and configured.

## Installation

1. Clone the repository.
2. Install the dependencies:

   \`\`\`bash
   npm install
   \`\`\`

3. Configure the \`sequelize.config.js\` file for database connections.

## Scripts and Commands

The \`package.json\` includes several commands for building, testing, linting, formatting, and managing the database.

### Development Commands

- **Start Development Server**: Starts the server with live reloading enabled.

  \`\`\`bash
  npm run start:dev
  \`\`\`

- **Build Application**: Compiles the application.

  \`\`\`bash
  npm run build
  \`\`\`

- **Start Production Server**: Runs the compiled application in production mode.

  \`\`\`bash
  npm run start:prod
  \`\`\`

### Formatting and Linting

- **Format Code**: Uses Prettier to format all TypeScript files in the \`src\` and \`test\` directories.

  \`\`\`bash
  npm run format
  \`\`\`

- **Lint Code**: Uses ESLint to lint all TypeScript files in \`src\`, \`apps\`, \`libs\`, and \`test\` directories, applying automatic fixes where possible.

  \`\`\`bash
  npm run lint
  \`\`\`

### Testing Commands

- **Run Tests**: Executes all tests.

  \`\`\`bash
  npm run test
  \`\`\`

- **Test Coverage**: Runs tests and generates a code coverage report.

  \`\`\`bash
  npm run test:cov
  \`\`\`

- **Debug Tests**: Runs tests with debugging enabled.

  \`\`\`bash
  npm run test:debug
  \`\`\`

- **E2E Tests**: Executes end-to-end tests using the configuration in \`test/jest-e2e.json\`.

  \`\`\`bash
  npm run test:e2e
  \`\`\`

### Database Management Commands

These commands manage the Sequelize migrations and seed data. Note: The last two commands require a \`--name\` parameter.

- **Run Migrations**: Applies all pending migrations to the database.

  \`\`\`bash
  npm run db:migrate
  \`\`\`

- **Undo Last Migration**: Reverts the most recent migration.

  \`\`\`bash
  npm run db:migrate:undo
  \`\`\`

- **Run All Seeders**: Seeds all the data files to the database.

  \`\`\`bash
  npm run db:seed:all
  \`\`\`

- **Undo All Seeders**: Removes all seeded data from the database.

  \`\`\`bash
  npm run db:seed:undo:all
  \`\`\`

- **Create a New Migration**: Generates a new migration file. You must specify the \`--name\` parameter to name your migration file.

  \`\`\`bash
  npm run db:migrate:create --name <migration_name>
  \`\`\`

- **Create a New Seeder**: Generates a new seed file. You must specify the \`--name\` parameter to name your seed file.

  \`\`\`bash
  npm run db:seed:create --name <seed_name>
  \`\`\`

## Project Structure

The project follows the standard NestJS structure:

- **src**: Contains the main application code.
- **test**: Includes unit and end-to-end tests.
- **dist**: Compiled output folder, generated after running the build command.

## License

This project is unlicensed and is intended for internal use only.
`;

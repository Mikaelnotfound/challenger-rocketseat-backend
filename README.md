# Rocketseat Challenge: Node.js & TypeScript Backend

![Status](https://img.shields.io/badge/status-in%20progress-blue)

This project is a backend application developed as part of a Rocketseat challenge. The primary goal is to learn and apply modern technologies and trends in the Node.js and TypeScript development ecosystem.

## Technologies Used

*   **Node.js:** A JavaScript runtime built on Chrome's V8 JavaScript engine.
*   **TypeScript:** A typed superset of JavaScript that compiles to plain JavaScript.
*   **Fastify:** A fast and low overhead web framework, for Node.js.
*   **tsx:** A CLI tool for seamlessly running TypeScript and ESM.
*   **Drizzle ORM:** A TypeScript ORM for SQL databases.
*   **PostgreSQL:** A powerful, open source object-relational database system.
*   **Zod:** A TypeScript-first schema declaration and validation library.

## Getting Started

Follow these instructions to get a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

You need to have Node.js, npm (or another package manager), and Docker installed on your machine.
*   [Node.js](https://nodejs.org/)
*   [Docker](https://www.docker.com/)

### Installation

1.  Clone the repository:
    ```bash
    https://github.com/Mikaelnotfound/challenger-rocketseat-backend.git
    ```
2.  Navigate to the project directory and install the dependencies:
    ```bash
    npm install
    ```
3.  Create a `.env` file based on the `.env.example` file and fill in the environment variables.

### Running the Application

1.  Start the PostgreSQL database using Docker:
    ```bash
    docker-compose up -d
    ```
2.  Run the database migrations:
    ```bash
    npm run db:migrate
    ```
3.  To start the development server with live-reloading, run the following command:
    ```bash
    npm run dev
    ```

The server will start, and you can access it at the configured address (typically `http://localhost:3333` or similar).

## Database

This project uses **Drizzle ORM** to interact with a **PostgreSQL** database. The database schema is defined in the `src/database/schema.ts` file.

To generate new migrations based on schema changes, run the following command:
```bash
npm run db:generate
```

To apply the migrations to the database, run:
```bash
npm run db:migrate
```

You can also use Drizzle Studio to browse the database:
```bash
npm run db:studio
```

## API Documentation

This project uses `@fastify/swagger` and `@scalar/fastify-api-reference` to generate API documentation.

You can access the Swagger documentation at `http://localhost:3333/docs`.
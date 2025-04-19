# Task Tracker

A full-stack task tracking application built with a Spring Boot backend and a React frontend.

## Tech Stack

*   **Backend:**
    *   Java 21
    *   Spring Boot 3.4.4
    *   Spring Data JPA
    *   Maven
    *   PostgreSQL
*   **Frontend:**
    *   React 19
    *   TypeScript
    *   Vite
    *   Tailwind CSS
    *   shadcn/ui
    *   Axios
*   **Database:**
    *   PostgreSQL (managed via Docker Compose)

## Prerequisites

*   Java Development Kit (JDK) 21 or later
*   Maven
*   Node.js and npm
*   Docker and Docker Compose

## Getting Started

1.  **Set up the database:**
    *   Ensure Docker Desktop is running.
    *   Navigate to the project root directory (where `docker-compose.yml` is located).
    *   Run the following command to start the PostgreSQL database container:
        ```bash
        docker-compose up -d
        ```
    *   The database will be accessible on `localhost:5432` with username `user` and password `password`.

2.  **Configure and Run the Backend:**
    *   Navigate to the `Backend` directory:
        ```bash
        cd Backend
        ```
    *   The backend is configured in `src/main/resources/application.properties` to connect to the PostgreSQL database started via Docker Compose.
    *   Build and run the Spring Boot application using Maven:
        ```bash
        ./mvnw spring-boot:run
        ```
        (Use `mvnw.cmd spring-boot:run` on Windows Command Prompt)
    *   The backend API will be available at `http://localhost:8080` (default Spring Boot port).

3.  **Configure and Run the Frontend:**
    *   Navigate to the `Frontend` directory:
        ```bash
        cd ../Frontend
        ```
    *   Install the necessary dependencies:
        ```bash
        npm install
        ```
    *   Start the frontend development server:
        ```bash
        npm run dev
        ```
    *   The frontend application will be available at `http://localhost:5173` (default Vite port).

## Project Structure

```
.
├── docker-compose.yml      # Docker configuration for PostgreSQL
├── README.md               # This file
├── Backend/                # Spring Boot backend application
│   ├── pom.xml             # Maven configuration
│   ├── src/main/java       # Backend Java source code
│   └── src/main/resources  # Backend resources (e.g., application.properties)
└── Frontend/               # React frontend application
    ├── package.json        # Node.js dependencies and scripts
    ├── vite.config.ts      # Vite configuration
    ├── tsconfig.json       # TypeScript configuration
    └── src/                # Frontend source code (components, assets, etc.)
```

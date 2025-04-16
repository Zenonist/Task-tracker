# Task Tracker Application Documentation

## Project Overview

The Task Tracker is a Spring Boot application designed to help users manage tasks and task lists. It provides a RESTful API for creating, reading, updating, and deleting tasks and task lists. The application follows a layered architecture pattern with clear separation of concerns.

## System Architecture

The application is built on the following architectural principles:

1. **Layered Architecture**: The application follows a standard layered architecture with controllers, services, repositories, and domain layers.
2. **RESTful API**: The application exposes RESTful endpoints for clients to interact with the system.
3. **Domain-Driven Design**: The application is structured around business domain objects (Task and TaskList).

### Technology Stack

- **Framework**: Spring Boot
- **Database Access**: Spring Data JPA
- **Database**: Not explicitly specified in the code (likely H2, MySQL, or PostgreSQL)
- **Build Tool**: Maven
- **Containerization**: Docker (docker-compose.yml present)

## Core Components

### Domain Model

The domain model consists of two primary entities:

#### Task Entity

The `Task` class represents an individual task in the system.

**Key attributes**:
- `id`: UUID - Unique identifier for the task
- `title`: String - Title of the task
- `description`: String - Detailed description of the task
- `dueDate`: LocalDateTime - Due date for task completion
- `status`: TaskStatus - Current status of the task (enum)
- `priority`: TaskPriority - Priority level of the task (enum)
- `createdAt`: LocalDateTime - When the task was created
- `updatedAt`: LocalDateTime - When the task was last updated
- `taskList`: TaskList - The task list this task belongs to

#### TaskList Entity

The `TaskList` class represents a collection of related tasks.

**Key attributes**:
- `id`: UUID - Unique identifier for the task list
- `title`: String - Title of the task list
- `description`: String - Detailed description of the task list
- `tasks`: List<Task> - Collection of tasks in this list
- `createdAt`: LocalDateTime - When the task list was created
- `updatedAt`: LocalDateTime - When the task list was last updated

### Data Transfer Objects (DTOs)

DTOs are used to transfer data between the service layer and client applications.

#### TaskDto

Represents a simplified view of a Task entity:
- `id`: UUID - Unique identifier for the task
- `title`: String - Title of the task
- `description`: String - Detailed description of the task
- `dueDate`: LocalDateTime - Due date for task completion
- `priority`: TaskPriority - Priority level of the task
- `status`: TaskStatus - Current status of the task

#### TaskListDto

Represents a simplified view of a TaskList entity with additional calculated fields:
- `id`: UUID - Unique identifier for the task list
- `title`: String - Title of the task list
- `description`: String - Detailed description of the task list
- `count`: Integer - Number of tasks in the task list
- `progress`: Double - Percentage of tasks completed (0-100%)
- `tasks`: List<TaskDto> - Collection of tasks in this list

### Mappers

Mappers are responsible for converting between domain entities and DTOs.

#### TaskMapper
Handles conversion between Task entities and TaskDto objects.

#### TaskListMapper
Handles conversion between TaskList entities and TaskListDto objects.

**Key functionality**:
- `fromDto()`: Converts a TaskListDto to a TaskList entity
- `toDto()`: Converts a TaskList entity to a TaskListDto
- `calculateTaskListProgress()`: Calculates the progress percentage for a task list

### Controllers

Controllers expose REST endpoints for client applications to interact with the system.

#### TaskController

Handles CRUD operations for tasks within a specific task list.

**Endpoints**:
- `GET /task-lists/{task_list_id}/tasks` - Get all tasks in a task list
- `POST /task-lists/{task_list_id}/tasks` - Create a new task in a task list
- `GET /task-lists/{task_list_id}/tasks/{task_id}` - Get a specific task
- `PUT /task-lists/{task_list_id}/tasks/{task_id}` - Update a specific task
- `DELETE /task-lists/{task_list_id}/tasks/{task_id}` - Delete a specific task

#### TaskListController

Handles CRUD operations for task lists.

**Endpoints**:
- `GET /task-lists` - Get all task lists
- `POST /task-lists` - Create a new task list
- `GET /task-lists/{id}` - Get a specific task list
- `PUT /task-lists/{id}` - Update a specific task list
- `DELETE /task-lists/{id}` - Delete a specific task list

### Services

Services implement business logic for the application.

#### TaskService

Manages business logic for tasks.

**Key functionality**:
- Create, read, update, and delete tasks
- List tasks within a task list

#### TaskListService

Manages business logic for task lists.

**Key functionality**:
- Create, read, update, and delete task lists
- List all task lists

### Repositories

Repositories provide data access functionality.

#### TaskRepository

Handles data access for Task entities.

#### TaskListRepository

Handles data access for TaskList entities.

## Data Flow

1. **Client Request**: Client sends an HTTP request to a controller endpoint.
2. **Controller Processing**: Controller receives the request and delegates to the appropriate service.
3. **Service Processing**: Service implements business logic, often using repositories to access data.
4. **Repository Access**: Repository interacts with the database to retrieve or modify data.
5. **Response Construction**: Service returns domain entities, which controllers convert to DTOs using mappers.
6. **Client Response**: Controller returns DTOs to the client as JSON.

## Database Schema

The application uses JPA annotations to define the database schema:

### Task Table
- `id`: UUID (Primary Key)
- `title`: VARCHAR (Not Null)
- `description`: VARCHAR
- `due_date`: TIMESTAMP
- `status`: VARCHAR (Not Null)
- `priority`: VARCHAR (Not Null)
- `created_at`: TIMESTAMP (Not Null)
- `updated_at`: TIMESTAMP
- `task_list_id`: UUID (Foreign Key to task_list table)

### Task List Table
- `id`: UUID (Primary Key)
- `title`: VARCHAR (Not Null)
- `description`: VARCHAR
- `create_at`: TIMESTAMP (Not Null)
- `updated_at`: TIMESTAMP (Not Null)

## Error Handling

The application implements global exception handling through the `GlobalExceptionHandler` class, which provides consistent error responses for various exception types.

## Running the Application

The application can be run in two ways:

1. **Using Maven**:
   ```
   mvn spring-boot:run
   ```

2. **Using Docker**:
   ```
   docker-compose up
   ```

## API Usage Examples

### Create a Task List
```
POST /task-lists
Content-Type: application/json

{
  "title": "Work Tasks",
  "description": "Tasks related to my job"
}
```

### Create a Task in a Task List
```
POST /task-lists/{taskListId}/tasks
Content-Type: application/json

{
  "title": "Complete project documentation",
  "description": "Finish the documentation for the Task Tracker project",
  "dueDate": "2025-04-30T17:00:00",
  "priority": "HIGH",
  "status": "IN_PROGRESS"
}
```

### Get all Tasks in a Task List
```
GET /task-lists/{taskListId}/tasks
```

### Update a Task Status
```
PUT /task-lists/{taskListId}/tasks/{taskId}
Content-Type: application/json

{
  "id": "{taskId}",
  "title": "Complete project documentation",
  "description": "Finish the documentation for the Task Tracker project",
  "dueDate": "2025-04-30T17:00:00",
  "priority": "HIGH",
  "status": "CLOSED"
}
```
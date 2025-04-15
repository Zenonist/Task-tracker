package com.task_tracker.tasks.controllers;

import com.task_tracker.tasks.domain.dto.TaskDto;
import com.task_tracker.tasks.domain.entities.Task;
import com.task_tracker.tasks.mappers.TaskMapper;
import com.task_tracker.tasks.services.TaskService;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

/**
 * REST Controller for Task resources.
 * 
 * Spring REST Controllers and MVC Flow:
 * ====================================
 * 
 * 1. REST API Design:
 *    - This controller follows REST principles with resource-based URLs
 *    - Uses standard HTTP methods (GET, POST, PUT, DELETE) for CRUD operations
 *    - Implements nested resources pattern (/task-lists/{id}/tasks)
 *    - Returns appropriate HTTP status codes (implicit 200 OK, 201 Created, 204 No Content)
 * 
 * 2. Spring MVC Request Processing Flow:
 *    - Request arrives at DispatcherServlet (Front Controller pattern)
 *    - DispatcherServlet routes to this controller based on @RequestMapping
 *    - The appropriate method is selected based on HTTP method and path
 *    - Path variables and request body are automatically deserialized
 *    - After processing, the response is automatically serialized to JSON
 * 
 * 3. Annotations Explained:
 *    - @RestController: Combines @Controller and @ResponseBody
 *    - @RequestMapping: Maps URL patterns to this controller
 *    - @GetMapping, @PostMapping, etc.: Specialized shortcuts for @RequestMapping
 *    - @PathVariable: Extracts values from the URL path
 *    - @RequestBody: Deserializes request body to Java objects
 * 
 * 4. Exception Handling:
 *    - Exceptions thrown in this controller are caught by GlobalExceptionHandler
 *    - The handler converts exceptions to standardized error responses
 * 
 * 5. Content Negotiation:
 *    - Spring automatically handles Accept/Content-Type headers
 *    - By default, responses are JSON, but could be XML with proper configuration
 */
// @RestController marks this class as a controller where every method returns a domain object instead of a view
// It combines @Controller and @ResponseBody, meaning all methods automatically serialize return values to JSON/XML
@RestController
// @RequestMapping defines the base URL path for all endpoints in this controller
// The {task_list_id} is a path variable that will be extracted and passed to methods
@RequestMapping(path = "/task-lists/{task_list_id}/tasks")
public class TaskController {

    private final TaskService taskService; // Dependency on the service layer that handles business logic
    private final TaskMapper taskMapper;   // Dependency on mapper to convert between entities and DTOs

    // Constructor-based dependency injection - Spring automatically injects the required components
    // This is preferred over field injection as it makes dependencies explicit and enables immutability
    public TaskController(TaskService taskService, TaskMapper taskMapper) {
        this.taskService = taskService;
        this.taskMapper = taskMapper;
    }

    // @GetMapping handles HTTP GET requests to list all tasks in a task list
    // Maps to the base URL defined in @RequestMapping (e.g., /task-lists/123/tasks)
    @GetMapping
    public List<TaskDto> listTasks(@PathVariable("task_list_id") UUID taskListId){
        // @PathVariable extracts values from the URL path
        // Here it extracts the task_list_id path parameter and converts it to a UUID
        
        // Call the service to get all tasks, then convert each entity to DTO using the mapper
        // Stream API is used for functional transformation of the list
        return taskService.listTasks(taskListId)
                .stream()
                .map(taskMapper::toDto) // Method reference to convert each Task to TaskDto
                .toList(); // Collect transformed objects into a List
    }

    // @PostMapping handles HTTP POST requests to create a new task
    // Maps to the base URL defined in @RequestMapping
    @PostMapping
    public TaskDto createTask(
            @PathVariable("task_list_id") UUID taskListId,
            @RequestBody TaskDto taskDto // @RequestBody deserializes request body JSON to a TaskDto object
    ){
        // 1. Convert from DTO to entity
        // 2. Call service to create the task in the database
        // 3. Convert the returned entity back to DTO for the response
        Task createdTask = taskService.createTask(taskListId, taskMapper.fromDto(taskDto));

        return taskMapper.toDto(createdTask);
    }

    // @GetMapping with additional path handles HTTP GET requests for a specific task
    // Maps to /task-lists/{task_list_id}/tasks/{task_id}
    @GetMapping(path = "/{task_id}")
    public Optional<TaskDto> getTask(
            @PathVariable("task_list_id") UUID taskListId,
            @PathVariable("task_id") UUID taskId // Extracts the task_id from the URL path
    ){
        // Optional is a container that may or may not contain a value
        // Here it's used to handle the case where a task might not exist
        // map() transforms the value inside the Optional if present
        return taskService.getTask(taskListId, taskId).map(taskMapper::toDto);
    }

    // @PutMapping handles HTTP PUT requests to update a specific task
    // Maps to /task-lists/{task_list_id}/tasks/{task_id}
    @PutMapping(path = "/{task_id}")
    public TaskDto updateTask(
        @PathVariable("task_list_id") UUID taskListId,
        @PathVariable("task_id") UUID taskId,
        @RequestBody TaskDto taskDto // The updated task data from request body
    ){
        // 1. Convert DTO to entity
        // 2. Call service to update the task
        // 3. Convert the returned updated entity back to DTO
        Task updatedTask = taskService.updateTask(taskListId, taskId, taskMapper.fromDto(taskDto));

        return taskMapper.toDto(updatedTask);
    }

    // @DeleteMapping handles HTTP DELETE requests to remove a specific task
    // Maps to /task-lists/{task_list_id}/tasks/{task_id}
    @DeleteMapping(path = "/{task_id}")
    public void deleteTask(
        @PathVariable("task_list_id") UUID taskListId,
        @PathVariable("task_id") UUID taskId
    ){
        // Simply delegates to the service layer with no return value (HTTP 204 No Content)
        taskService.deleteTask(taskListId, taskId);
    }
}
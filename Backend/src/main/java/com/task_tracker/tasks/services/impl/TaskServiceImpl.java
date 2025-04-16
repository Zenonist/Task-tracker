package com.task_tracker.tasks.services.impl;

import com.task_tracker.tasks.domain.entities.Task;
import com.task_tracker.tasks.domain.entities.TaskList;
import com.task_tracker.tasks.domain.entities.TaskPriority;
import com.task_tracker.tasks.domain.entities.TaskStatus;
import com.task_tracker.tasks.repositories.TaskRepository;
import com.task_tracker.tasks.repositories.TaskListRepository;
import com.task_tracker.tasks.services.TaskService;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Objects;
import java.util.Optional;
import java.util.UUID;

// @Service marks this class as a Spring service component
// This annotation is detected by Spring component scanning and creates a bean of this class
// Services contain business logic and are typically used between controllers and repositories
@Service
public class TaskServiceImpl implements TaskService {

    // Dependencies on repositories for data access operations
    private final TaskRepository taskRepository;
    private final TaskListRepository taskListRepository;

    // Constructor-based dependency injection - Spring automatically provides the required repositories
    // This approach is recommended over field injection (using @Autowired on fields)
    public TaskServiceImpl(TaskRepository taskRepository, TaskListRepository taskListRepository) {
        this.taskRepository = taskRepository;
        this.taskListRepository = taskListRepository;
    }

    // Implementation of the TaskService interface method to list all tasks in a task list
    @Override
    public List<Task> listTasks(UUID taskListId) {
        // Simply delegates to the repository method that finds tasks by task list ID
        return taskRepository.findByTaskListId(taskListId);
    }

    // @Transactional ensures that this entire method executes within a database transaction
    // If any exception occurs, all database changes will be rolled back (all-or-nothing)
    @Transactional
    @Override
    public Task createTask(UUID taskListId, Task task) {
        // Input validation - ensures task doesn't already have an ID (which would mean it's not new)
        if (null != task.getId()){
            throw new IllegalArgumentException("Task already has an ID");
        }

        // Input validation - ensures task has a title
        if (null == task.getTitle() || task.getTitle().isBlank()){
            throw new IllegalArgumentException("Task must have a title");
        }

        // Set default priority if none provided (business logic)
        // Optional.ofNullable() safely handles null values
        TaskPriority taskPriority = Optional.ofNullable(task.getPriority()).orElse(TaskPriority.MEDIUM);

        // Business rule: all new tasks start with OPEN status
        TaskStatus taskStatus = TaskStatus.OPEN;

        // Find the parent task list or throw an exception if it doesn't exist
        // orElseThrow() handles the case where the task list isn't found
        TaskList taskList = taskListRepository.findById(taskListId)
                .orElseThrow(() -> new IllegalArgumentException("Invalid Task List Id provided!"));

        // Get current time for creation and update timestamps
        LocalDateTime now = LocalDateTime.now();

        // Create a new Task instance with proper values
        // Note: ID is null because JPA will generate it
        Task taskToSave = new Task(
                null,
                task.getTitle(),
                task.getDescription(),
                task.getDueDate(),
                taskStatus,        // Use our business rule (always OPEN)
                taskPriority,      // Use either provided or default priority
                now,               // Set creation timestamp
                now,               // Set update timestamp
                taskList           // Set parent task list
        );

        // Save the task to the database and return the saved entity (with generated ID)
        return taskRepository.save(taskToSave);
    }

    @Override
    public Optional<Task> getTask(UUID taskListId, UUID taskId) {
        // Delegates to repository to find task by both task list ID and task ID
        // Returns an Optional which may or may not contain the task
        return taskRepository.findByTaskListIdAndId(taskListId, taskId);
    }

    @Override
    public Task updateTask(UUID taskListId, UUID taskId, Task task) {
        // Debugging output - helpful during development
        System.out.println("TaskServiceImpl.updateTask: task.getId() = " + task.getId());
        
        // Input validation - ensures task has an ID
        if (null == task.getId()){
            throw new IllegalArgumentException("Task list ID, task ID and task ID must be present!");
        }

        // Input validation - ensures URL path ID matches task's ID
        if (!Objects.equals(taskId, task.getId())){
            throw new IllegalArgumentException("Task IDs do not match!");
        }

        // Input validation - ensures required fields are present
        if (null == task.getPriority()){
            throw new IllegalArgumentException("Task must have a valid priority!");
        }

        if(null == task.getStatus()){
            throw new IllegalArgumentException("Task must have a valid status!");
        }

        // Find the existing task or throw exception if not found
        Task existingTask = taskRepository.findByTaskListIdAndId(taskListId, taskId)
                .orElseThrow(() -> new IllegalArgumentException("Task not found!"));

        // Update only the fields that can be modified
        // Note: We don't update ID, creation time, or task list relationship
        existingTask.setTitle(task.getTitle());
        existingTask.setDescription(task.getDescription());
        existingTask.setDueDate(task.getDueDate());
        existingTask.setPriority(task.getPriority());
        existingTask.setStatus(task.getStatus());
        existingTask.setUpdatedAt(LocalDateTime.now());  // Set current time as update timestamp

        // Save and return the updated task
        return taskRepository.save(existingTask);
    }

    // @Transactional ensures atomic operation for delete
    // This means the operation either completes fully or rolls back completely
    @Transactional
    @Override
    public void deleteTask(UUID taskListId, UUID taskId) {
        // Delegates to repository to delete task by both task list ID and task ID
        // No return value needed since delete operation doesn't produce data
        taskRepository.deleteByTaskListIdAndId(taskListId, taskId);
    }
}

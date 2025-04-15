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

@Service
public class TaskServiceImpl implements TaskService {

    private final TaskRepository taskRepository;
    private final TaskListRepository taskListRepository;

    public TaskServiceImpl(TaskRepository taskRepository, TaskListRepository taskListRepository) {
        this.taskRepository = taskRepository;
        this.taskListRepository = taskListRepository;
    }

    @Override
    public List<Task> listTasks(UUID taskListId) {
        return taskRepository.findByTaskListId(taskListId);
    }

    @Transactional
    @Override
    public Task createTask(UUID taskListId, Task task) {
        if (null != task.getId()){
            throw new IllegalArgumentException("Task already has an ID");
        }

        if (null == task.getTitle() || task.getTitle().isBlank()){
            throw new IllegalArgumentException("Task must have a title");
        }

        TaskPriority taskPriority = Optional.ofNullable(task.getPriority()).orElse(TaskPriority.MEDIUM);

        TaskStatus taskStatus = TaskStatus.OPEN;

        TaskList taskList = taskListRepository.findById(taskListId)
                .orElseThrow(() -> new IllegalArgumentException("Invalid Task List Id provided!"));

        LocalDateTime now = LocalDateTime.now();

        Task taskToSave = new Task(
                null,
                task.getTitle(),
                task.getDescription(),
                task.getDueDate(),
                taskStatus,
                taskPriority,
                now,
                now,
                taskList
        );

        return taskRepository.save(taskToSave);
    }

    @Override
    public Optional<Task> getTask(UUID taskListId, UUID taskId) {
        return taskRepository.findByTaskListIdAndId(taskListId, taskId);
    }

    @Override
    public Task updateTask(UUID taskListId, UUID taskId, Task task) {
        System.out.println("TaskServiceImpl.updateTask: task.getId() = " + task.getId());
        if (null == task.getId()){
            throw new IllegalArgumentException("Task list ID, task ID and task ID must be present!");
        }

        if (!Objects.equals(taskId, task.getId())){
            throw new IllegalArgumentException("Task IDs do not match!");
        }

        if (null == task.getPriority()){
            throw new IllegalArgumentException("Task must have a valid priority!");
        }

        if(null == task.getStatus()){
            throw new IllegalArgumentException("Task must have a valid status!");
        }

        Task existingTask = taskRepository.findByTaskListIdAndId(taskListId,taskId)
                .orElseThrow(() -> new IllegalArgumentException("Task not found!"));


        existingTask.setTitle(task.getTitle());
        existingTask.setDescription(task.getDescription());
        existingTask.setDueDate(task.getDueDate());
        existingTask.setPriority(task.getPriority());
        existingTask.setStatus(task.getStatus());
        existingTask.setUpdatedAt(LocalDateTime.now());

        return taskRepository.save(existingTask);
    }

    @Transactional // Ensures the entire delete operation is atomic: either completes fully or rolls back completely if an error occurs. Also helps maintain database consistency and integrity during the deletion process.
    @Override
    public void deleteTask(UUID taskListId, UUID taskId) {
        taskRepository.deleteByTaskListIdAndId(taskListId, taskId);
    }
}

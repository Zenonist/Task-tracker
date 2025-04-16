package com.task_tracker.tasks.services.impl;

import com.task_tracker.tasks.domain.entities.TaskList;
import com.task_tracker.tasks.repositories.TaskListRepository;
import com.task_tracker.tasks.services.TaskListService;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Objects;
import java.util.Optional;
import java.util.UUID;

@Service
public class TaskListServiceImpl implements TaskListService {

    private final TaskListRepository taskListRepository;

    public TaskListServiceImpl(TaskListRepository taskListRepository) {
        this.taskListRepository = taskListRepository;
    }

    @Override
    public List<TaskList> listTaskList() {
        return taskListRepository.findAll();
    }

    @Override
    public TaskList createTaskList(TaskList taskList) {
        if (null != taskList.getId()) {
            throw new IllegalArgumentException("Task list already has an ID");
        }
        if (null == taskList.getTitle() || taskList.getTitle().isBlank()) {
            throw new IllegalArgumentException("Task list title must be present!");
        }

        return taskListRepository.save(
                new TaskList(
                        null,
                        taskList.getTitle(),
                        null,
                        taskList.getDescription(),
                        LocalDateTime.now(),
                        LocalDateTime.now()
                )
        );
    }

    @Override
    public Optional<TaskList> getTaskList(UUID id) {
        return taskListRepository.findById(id);
    }

    @Transactional // Transaction is required if it requires multiple database operations
    @Override
    public TaskList updateTaskList(UUID taskListId, TaskList taskList) {
        if(null == taskList.getId()){
            throw new IllegalArgumentException("Task list ID must be present!");
        }

        System.out.println("TaskListServiceImpl.updateTaskList: taskList.getId() = " + taskList.getId());
        System.out.println("TaskListServiceImpl.updateTaskList: taskListId = " + taskListId);

        if (!Objects.equals(taskList.getId(), taskListId)){
            throw new IllegalArgumentException("Attempting to update task list with a different ID");
        }

        TaskList existingTaskList = taskListRepository.findById(taskListId).orElseThrow(() -> new IllegalArgumentException("Task list not found!"));

        existingTaskList.setTitle(taskList.getTitle());
        existingTaskList.setDescription(taskList.getDescription());
        existingTaskList.setUpdatedAt(LocalDateTime.now());
        return taskListRepository.save(existingTaskList);
    }

    @Override
    public void deleteTaskList(UUID taskListId) {
    // ! No need to check if task list exists because JPA will
        taskListRepository.deleteById(taskListId);
    }

}

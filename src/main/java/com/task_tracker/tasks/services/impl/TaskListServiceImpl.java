package com.task_tracker.tasks.services.impl;

import com.task_tracker.tasks.domain.entities.TaskList;
import com.task_tracker.tasks.repositories.TaskListRepository;
import com.task_tracker.tasks.services.TaskListService;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

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
        if (null != taskList.getId()){
            throw new IllegalArgumentException("Task list already has an ID");
        }
        if (null == taskList.getTitle() || taskList.getTitle().isBlank()){
            throw new IllegalArgumentException("Task list title must be present!");
        }

        taskListRepository.save(
                new TaskList(
                    null,
                    taskList.getDescription(),
                    null,
                    taskList.getTitle(),
                    LocalDateTime.now(),
                    LocalDateTime.now()
                )
        );

        return null;
    }
}

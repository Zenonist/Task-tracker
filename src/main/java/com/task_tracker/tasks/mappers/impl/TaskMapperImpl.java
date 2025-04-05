package com.task_tracker.tasks.mappers.impl;

import com.task_tracker.tasks.domain.dto.TaskDto;
import com.task_tracker.tasks.domain.entities.Task;
import com.task_tracker.tasks.mappers.TaskMapper;
import org.springframework.stereotype.Component;

@Component // Marks this class as a Spring-managed component, allowing Spring to automatically detect, instantiate, and inject it wherever needed
public class TaskMapperImpl implements TaskMapper {

    @Override
    public Task fromDto(TaskDto taskDto) {
        return new Task(
                taskDto.id(),
                taskDto.title(),
                taskDto.description(),
                taskDto.dueDate(),
                taskDto.status(),
                taskDto.priority(),
                null,
                null,
                null
        );
    }

    @Override
    public TaskDto toDto(Task task) {
        return new TaskDto(
                task.getId(),
                task.getTitle(),
                task.getDescription(),
                task.getDueDate(),
                task.getPriority(),
                task.getStatus()
        );
    }
}

package com.task_tracker.tasks.mappers.impl;


import com.task_tracker.tasks.domain.dto.TaskListDto;
import com.task_tracker.tasks.domain.entities.Task;
import com.task_tracker.tasks.domain.entities.TaskList;
import com.task_tracker.tasks.domain.entities.TaskStatus;
import com.task_tracker.tasks.mappers.TaskListMapper;
import com.task_tracker.tasks.mappers.TaskMapper;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.Optional;

@Component // Spring component annotation to indicate that this class is a Spring-managed bean and allow dependency injection
public class TaskListMapperImpl implements TaskListMapper {

    private final TaskMapper taskMapper;

    public TaskListMapperImpl(TaskMapper taskMapper) {
        this.taskMapper = taskMapper;
    }

    @Override
    public TaskList fromDto(TaskListDto taskListDto){
        return new TaskList(
                taskListDto.id(),
                taskListDto.title(),
                Optional.ofNullable(taskListDto.tasks()).map(tasks -> tasks.stream().map(taskMapper::fromDto).toList()).orElse(null),
                taskListDto.description(),
                null,
                null
        );
    }

    public TaskListDto toDto(TaskList taskList){
        return new TaskListDto(
                taskList.getId(),
                taskList.getTitle(),
                taskList.getDescription(),
                Optional.ofNullable(taskList.getTasks()).map(List::size).orElse(0),
                calculateTaskListProgress(taskList.getTasks()),
                Optional.ofNullable(taskList.getTasks()).map(tasks -> tasks.stream().map(taskMapper::toDto).toList()).orElse(null)
        );
    }

    private Double calculateTaskListProgress(List<Task> tasks){
        if(null == tasks){
            return null;
        }

        // Calculate the number of tasks with status CLOSED
        long closedTaskCount = tasks.stream().filter(task -> TaskStatus.CLOSED == task.getStatus()).count();


        return (double) closedTaskCount / tasks.size();
    }
}

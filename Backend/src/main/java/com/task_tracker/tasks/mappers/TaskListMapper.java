package com.task_tracker.tasks.mappers;

import com.task_tracker.tasks.domain.entities.TaskList;
import com.task_tracker.tasks.domain.dto.TaskListDto;

public interface TaskListMapper {

    TaskList fromDto(TaskListDto taskListDto);

    TaskListDto toDto(TaskList taskList);
}

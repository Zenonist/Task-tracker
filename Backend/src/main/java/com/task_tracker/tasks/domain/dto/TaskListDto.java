package com.task_tracker.tasks.domain.dto;

import java.util.List;
import java.util.UUID;

public record TaskListDto(
        UUID id,
        String title,
        String description,
        Integer count, // number of tasks in TaskList
        Double progress, // percentage of tasks completed (0-100%),
        List<TaskDto> tasks
) {
}

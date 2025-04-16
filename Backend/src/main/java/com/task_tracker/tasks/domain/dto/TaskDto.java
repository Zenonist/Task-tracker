package com.task_tracker.tasks.domain.dto;

import com.task_tracker.tasks.domain.entities.TaskPriority;
import com.task_tracker.tasks.domain.entities.TaskStatus;

import java.time.LocalDateTime;
import java.util.UUID;

public record TaskDto(
        UUID id,
        String title,
        String description,
        LocalDateTime dueDate,
        TaskPriority priority,
        TaskStatus status
) {
}

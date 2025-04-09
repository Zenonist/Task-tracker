package com.task_tracker.tasks.domain.dto;

public record ErrorResponse(
        int status,
        String message,
        String details
) {
}

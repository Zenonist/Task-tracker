package com.task_tracker.tasks.mappers;


import com.task_tracker.tasks.domain.dto.TaskDto;
import com.task_tracker.tasks.domain.entities.Task;

/**
 * Interface for mapping between Task entities and TaskDto objects.
 * Provides conversion methods to transform between persistence entities and data transfer objects.
 * This helps to separate the internal domain model from the external API representation.
 */
public interface TaskMapper {

    /**
     * Converts a TaskDto to a Task entity.
     * Used when receiving task data from the presentation layer to be processed or persisted.
     *
     * @param taskDto The DTO containing task data
     * @return A Task entity populated with data from the DTO
     */
    Task fromDto(TaskDto taskDto);

    /**
     * Converts a Task entity to a TaskDto.
     * Used when sending task data to the presentation layer or external API.
     *
     * @param task The Task entity to convert
     * @return A TaskDto populated with data from the entity
     */
    TaskDto toDto(Task task);
}

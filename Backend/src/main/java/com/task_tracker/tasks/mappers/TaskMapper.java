package com.task_tracker.tasks.mappers;


import com.task_tracker.tasks.domain.dto.TaskDto;
import com.task_tracker.tasks.domain.entities.Task;

/**
 * Interface for mapping between Task entities and TaskDto objects.
 * Provides conversion methods to transform between persistence entities and data transfer objects.
 * This helps to separate the internal domain model from the external API representation.
 * 
 * Mapper Pattern in Spring Boot:
 * ==============================
 * 
 * 1. Purpose: The mapper pattern creates a clear separation between:
 *    - Domain entities (internal data model used with the database)
 *    - DTOs (Data Transfer Objects used for API responses/requests)
 * 
 * 2. Benefits:
 *    - Encapsulation: Hides internal implementation details from API consumers
 *    - Evolution: Allows entities and DTOs to evolve independently
 *    - Security: Prevents exposing sensitive fields to external users
 *    - Validation: Enables specific validation rules for API input
 *    - Performance: Transfers only necessary data over the network
 * 
 * 3. Implementation:
 *    - This interface defines the contract for conversion methods
 *    - Implementations (like TaskMapperImpl) provide the actual conversion logic
 *    - The @Component annotation on the implementation makes it injectable in services/controllers
 * 
 * 4. Usage in Spring MVC flow:
 *    - Controller receives a DTO from an HTTP request
 *    - Mapper converts the DTO to an entity for service processing
 *    - Service processes the entity and interacts with repositories
 *    - Mapper converts the resulting entity back to DTO for the HTTP response
 * 
 * 5. Alternative approaches:
 *    - Manual mapping (as implemented in this project)
 *    - Libraries like MapStruct, ModelMapper, or JMapper
 *    - Spring's BeanUtils or conversion services
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

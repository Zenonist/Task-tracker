package com.task_tracker.tasks.repositories;

import com.task_tracker.tasks.domain.entities.Task;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

public interface TaskRepository extends JpaRepository<Task, UUID> {
    List<Task> findByTaskListId(UUID taskListId); // Retrieves all tasks associated with a specific task list by its ID
    Optional<Task> findByTaskListIdAndId(UUID taskListId, UUID id); // Retrieves a specific task by tasklist ID and the associated task list ID
    void deleteByTaskListIdAndId(UUID taskListId, UUID id); // Deletes a specific task by tasklist ID and the associated task list ID
}

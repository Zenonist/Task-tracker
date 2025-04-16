package com.task_tracker.tasks.repositories;

import com.task_tracker.tasks.domain.entities.Task;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

/**
 * Repository interface for Task entities.
 * 
 * Spring Data JPA and Repository Pattern:
 * =====================================
 * 
 * 1. Repository Pattern:
 *    - Abstracts the data access layer from the rest of the application
 *    - Provides collection-like interface for working with domain entities
 *    - Centralizes data access operations and queries in one place
 *    - Makes it easier to substitute different data access implementations
 * 
 * 2. Spring Data JPA Magic:
 *    - This interface extends JpaRepository but has no implementation class
 *    - Spring creates the implementation at runtime using proxy objects
 *    - It generates SQL queries based on method names (method name conventions)
 *    - It handles transactions, connection management, and exception translation
 * 
 * 3. Method Naming Conventions:
 *    - findBy[Property]: SELECT where property equals value
 *    - findBy[Property1]And[Property2]: SELECT where property1 = ? AND property2 = ?
 *    - findBy[Property]Like: SELECT where property LIKE pattern
 *    - findBy[Property]OrderBy[Property]Asc/Desc: SELECT where property = ? ORDER BY property ASC/DESC
 *    - countBy[Property]: SELECT COUNT(*) where property = ?
 *    - existsBy[Property]: SELECT 1 where property = ? LIMIT 1
 *    - deleteBy[Property]: DELETE where property = ?
 * 
 * 4. Behind the scenes:
 *    - EntityManager is the core JPA class managing entities
 *    - Hibernate (the JPA implementation) translates methods to SQL
 *    - Connection pooling via HikariCP improves performance
 *    - Transactions ensure data consistency
 * 
 * 5. Advanced features (not used here):
 *    - @Query annotation for custom JPQL or native SQL queries
 *    - Specifications for dynamic queries
 *    - Query by Example for complex querying
 *    - Auditing to track who created/modified entities
 */
// This interface extends JpaRepository which provides standard CRUD operations
// JpaRepository<Entity, ID> takes two type parameters:
// 1. The entity type (Task)
// 2. The type of the primary key (UUID)
// Spring Data JPA will automatically generate an implementation of this interface at runtime
public interface TaskRepository extends JpaRepository<Task, UUID> {
    
    /**
     * Finds all tasks belonging to a specific task list.
     * 
     * Spring translates this method name to SQL query:
     * SELECT * FROM tasks WHERE task_list_id = ?
     * 
     * @param taskListId The UUID of the task list to find tasks for
     * @return A list of all tasks in the specified task list
     */
    List<Task> findByTaskListId(UUID taskListId);
    
    /**
     * Finds a specific task by both its ID and its parent task list ID.
     * This ensures that tasks can only be accessed within their proper task list.
     * 
     * Spring translates this method name to SQL query:
     * SELECT * FROM tasks WHERE task_list_id = ? AND id = ? LIMIT 1
     * 
     * @param taskListId The parent task list's ID
     * @param id The task's ID
     * @return An Optional containing the task if found, or empty if not found
     */
    Optional<Task> findByTaskListIdAndId(UUID taskListId, UUID id);
    
    /**
     * Deletes a specific task by both its ID and its parent task list ID.
     * This ensures that tasks can only be deleted within their proper task list.
     * 
     * Spring translates this method name to SQL query:
     * DELETE FROM tasks WHERE task_list_id = ? AND id = ?
     * 
     * @param taskListId The parent task list's ID
     * @param id The task's ID
     */
    void deleteByTaskListIdAndId(UUID taskListId, UUID id);
}

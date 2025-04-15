package com.task_tracker.tasks.domain.entities;

import jakarta.persistence.*;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Objects;
import java.util.UUID;

// @Entity marks this class as a JPA entity that will be mapped to a database table
@Entity
// @Table specifies the name of the database table this entity maps to
@Table(name = "task_list")
public class TaskList {

    @Id // Marks this field as the primary key of the entity
    @GeneratedValue(strategy = GenerationType.UUID) // Automatically generates UUID values for new entities
    @Column(name = "id", updatable = false, nullable = false) // Maps to 'id' column, cannot be updated or null
    private UUID id; // Using UUID as primary key instead of sequential numbers for better distribution and security

    @Column(name = "title", nullable = false) // Maps to 'title' column, cannot be null
    private String title;

    // @OneToMany defines a one-to-many relationship (one TaskList can have many Tasks)
    // mappedBy points to the field name in the Task entity that owns this relationship
    // cascade specifies what operations should be cascaded from parent to children
    @OneToMany(mappedBy = "taskList", cascade = {
            CascadeType.REMOVE,  // When a TaskList is deleted, all associated Tasks are also deleted
            CascadeType.PERSIST  // When a TaskList is saved, all associated Tasks are also saved
    })
    private List<Task> tasks; // Collection of tasks in this task list

    @Column(name = "description") // Maps to 'description' column, can be null
    private String description;

    @Column(name = "create_at", nullable = false) // Maps to 'create_at' column, cannot be null
    private LocalDateTime createdAt; // Timestamp when task list was created

    @Column(name = "updated_at", nullable = false) // Maps to 'updated_at' column, cannot be null
    private LocalDateTime updatedAt; // Timestamp when task list was last updated

    // Default constructor required by JPA - used when creating instances from database
    public TaskList() {
        // Empty constructor needed for JPA entity instantiation
    }

    // Full constructor - useful for creating instances in code or testing
    public TaskList(UUID id, String title, List<Task> tasks, String description, LocalDateTime createdAt, LocalDateTime updatedAt) {
        this.id = id;
        this.title = title;
        this.tasks = tasks;
        this.description = description;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
    }

    // Standard getters and setters - required by JPA and used by Spring to access entity properties
    public UUID getId() {
        return id;
    }

    public void setId(UUID id) {
        this.id = id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public List<Task> getTasks() {
        return tasks;
    }

    public void setTasks(List<Task> tasks) {
        this.tasks = tasks;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }

    public LocalDateTime getUpdatedAt() {
        return updatedAt;
    }

    public void setUpdatedAt(LocalDateTime updatedAt) {
        this.updatedAt = updatedAt;
    }

    // equals() method - important for entity comparison in collections and tests
    // Spring Data uses this for entity comparison operations
    @Override
    public boolean equals(Object o) {
        if (o == null || getClass() != o.getClass()) return false;
        TaskList taskList = (TaskList) o;
        return Objects.equals(id, taskList.id) && Objects.equals(title, taskList.title) && Objects.equals(tasks, taskList.tasks) && Objects.equals(description, taskList.description) && Objects.equals(createdAt, taskList.createdAt) && Objects.equals(updatedAt, taskList.updatedAt);
    }

    // hashCode() method - works with equals() for proper functioning in HashMaps/HashSets
    @Override
    public int hashCode() {
        return Objects.hash(id, title, tasks, description, createdAt, updatedAt);
    }

    // toString() method - useful for debugging and logging
    @Override
    public String toString() {
        return "TaskList{" +
                "id=" + id +
                ", title='" + title + '\'' +
                ", tasks=" + tasks +
                ", description='" + description + '\'' +
                ", createdAt=" + createdAt +
                ", updatedAt=" + updatedAt +
                '}';
    }
}

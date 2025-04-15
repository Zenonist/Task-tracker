package com.task_tracker.tasks.domain.entities;
import jakarta.persistence.*;
import java.time.LocalDateTime;
import java.util.Objects;
import java.util.UUID;

// @Entity annotation marks this class as a JPA entity, meaning it will be mapped to a database table
// JPA (Java Persistence API) is a specification that allows you to map Java objects to database tables
@Entity
// @Table specifies the name of the database table this entity maps to
@Table(name = "tasks")
public class Task {

    @Id // Specifies that this field is the primary key of the entity
    @GeneratedValue(strategy = GenerationType.UUID) // Tells Spring to automatically generate a UUID value for new entities
    @Column(name = "id", updatable = false, nullable = false) // Maps to 'id' column, cannot be updated or null
    private UUID id; // Unique identifier using Java's UUID type instead of traditional integers

    @Column(name = "title", nullable = false) // Maps to 'title' column, cannot be null
    private String title;

    @Column(name = "description") // Maps to 'description' column, can be null
    private String description;

    @Column(name = "due_date") // Maps to 'due_date' column, can be null
    private LocalDateTime dueDate; // Using Java 8+ LocalDateTime for better date/time handling

    @Column(name = "status", nullable = false) // Maps to 'status' column, cannot be null
    private TaskStatus status; // Using a custom enum type for better type safety

    @Column(name = "priority", nullable = false) // Maps to 'priority' column, cannot be null
    private TaskPriority priority; // Using a custom enum type for better type safety

    @Column(name = "created_at", nullable = false) // Maps to 'created_at' column, cannot be null
    private LocalDateTime createdAt; // Timestamp when task was created

    @Column(name = "updated_at") // Maps to 'updated_at' column, can be null
    private LocalDateTime updatedAt; // Timestamp when task was last updated

    // @ManyToOne establishes a many-to-one relationship between tasks and task lists
    // (Many tasks can belong to one task list)
    @ManyToOne(fetch = FetchType.LAZY) // LAZY loading means this relationship won't be loaded until accessed
    @JoinColumn(name = "task_list_id") // Specifies which column is the foreign key to the task_list table
    private TaskList taskList; // Reference to the parent TaskList this task belongs to

    // Default constructor required by JPA - JPA uses this to create instances when loading from database
    public Task() {
        // Empty constructor needed for JPA entity instantiation
    }

    // Full constructor - useful for creating instances in code or testing
    public Task(UUID id, String title, String description, LocalDateTime dueDate, TaskStatus status, TaskPriority priority, LocalDateTime createdAt, LocalDateTime updatedAt, TaskList taskList) {
        this.id = id;
        this.title = title;
        this.description = description;
        this.dueDate = dueDate;
        this.status = status;
        this.priority = priority;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
        this.taskList = taskList;
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

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public LocalDateTime getDueDate() {
        return dueDate;
    }

    public void setDueDate(LocalDateTime dueDate) {
        this.dueDate = dueDate;
    }

    public TaskStatus getStatus() {
        return status;
    }

    public void setStatus(TaskStatus status) {
        this.status = status;
    }

    public TaskPriority getPriority() {
        return priority;
    }

    public void setPriority(TaskPriority priority) {
        this.priority = priority;
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

    public TaskList getTaskList() {
        return taskList;
    }

    public void setTaskList(TaskList taskList) {
        this.taskList = taskList;
    }

    // equals() method - important for entity comparison in collections and tests
    // Spring Data uses this for entity comparison operations
    @Override
    public boolean equals(Object o) {
        if (o == null || getClass() != o.getClass()) return false;
        Task task = (Task) o;
        return Objects.equals(id, task.id) && Objects.equals(title, task.title) && Objects.equals(description, task.description) && Objects.equals(dueDate, task.dueDate) && status == task.status && priority == task.priority && Objects.equals(createdAt, task.createdAt) && Objects.equals(updatedAt, task.updatedAt) && Objects.equals(taskList, task.taskList);
    }

    // hashCode() method - works with equals() for proper functioning in HashMaps/HashSets
    @Override
    public int hashCode() {
        return Objects.hash(id, title, description, dueDate, status, priority, createdAt, updatedAt, taskList);
    }

    // toString() method - useful for debugging and logging
    @Override
    public String toString() {
        return "Task{" +
                "id=" + id +
                ", title='" + title + '\'' +
                ", description='" + description + '\'' +
                ", dueDate=" + dueDate +
                ", status=" + status +
                ", priority=" + priority +
                ", createdAt=" + createdAt +
                ", updatedAt=" + updatedAt +
                ", taskList=" + taskList +
                '}';
    }
}

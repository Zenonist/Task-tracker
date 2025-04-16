package com.task_tracker.tasks.repositories;

import com.task_tracker.tasks.domain.entities.TaskList;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.UUID;

@Repository
public interface TaskListRepository extends JpaRepository<TaskList, UUID>{ // JpaRespository provides CRUD operationsm such as save findAll, findById, deleteById, etc.

}

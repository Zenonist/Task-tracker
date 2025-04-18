import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Task from "./Task";
import { Trash2 } from "lucide-react";
import TaskListProps from "@/structure/TaskListProps";

export const TaskList = ({ title, description, tasks }: TaskListProps) => {
  return (
    <Card>
      <CardHeader>
        <div className="flex flex-row items-center justify-between">
          <CardTitle>{title}</CardTitle>
          <Trash2 />
        </div>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <div>
          {tasks && tasks.length > 0 ? (
            <>
              {tasks.map((task) => (
                <Task
                  key={task.id}
                  title={task.title}
                  description={task.description}
                  id={task.id}
                  dueDate={task.dueDate}
                  status={task.status}
                  priority={task.priority}
                />
              ))}
            </>
          ) : (
            <div className="text-center py-4 text-muted-foreground">
              No tasks available
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default TaskList;

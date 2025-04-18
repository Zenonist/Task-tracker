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
        <div className="container mx-auto p-4">
          {tasks && tasks.length > 0 ? (
            <div>
              {tasks.map((task) => (
                <div key={task.id} className="mb-4">
                  <Task
                    key={task.id}
                    title={task.title}
                    description={task.description}
                    id={task.id}
                    dueDate={task.dueDate}
                    status={task.status}
                    priority={task.priority}
                  />
                </div>
              ))}
            </div>
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

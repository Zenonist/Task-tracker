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
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { Button } from "./ui/button";
import axios from "axios";

interface TaskListComponentProps extends TaskListProps {
  // Callback function passed from the parent (App.tsx) to notify it when a task list is deleted.
  onDelete: (id: string) => void;
}

export const TaskList = ({ id, title, description, tasks, onDelete }: TaskListComponentProps) => {
  const handleDelete = () => {
    // Send a DELETE request to the backend API to remove the task list.
    axios.delete(import.meta.env.VITE_API_URL + "/task-lists/" + id)
      .then((response) => {
        console.log("Task list deleted successfully:", response.data);
        // After successful deletion in the backend, call the onDelete callback function
        // provided by the parent component (App.tsx). This passes the ID of the deleted
        // task list back to the parent.
        onDelete(id);
      })
      .catch((error) => {
        console.error("Error deleting task list:", error);
      });
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex flex-row items-center justify-between">
          <CardTitle>{title}</CardTitle>
          <Dialog>
            <DialogTrigger asChild>
              <Trash2 />
            </DialogTrigger>
            <DialogContent className="text-white bg-black">
              <DialogHeader>
                <DialogTitle>Delete this task list</DialogTitle>
                <DialogDescription>
                  Are you sure about deleting this task list?
                </DialogDescription>
              </DialogHeader>
              <DialogFooter>
                <DialogTrigger asChild>
                  <Button
                    variant="outline"
                    className="text-2xl bg-red-600 cursor-pointer"
                    onClick={
                      () => {
                        // When the delete button in the dialog is clicked, call handleDelete.
                        handleDelete();
                      }
                    }
                  >
                    Delete
                  </Button>
                </DialogTrigger>
                <DialogTrigger asChild>
                  <Button variant="outline" className="text-2xl cursor-pointer">
                    Cancel
                  </Button>
                </DialogTrigger>
              </DialogFooter>
            </DialogContent>
          </Dialog>
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

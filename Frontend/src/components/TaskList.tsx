import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Task from "./Task";
import { PencilRuler, Trash2 } from "lucide-react";
import TaskListProps from "@/structure/TaskListProps";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { Button } from "./ui/button";
import axios from "axios";
import { Input } from "./ui/input";
import { Label } from "@radix-ui/react-label";

interface TaskListComponentProps extends TaskListProps {
  // Callback function passed from the parent (App.tsx) to notify it when a task list is deleted.
  onDelete: (id: string) => void;
  onEdit: (id: string, title: string, description: string) => void;
}

export const TaskList = ({
  id,
  title,
  description,
  tasks,
  progress,
  onDelete,
  onEdit
}: TaskListComponentProps) => {
  const editTaskData = {
    title: title,
    description: description,
  };

  const handleEdit = () => {
    // Send a PUT request to the backend API to update the task list.
    axios
      .put(import.meta.env.VITE_API_URL + "/task-lists/" + id, {
        id: id,
        title: editTaskData.title,
        description: editTaskData.description,
        count: tasks?.length ?? 0,
        progress: progress ?? 0,
        tasks: tasks,
      })
      .then((response) => {
        console.log("Task list updated successfully:", response.data);
        onEdit(id, editTaskData.title, editTaskData.description);
      })
      .catch((error) => {
        console.error("Error updating task list:", error);
      });
  }

  const handleDelete = () => {
    // Send a DELETE request to the backend API to remove the task list.
    axios
      .delete(import.meta.env.VITE_API_URL + "/task-lists/" + id)
      .then(() => {
        // console.log("Task list deleted successfully:", response.data);
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
          <div>
            <CardTitle>{title}</CardTitle>
          </div>
          <div className="flex gap-2">
            {/* Edit button */}
            <Dialog>
              <DialogTrigger asChild>
                <Button variant="outline" className="text-2xl cursor-pointer">
                  <PencilRuler />
                </Button>
              </DialogTrigger>
              <DialogContent className="text-white bg-black">
                <DialogHeader>
                  <DialogTitle>Edit Task List</DialogTitle>
                  <DialogDescription>
                    Edit the title and description of the task list.
                  </DialogDescription>
                </DialogHeader>
                <div className="flex flex-col gap-2">
                  <Label htmlFor="task-list-title">Title</Label>
                  <Input
                    id="task-list-title"
                    defaultValue={title}
                    placeholder="Task List Title"
                    className="bg-white text-black"
                    onChange={(e) => {
                      editTaskData.title = e.target.value;
                    }}
                  />
                  <Label htmlFor="task-list-description">Description</Label>
                  <Input
                    id="task-list-description"
                    defaultValue={description}
                    placeholder="Task List Description"
                    className="bg-white text-black"
                    onChange={(e) => {
                      editTaskData.description = e.target.value;
                    }}
                  />
                </div>
                <DialogFooter className="flex flew-row justify-between">
                  <DialogClose asChild>
                    <Button
                      variant="outline"
                      className="text-2xl bg-green-500 cursor-pointer"
                      onClick={() => {
                        handleEdit();
                      }}
                    >
                      Save
                    </Button>
                  </DialogClose>
                  <DialogClose asChild>
                    <Button
                      variant="outline"
                      className="text-2xl bg-red-500 cursor-pointer"
                    >
                      Cancel
                    </Button>
                  </DialogClose>
                </DialogFooter>
              </DialogContent>
            </Dialog>
            {/* Delete button */}
            <Dialog>
              <DialogTrigger asChild>
                <Button variant="outline" className="text-2xl cursor-pointer">
                  <Trash2 />
                </Button>
              </DialogTrigger>
              <DialogContent className="text-white bg-black">
                <DialogHeader>
                  <DialogTitle>Delete this task list</DialogTitle>
                  <DialogDescription>
                    Are you sure about deleting this task list?
                  </DialogDescription>
                </DialogHeader>
                <DialogFooter>
                  <DialogClose asChild>
                    <Button
                      variant="outline"
                      className="text-2xl bg-red-500 cursor-pointer"
                      onClick={() => {
                        // When the delete button in the dialog is clicked, call handleDelete.
                        handleDelete();
                      }}
                    >
                      Delete
                    </Button>
                  </DialogClose>
                  <DialogTrigger asChild>
                    <Button
                      variant="outline"
                      className="text-2xl cursor-pointer"
                    >
                      Cancel
                    </Button>
                  </DialogTrigger>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
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

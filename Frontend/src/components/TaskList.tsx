import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Task from "./Task";
import { CalendarIcon, CirclePlus, PencilRuler, Trash2 } from "lucide-react";
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
import { useState } from "react";
import { PriorityStatus } from "@/structure/PriorityStatus";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { Calendar } from "./ui/calendar";
import { format } from "date-fns";
import TaskProps from "@/structure/TaskProps";

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
  onEdit,
}: TaskListComponentProps) => {
  const editTaskData = {
    title: title,
    description: description,
  };

  const [createTaskTitle, setCreateTaskTitle] = useState<string>("");
  const [createTaskDescription, setCreateTaskDescription] = useState<string>("");
  const [createTaskPriority, setCreateTaskPriority] = useState<PriorityStatus>("LOW");
  const [createTaskDueDate, setCreateTaskDueDate] = useState<Date | undefined>(new Date());
  const [subTasks, setSubTasks] = useState<TaskProps[]>(tasks ?? []);

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
  };

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

  const handleAddTask = () => {
    console.log(createTaskDueDate?.toISOString().slice(0, 19))
    axios.post(import.meta.env.VITE_API_URL + "/task-lists/" + id + "/tasks", {
      title: createTaskTitle,
      description: createTaskDescription,
      priority: createTaskPriority,
      dueDate: createTaskDueDate,
    })
    .then((response) => {
      // Render the new task in the task list
      setSubTasks((prev) => [...prev, response.data]);
      // Reset the state variables after adding a task
      setCreateTaskTitle("");
      setCreateTaskDescription("");
      setCreateTaskPriority("LOW");
      setCreateTaskDueDate(new Date());
    })
    .catch((error) => {
      console.error("Error adding task:", error);
    });
  }

  const updateSubTasks = (id: string) => {
    setSubTasks((prev) => {
      return prev.map((task) => {
        if (task.id === id) {
          return { ...task, status: "CLOSED" };
        }
        return task;
      });
    });
  }

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
          {subTasks && subTasks.length > 0 ? (
            <div>
              {subTasks.map((task) => (
                <div key={task.id} className="mb-4">
                  <Task
                    key={task.id}
                    taskListId={id}
                    title={task.title}
                    description={task.description}
                    id={task.id}
                    dueDate={task.dueDate}
                    status={task.status}
                    priority={task.priority}
                    onDone={updateSubTasks}
                    onEdit={updateSubTasks}
                    onDelete={updateSubTasks}
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
        <div className="flex justify-center items-center">
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="outline" className="cursor-pointer">
                <CirclePlus /> Add new Task
              </Button>
            </DialogTrigger>
            <DialogContent className="text-white bg-black">
              <DialogHeader>
                <DialogTitle>Add a new task</DialogTitle>
                <DialogDescription>
                  Fill in the details of the new task.
                </DialogDescription>
              </DialogHeader>

              <div className="flex flex-col gap-2">
                <Label htmlFor="task-list-title">Title</Label>
                <Input
                  id="task-title"
                  value={createTaskTitle}
                  placeholder="Task Title"
                  className="bg-white text-black"
                  onChange={(e) => {
                    setCreateTaskTitle(e.target.value);
                  }}
                />

                <Label htmlFor="task-description">Description</Label>
                <Input
                  id="task-description"
                  value={createTaskDescription}
                  placeholder="Task Description"
                  className="bg-white text-black"
                  onChange={(e) => {
                    setCreateTaskDescription(e.target.value);
                  }}
                />

                <Label htmlFor="task-priority">Priority</Label>
                <Select
                  defaultValue={createTaskPriority}
                  onValueChange={(value: PriorityStatus) =>
                    setCreateTaskPriority(value)
                  }
                >
                  <SelectTrigger
                    id="task-priority"
                    className="bg-white text-black"
                  >
                    <SelectValue placeholder="Select priority" />
                  </SelectTrigger>
                  <SelectContent className="bg-white text-black">
                    <SelectItem value="HIGH" className="text-red-500">
                      High
                    </SelectItem>
                    <SelectItem value="MEDIUM" className="text-yellow-500">
                      Medium
                    </SelectItem>
                    <SelectItem value="LOW" className="text-green-500">
                      Low
                    </SelectItem>
                  </SelectContent>
                </Select>

                <Label htmlFor="task-due-date">Due Date</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className="bg-white text-black w-auto justify-start text-left font-normal"
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {createTaskDueDate ? format(createTaskDueDate, "PPP") : <span>Pick a date</span>}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto bg-white p-0">
                    <Calendar 
                      mode="single"
                      selected={createTaskDueDate}
                      onSelect={setCreateTaskDueDate}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </div>

              <DialogFooter>
                <DialogClose asChild>
                  <Button
                    variant="outline"
                    className="text-2xl bg-green-500 cursor-pointer"
                    onClick={() => {
                      handleAddTask();
                    }}
                  >
                    Add Task
                  </Button>
                </DialogClose>
                <DialogClose asChild>
                  <Button
                    variant="outline"
                    className="text-2xl bg-red-500 cursor-pointer"
                    onClick={() => {
                      // Reset the state variables when the dialog is closed.
                      setCreateTaskTitle("");
                      setCreateTaskDescription("");
                      setCreateTaskPriority("LOW");
                      setCreateTaskDueDate(new Date());
                    }}
                  >
                    Cancel
                  </Button>
                </DialogClose>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </CardContent>
    </Card>
  );
};

export default TaskList;

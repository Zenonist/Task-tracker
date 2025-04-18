import TaskProps from "@/structure/TaskProps";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";
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
import { CalendarIcon, PencilRuler, SquareSlash, Trash2 } from "lucide-react";
import { Button } from "./ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./ui/tooltip";
import axios from "axios";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { useState } from "react";
import { PriorityStatus } from "@/structure/PriorityStatus";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { Calendar } from "./ui/calendar"; // Import the Calendar component
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@radix-ui/react-popover";
import { format } from "date-fns";
import { TaskStatus } from "@/structure/TaskStatus";

interface TaskPropsComponent extends TaskProps {
  taskListId: string;
  onDone: (id: string) => void;
  onEdit: (
    id: string,
    title: string,
    description: string,
    status: TaskStatus,
    priority: PriorityStatus,
    dueDate: string
  ) => void;
  onDelete: (id: string) => void;
}

export const Task = ({
  taskListId,
  id,
  title,
  description,
  status,
  priority,
  dueDate,
  onDone,
  onEdit,
  onDelete,
}: TaskPropsComponent) => {
  const newDateFormat = new Date(dueDate);
  const [taskTitle, setTaskTitle] = useState<string>(title);
  const [taskDescription, setTaskDescription] = useState<string | null>(
    description
  );
  const [taskPriority, setTaskPriority] = useState<PriorityStatus>(priority);
  const [taskStatus, setTaskStatus] = useState<TaskStatus>(status);
  const [taskDueDate, setTaskDueDate] = useState<Date | undefined>(
    new Date(dueDate)
  );

  const handleDone = () => {
    axios
      .put(
        import.meta.env.VITE_API_URL +
          "/task-lists/" +
          taskListId +
          "/tasks/" +
          id,
        {
          id: id,
          title: title,
          status: "CLOSED",
          priority: priority,
        }
      )
      .then(() => {
        onDone(id);
      })
      .catch((error) => {
        console.error("Error updating task status:", error);
      });
  };

  const handleEdit = () => {
    axios
      .put(
        import.meta.env.VITE_API_URL +
          "/task-lists/" +
          taskListId +
          "/tasks/" +
          id,
        {
          id: id,
          title: taskTitle,
          description: taskDescription,
          status: taskStatus,
          priority: taskPriority,
          dueDate: taskDueDate?.toISOString(),
        }
      )
      .then(() => {
        onEdit(
          id,
          taskTitle,
          taskDescription ?? "",
          taskStatus,
          taskPriority,
          taskDueDate?.toISOString() ?? ""
        );
      })
      .catch((error) => {
        console.error("Error updating task:", error);
      });
  };

  const handleDelete = () => {
    axios
      .delete(
        import.meta.env.VITE_API_URL +
          "/task-lists/" +
          taskListId +
          "/tasks/" +
          id
      )
      .then(() => {
        onDelete(id);
      })
      .catch((error) => {
        console.error("Error deleting task:", error);
      });
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>{title}</CardTitle>
          </div>
          <div className="flex gap-2">
            {/* Done button */}
            <TooltipProvider>
              <Dialog>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <DialogTrigger asChild>
                      <Button className="cursor-pointer" variant={"outline"}>
                        <SquareSlash />
                      </Button>
                    </DialogTrigger>
                  </TooltipTrigger>
                  <TooltipContent className="bg-black text-white">
                    <p>Mark as Done</p>
                  </TooltipContent>
                </Tooltip>
                <DialogContent className="text-white bg-black">
                  <DialogHeader>
                    <DialogTitle>Finish this task?</DialogTitle>
                    <DialogDescription>
                      Are you sure that you want to finish this task?
                    </DialogDescription>
                  </DialogHeader>
                  <DialogFooter className="flex flew-row justify-between">
                    <DialogClose asChild>
                      <Button
                        variant={"outline"}
                        className="bg-green-500"
                        onClick={() => {
                          handleDone();
                        }}
                      >
                        Sure
                      </Button>
                    </DialogClose>
                    <DialogClose asChild>
                      <Button variant={"outline"}>Cancel</Button>
                    </DialogClose>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </TooltipProvider>

            {/* Edit button */}
            <Dialog>
              <DialogTrigger asChild>
                <Button variant={"outline"} className="cursor-pointer">
                  <PencilRuler />
                </Button>
              </DialogTrigger>
              <DialogContent className="text-white bg-black">
                <DialogHeader>
                  <DialogTitle>Edit this task?</DialogTitle>
                  <DialogDescription>
                    Are you sure that you want to edit this task?
                  </DialogDescription>
                </DialogHeader>
                <div className="flew flex-col gap-4">
                  <Label>Title</Label>
                  <Input
                    id="title"
                    type="text"
                    placeholder="Task Title"
                    className="bg-white text-black"
                    value={taskTitle}
                    onChange={(e) => setTaskTitle(e.target.value)}
                  />
                  <Label>Description</Label>
                  <Input
                    id="description"
                    type="text"
                    placeholder="Task Description"
                    className="bg-white text-black"
                    value={taskDescription ?? ""}
                    onChange={(e) => setTaskDescription(e.target.value)}
                  />
                  <Label htmlFor="task-priority">Priority</Label>
                  <Select
                    defaultValue={taskPriority}
                    onValueChange={(value: PriorityStatus) =>
                      setTaskPriority(value)
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

                  <Label htmlFor="task-status">Status</Label>
                  <Select
                    defaultValue={taskStatus}
                    onValueChange={(value: TaskStatus) => setTaskStatus(value)}
                  >
                    <SelectTrigger
                      id="task-status"
                      className="bg-white text-black"
                    >
                      <SelectValue placeholder="Select priority" />
                    </SelectTrigger>
                    <SelectContent className="bg-white text-black">
                      <SelectItem value="OPEN">Open</SelectItem>
                      <SelectItem value="CLOSED">Closed</SelectItem>
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
                        {taskDueDate ? (
                          format(taskDueDate, "PPP")
                        ) : (
                          <span>Pick a date</span>
                        )}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto bg-white p-0 text-black">
                      <Calendar
                        mode="single"
                        selected={taskDueDate}
                        onSelect={setTaskDueDate}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                </div>
                <DialogFooter className="flex flew-row justify-between">
                  <DialogClose asChild>
                    <Button
                      variant={"outline"}
                      className="bg-green-500"
                      onClick={() => {
                        handleEdit();
                      }}
                    >
                      Save
                    </Button>
                  </DialogClose>
                  <DialogClose asChild>
                    <Button variant={"outline"}>Cancel</Button>
                  </DialogClose>
                </DialogFooter>
              </DialogContent>
            </Dialog>

            {/* Delete button */}
            <Dialog>
              <DialogTrigger asChild>
                <Button variant={"outline"} className="cursor-pointer">
                  <Trash2 />
                </Button>
              </DialogTrigger>
              <DialogContent className="text-white bg-black">
                <DialogHeader>
                  <DialogTitle>Delete this task?</DialogTitle>
                  <DialogDescription>
                    Are you sure that you want to delete this task?
                  </DialogDescription>
                </DialogHeader>
                <DialogFooter className="flex flew-row justify-between">
                  <DialogClose asChild>
                    <Button
                      variant={"outline"}
                      className="bg-red-500"
                      onClick={() => {
                        handleDelete();
                      }}
                    >
                      Delete
                    </Button>
                  </DialogClose>
                  <DialogClose asChild>
                    <Button variant={"outline"}>Cancel</Button>
                  </DialogClose>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        </div>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <div>
          <div>
            <p>Status: {status}</p>
            <p>Priority: {priority}</p>
            <p>Due Date: {newDateFormat.toLocaleDateString()}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default Task;

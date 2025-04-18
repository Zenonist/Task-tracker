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
import { SquareSlash } from "lucide-react";
import { Button } from "./ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./ui/tooltip";
import axios from "axios";

interface TaskPropsComponent extends TaskProps {
  taskListId: string;
  onDone: (id: string) => void;
  onEdit: (id: string) => void;
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
        onDone(id)
      })
      .catch((error) => {
        console.error("Error updating task status:", error);
      });
  };

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

            {/* Delete button */}
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

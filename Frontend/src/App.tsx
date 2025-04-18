import { useEffect, useState } from "react";
import "./App.css";
import TaskList from "./components/TaskList";
import TaskListProps from "./structure/TaskListProps";
import { CirclePlus } from "lucide-react";
import axios from "axios";
import { Button } from "./components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./components/ui/dialog";
import { Input } from "./components/ui/input";
import { Label } from "./components/ui/label";
function App() {
  const [taskList, setTaskList] = useState<TaskListProps[]>([]);
  const [taskListTitle, setTaskListTitle] = useState<string>("");
  const [taskListDescription, setTaskListDescription] = useState<string>("");

  useEffect(() => {
    console.log(import.meta.env.VITE_API_URL);
    getTaskList();
    // It will execute only once when the website is loaded because there is no dependency
  }, []);

  const getTaskList = () => {
    axios
      // ! Requires env name to have VITE_ prefix because of the vite requirement
      .get(import.meta.env.VITE_API_URL + "/task-lists")
      .then((response) => {
        console.log(response.data);
        setTaskList(response.data);
      })
      .catch((error) => console.error("Error fetching task lists:", error));
  };

  return (
    <div className="min-h-screen bg-black text-white">
      <h1 className="text-5xl text-center">Task Tracker</h1>
      <div className="container mx-auto p-4">
        {taskList.map((task) => (
          <div key={task.id} className="mb-4">
            <TaskList
              id={task.id}
              title={task.title}
              description={task.description}
              tasks={task.tasks}
            />
          </div>
        ))}
      </div>
      <div className="flex justify-center items-center">
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="outline" className="text-2xl cursor-pointer">
              <CirclePlus /> Add new Task List
            </Button>
          </DialogTrigger>
          <DialogContent className="text-white bg-black">
            <DialogHeader>
              <DialogTitle>Add this task list?</DialogTitle>
              <DialogDescription>
                Are you sure you want to add new task list?
              </DialogDescription>
            </DialogHeader>

            <div className="grid gap-4">
              <div className="items-center grid grid-cols-4 gap-4">
                <Label htmlFor="title" className="text-white">
                  Title
                </Label>
                <Input
                  id="title"
                  type="text"
                  placeholder="Task List Title"
                  className="bg-black text-white col-span-3"
                  onChange={(e) => setTaskListTitle(e.target.value)}
                />
              </div>
              <div className="items-center grid grid-cols-4 gap-4">
                <Label htmlFor="description" className="text-white">
                  Description
                </Label>
                <Input
                  id="description"
                  type="text"
                  placeholder="Task List Description"
                  className="bg-black text-white col-span-3"
                  onChange={(e) => setTaskListDescription(e.target.value)}
                />
              </div>
            </div>

            <DialogFooter className="flex flew-row justify-between">
              <DialogClose asChild>
                <Button
                  variant="outline"
                  onClick={() => {
                    console.log(taskListTitle);
                    console.log(taskListDescription);
                  }}
                  type="button"
                  className="cursor-pointer"
                >
                  Add
                </Button>
              </DialogClose>
              <DialogClose asChild>
                <Button
                  variant="outline"
                  className="bg-red-800 cursor-pointer"
                  type="button"
                >
                  Cancel
                </Button>
              </DialogClose>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}

export default App;

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

  const addNewTaskList = (taskList: TaskListProps) => {
    axios.post(import.meta.env.VITE_API_URL + "/task-lists", {
      title: taskList.title,
      description: taskList.description,
      count: 0,
      progress: 0,
      tasks: taskList.tasks,
    }).then((response) => {
      // * Update the task list state with the new task list
      setTaskList((prev) => [...prev, response.data]);
    }).catch((error) => {
      console.error("Error adding task list:", error);
    });
  }

  const getTaskList = () => {
    if (!import.meta.env.VITE_API_URL) {
      console.log("API URL is not defined");
    }else {
      axios
        // ! Requires env name to have VITE_ prefix because of the vite requirement
        .get(import.meta.env.VITE_API_URL + "/task-lists")
        .then((response) => {
          console.log(response.data);
          setTaskList(response.data);
        })
        .catch((error) => console.error("Error fetching task lists:", error));
    }
  };

  // This function is called by the TaskList component when a task list is successfully deleted.
  // It receives the ID of the deleted task list.
  const deleteTaskList = (id: string) => {
    // Update the taskList state by filtering out the task list with the matching ID.
    // setTaskList triggers a re-render of the App component.
    setTaskList((prevTaskList) => prevTaskList.filter((task) => task.id !== id));
  }


  const editTaskList = (id: string, title: string, description: string) => {
    setTaskList((prevTaskList) =>
      // This pattern is common in React for immutably updating a specific item in an array
      prevTaskList.map((task) => {
        if (task.id === id) {
          // Create a new object with updated properties for the matching task
          return { ...task, title: title, description: description };
        }
        // Keep non-matching tasks unchanged
        return task;
      })
    );
  }

  useEffect(() => {
    getTaskList();
    // It will execute only once when the website is loaded because there is no dependency
  }, []);

  return (
    <div className="min-h-screen bg-black text-white">
      <h1 className="text-5xl text-center">Task Tracker</h1>
      <div className="container mx-auto p-4">
        {taskList.length === 0 ? (
          <div className="text-center text-2xl">No Task List Found</div>
        ) : (
          // When App re-renders, it maps over the updated taskList state.
          // The deleted task list is no longer in the state, so its TaskList component
          // is not rendered, effectively removing it from the UI.
          taskList.map((task) => (
            <div key={task.id} className="mb-4">
              <TaskList
                id={task.id}
                title={task.title}
                description={task.description}
                tasks={task.tasks}
                // Pass the deleteTaskList function down to the TaskList component as the onDelete prop.
                onDelete={deleteTaskList}
                onEdit={editTaskList}
              />
            </div>
          ))
        )}
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
                    addNewTaskList({
                      id: "", // ID will be generated by the server
                      title: taskListTitle,
                      description: taskListDescription,
                      tasks: [],
                    });
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

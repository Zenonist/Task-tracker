import { useEffect, useState } from "react";
import "./App.css";
import TaskList from "./components/TaskList";
import TaskListProps from "./structure/TaskListProps";
import { CirclePlus } from "lucide-react";
import axios from "axios";
function App() {
  const [taskList, setTaskList] = useState<TaskListProps[]>([]);

  useEffect(() => {
    // setTaskList(mockData);
    getTaskList();
    // It will execute only once when the website is loaded because there is no dependency
  }, []);

  const getTaskList = () => {
    console.log(import.meta.env.VITE_API_URL)
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
      <div className="flex justify-center items-center text-2xl cursor-pointer">
        <CirclePlus /> Add new Task List
      </div>
    </div>
  );
}

export default App;

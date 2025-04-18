import TaskListProps from "../structure/TaskListProps";

const mockData: TaskListProps[] = [
    {
        id: "list1",
        title: "To Do",
        description: "Tasks that need to be started",
        tasks: [
            {
                id: "1",
                title: "Task 1",
                description: "This is the first task",
                status: "not-started",
                priority: "high",
                dueDate: new Date("2023-10-15"),
            },
            {
                id: "3",
                title: "Task 3",
                description: "This is the third task",
                status: "not-started",
                priority: "low",
                dueDate: new Date("2023-10-30"),
            }
        ]
    },
    {
        id: "list2",
        title: "In Progress",
        description: "Tasks currently being worked on",
        tasks: [
            {
                id: "2",
                title: "Task 2",
                description: "This is the second task",
                status: "in-progress",
                priority: "medium",
                dueDate: new Date("2023-10-20"),
            }
        ]
    },
    {
        id: "list3",
        title: "Completed",
        description: "Tasks that have been finished",
        tasks: []
    }
]

export default mockData;
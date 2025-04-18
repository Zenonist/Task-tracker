import TaskProps from "./TaskProps";

export default interface TaskListProps {
    id: string;
    title: string;
    description: string;
    tasks?: TaskProps[];
}
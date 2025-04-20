import TaskProps from "./TaskProps";

export default interface TaskListProps {
    id: string;
    title: string;
    description: string;
    progress?: number;
    count?: number;
    tasks?: TaskProps[];
}
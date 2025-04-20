import { PriorityStatus } from "./PriorityStatus";
import { TaskStatus } from "./TaskStatus";

export default interface TaskProps {
    id: string;
    title: string;
    description: string;
    status: TaskStatus;
    priority: PriorityStatus;
    dueDate: string;
}
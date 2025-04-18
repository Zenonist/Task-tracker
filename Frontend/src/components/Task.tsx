import TaskProps from "@/structure/TaskProps";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";

export const Task = ({
  title,
  description,
  status,
  priority,
  dueDate,
}: TaskProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <div>
          <div>
            <p>Status: {status}</p>
            <p>Priority: {priority}</p>
            <p>Due Date: {dueDate}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default Task;

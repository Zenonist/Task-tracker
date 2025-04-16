import React from 'react'
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

interface TaskListProps {
  cardTitle: string;
  cardDescription: string;
}

export const TaskList: React.FC<TaskListProps> = ({ cardTitle, cardDescription }) => {

  return (
      <Card>
        <CardHeader>
          <CardTitle>{cardTitle}</CardTitle>
          <CardDescription>{cardDescription}</CardDescription>
        </CardHeader>
      </Card>
  )
}

export default TaskList

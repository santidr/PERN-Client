import { useEffect, useState } from 'react'
import { Card, CardContent, Typography, Button } from '@mui/material'
import { Task } from '../interfaces/Task'

export const TaskList = () => {

  const [taskList, setTaskList] = useState<Task[]>()

  const loadTasks = async (): Promise<void> => {
    const res = await fetch('http://localhost:3000/api/tasks')
    const data = await res.json()

    setTaskList(data.result)
  }

  useEffect(() => {
    loadTasks()
  }, [])

  return (
    <div>
      <h3>Task List</h3>
      {
        taskList?.map((task: Task, i: number) => (
          <Card key={i} style={{ marginBottom: '.7rem' }}>
            <CardContent 
              style={{ 
                backgroundColor: '#1e272e',
                display: 'flex',
                justifyContent: 'space-between' 
              }}
            >
              <div>
                <Typography color="white" fontSize={ 20 }>{ task.title }</Typography>
                <Typography color="white" fontSize={ 14 }>{ task.title }</Typography>
              </div>

              <div>
                <Button
                  style={{ marginRight: 10 }} 
                  variant="contained"
                  color="inherit" 
                  onClick={ () => console.log('Edit') }
                >
                  EDIT
                </Button>

                <Button 
                  variant="contained"
                  color="warning" 
                  onClick={ () => console.log('Delete') }
                >
                  DELETE
                </Button>
              </div>
            </CardContent>
          </Card>
        ))
      }
    </div>
  )
}

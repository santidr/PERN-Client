import { useEffect, useState } from 'react'
import { Card, CardContent, Typography, Button } from '@mui/material'
import { Task } from '../interfaces/Task'
import { useNavigate } from 'react-router-dom'
import { deleteTask, getAllTasks } from '../api/api'

export const TaskList = () => {

  const navigate = useNavigate()

  const [taskList, setTaskList] = useState<Task[]>()

  const loadTasks = async (): Promise<void> => {
    const res = await fetch(getAllTasks())
    const data = await res.json()

    setTaskList(data.result)
  }

  const handleDelete = async (id: number): Promise<void> => {
    try {
      await fetch(deleteTask(id), { 
        method: "DELETE" 
      })
      setTaskList(taskList?.filter(task => task.id !== id))

    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    loadTasks()
  }, [])

  return (
    <div>
      <h3>Task List</h3>
      {
        taskList?.map((task: Task) => (
          <Card key={task.id} style={{ marginBottom: '.7rem' }}>
            <CardContent
              style={{
                backgroundColor: '#1e272e',
                display: 'flex',
                justifyContent: 'space-between'
              }}
            >
              <div>
                <Typography color="white" fontSize={20}>{task.title}</Typography>
                <Typography color="white" fontSize={14}>{task.description}</Typography>
              </div>

              <div>
                <Button
                  style={{ marginRight: 10 }}
                  variant="contained"
                  color="inherit"
                  onClick={() => navigate(`/${task.id}/edit`) }
                >
                  EDIT
                </Button>

                <Button
                  variant="contained"
                  color="warning"
                  onClick={ () => handleDelete(task.id) }
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

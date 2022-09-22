import { Button, Card, CardContent, CircularProgress, Grid, Typography } from '@mui/material'
import TextField from '@mui/material/TextField'
import { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { editTask, getTask, newTask } from '../api/api'
import { NewTask, Task } from '../interfaces/Task'

type InputChange = React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
type FormEvent = React.FormEvent<HTMLFormElement>

export const TaskForm = () => {

  const navigate = useNavigate()
  const params = useParams()

  const [task, setTask] = useState<NewTask>({
    title: '',
    description: ''
  })

  const [loading, setLoading] = useState<boolean>(false)
  const [editing, setEditing] = useState<boolean>(false)

  const handleInputChange = ({ target }: InputChange): void => {
    setTask({ ...task, [target.name]: target.value })
  }

  const handleSubmit = async (e: FormEvent): Promise<void> => {
    e.preventDefault()
    setLoading(true)

    if (editing) {
      await fetch(editTask(params.id), {
        method: 'PUT',
        body: JSON.stringify(task),
        headers: { 'Content-Type': 'application/json' }
      })
      
    } else {
      const res = await fetch(newTask(), {
        method: 'POST',
        body: JSON.stringify(task),
        headers: { 'Content-Type': 'application/json' }
      })
    }

    setLoading(false)
    navigate('/')
  }

  const emptyTask = (): boolean => {
    return !task.title || !task.description
  }

  const loadTaskEdit = async (id: string): Promise<void> => {
    const res = await fetch(getTask(id))
    const data = await res.json()

    setTask(data.result)
  }

  useEffect(() => {
    if (params.id) {
      loadTaskEdit(params.id)
      setEditing(true)
    }

  }, [params.id])

  return (
    <Grid
      container
      direction="column"
      justifyContent="center"
      alignItems="center"
    >
      <Grid item xs={3}>
        <Card
          sx={{ mt: 5, p: 2 }}
          style={{
            backgroundColor: '#1e272e'
          }}
        >
          <Typography variant="h6" textAlign="center" color="white">
            { editing ? 'Edit task': 'New task' }
          </Typography>
          <CardContent>
            <form onSubmit={handleSubmit}>
              <TextField
                className="textField"
                label="Title"
                variant="filled"
                name="title"
                value={task.title}
                onChange={handleInputChange}

                inputProps={{ style: { color: "#eee" } }}
                InputLabelProps={{ style: { color: '#aaa' } }}
              />

              <TextField
                className="textField"
                label="Description"
                variant="filled"
                multiline
                rows={4}
                name="description"
                value={task.description}
                onChange={handleInputChange}

                inputProps={{ style: { color: "#eee" } }}
                InputLabelProps={{ style: { color: '#aaa' } }}
              />

              <Button
                color={ editing ? 'success' : 'primary' }
                variant="contained"
                sx={{ mt: 2 }}
                type="submit"
                disabled={emptyTask()}
              >
                {loading ? <CircularProgress color='inherit' size={24} /> : 'SAVE'}
              </Button>
            </form>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  )
}

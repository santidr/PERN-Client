import { Button, Card, CardContent, CircularProgress, Grid, Typography } from '@mui/material'
import TextField from '@mui/material/TextField'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Task } from '../interfaces/Task'

type InputChange = React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
type FormEvent = React.FormEvent<HTMLFormElement>

export const TaskForm = () => {

  const navigate = useNavigate()

  const [task, setTask] = useState<Task>({
    title: '',
    description: ''
  })

  const [loading, setLoading] = useState(false)

  const handleInputChange = ({ target }: InputChange): void => {
    setTask({ ...task, [ target.name ]: target.value })
  }

  const handleSubmit = async (e: FormEvent): Promise<void> => {
    e.preventDefault()
    setLoading(true)

    const res = await fetch('http://localhost:3000/api/tasks/new', {
      method: 'POST',
      body: JSON.stringify(task),
      headers: { 'Content-Type': 'application/json' }
    })

    const data = await res.json()
    console.log(data)

    setLoading(false)
    navigate('/')
  }

  const emptyTask = (): boolean => {
    return !task.title || !task.description
  }

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
            New task
          </Typography>
          <CardContent>
            <form onSubmit={ handleSubmit }>
              <TextField
                className="textField"
                label="Title"
                variant="filled"
                name="title"
                value={ task.title }
                onChange={ handleInputChange }

                inputProps={{ style: { color: "#eee"}}}
                InputLabelProps={{ style: { color: '#aaa' }}}
              />

              <TextField
                className="textField"
                label="Description"
                variant="filled"
                multiline
                rows={4}
                name="description"
                value={ task.description }
                onChange={ handleInputChange }

                inputProps={{ style: { color: "#eee"}}}
                InputLabelProps={{ style: { color: '#aaa' }}}
              />

              <Button 
                variant="contained"
                sx={{ mt: 2 }} 
                type="submit"
                disabled={ emptyTask() }
              >
                { loading ? <CircularProgress color='inherit' size={24} /> : 'ADD TASK' }
              </Button>
            </form>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  )
}

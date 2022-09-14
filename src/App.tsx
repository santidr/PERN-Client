import { Container } from '@mui/system'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Navbar } from './components/Navbar'
import { TaskForm } from './components/TaskForm'
import { TaskList } from './components/TaskList'

export const App = () => {
  return (
    <>
      <BrowserRouter>
        <Navbar />
        <Container>
          <Routes>
            <Route path='/' element={<TaskList />} />
            <Route path='/new' element={<TaskForm />} />
          </Routes>
        </Container>
      </BrowserRouter>
    </>
  )
}

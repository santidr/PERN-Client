import { Box, AppBar, Container, Toolbar, Typography, Button } from '@mui/material'
import { Link, useNavigate } from 'react-router-dom'

export const Navbar = () => {

  const navigate = useNavigate()

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" color="transparent">
        <Container>
          <Toolbar>
            <Typography 
              sx={{ flexGrow: 1 }}
              className="logo"
            >
              <Link to="/">PERN Stack</Link>
            </Typography>

            <Button
              variant="contained"
              color="primary" 
              onClick={ () => navigate('/new') }>
              New task
            </Button>
          </Toolbar>
        </Container>
      </AppBar>
    </Box>
  )
}
